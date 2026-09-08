from __future__ import annotations

import asyncio
import os

from quantpilot_market_data import cli
from quantpilot_market_data.cli import load_market_environment


def test_selector_factory_is_compatible_with_async_postgres() -> None:
    loop = cli.windows_selector_loop_factory()
    try:
        assert isinstance(loop, asyncio.SelectorEventLoop)
    finally:
        loop.close()


def test_cli_selects_platform_appropriate_loop(monkeypatch) -> None:
    calls = []
    monkeypatch.setattr(cli, "load_market_environment", lambda: None)
    monkeypatch.setattr(cli.uvicorn, "run", lambda *args, **kwargs: calls.append(kwargs))
    cli.main()
    expected = (
        "quantpilot_market_data.cli:windows_selector_loop_factory"
        if os.name == "nt"
        else "auto"
    )
    assert calls[0]["loop"] == expected


def test_market_environment_uses_allowlist_and_local_precedence(tmp_path, monkeypatch) -> None:
    (tmp_path / ".env").write_text(
        "REDIS_URL=redis://base:6379/0\n"
        "DEEPSEEK_API_KEY=must-not-enter-market-process\n",
        encoding="utf8",
    )
    (tmp_path / ".env.local").write_text(
        "REDIS_URL=redis://local:6379/0\n"
        "QUANTPILOT_REDIS_REQUIRED=1\n",
        encoding="utf8",
    )
    monkeypatch.delenv("REDIS_URL", raising=False)
    monkeypatch.delenv("QUANTPILOT_REDIS_REQUIRED", raising=False)
    monkeypatch.delenv("DEEPSEEK_API_KEY", raising=False)

    load_market_environment(tmp_path)

    assert os.environ["REDIS_URL"] == "redis://local:6379/0"
    assert os.environ["QUANTPILOT_REDIS_REQUIRED"] == "1"
    assert "DEEPSEEK_API_KEY" not in os.environ


def test_market_environment_never_overrides_injected_runtime_secret(tmp_path, monkeypatch) -> None:
    (tmp_path / ".env").write_text("REDIS_URL=redis://file:6379/0\n", encoding="utf8")
    monkeypatch.setenv("REDIS_URL", "rediss://injected:6380/0")

    load_market_environment(tmp_path)

    assert os.environ["REDIS_URL"] == "rediss://injected:6380/0"
