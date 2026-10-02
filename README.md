# BeanShop: repozytorium warsztatowe QA + GitHub Copilot

Sklep internetowy z kawą, przygotowany do dwóch jednodniowych szkoleń Integrivo:

| | Grupa M | Grupa A |
|---|---|---|
| Szkolenie | GitHub Copilot dla testera manualnego | GitHub Copilot dla testera automatyzującego |
| Twoja ścieżka | [`qa-manual/`](qa-manual/README.md) | [`qa-auto/`](qa-auto/README.md) |
| Etykieta | `grupa-M` | `grupa-A` |
| Branche | `m/<login>` | `a/<login>/<ćwiczenie>` |
| Narzędzia | VS Code lokalnie, github.com, Copilot Chat, Spaces | VS Code, Copilot Ask/Plan/Agent, Playwright MCP, coding agent |
| Zmieniasz kod? | Nie. Pytasz o niego. | Tak, kod testów w `tests/`. Nie zmieniasz `src/`. |

> Aplikacja **celowo zawiera błędy**. Wymagania w `docs/wymagania.md` są źródłem prawdy, kod nie.

## Start w 2 minuty

Pracujemy lokalnie. Potrzebujesz: **Node.js 22 LTS** ([nodejs.org](https://nodejs.org)), **Git** ([git-scm.com](https://git-scm.com)), **VS Code** z rozszerzeniem **GitHub Copilot Chat** i kontem GitHub z licencją Copilot.

```bash
git clone https://github.com/dev-com2020/beanshop.git
cd beanshop
npm ci
npx playwright install chromium   # grupa A obowiązkowo, grupa M opcjonalnie
npm run sprawdz                   # kontrola stanowiska
npm run app                       # aplikacja w tle: http://localhost:3000
```

| Komenda | Co robi |
|---------|---------|
| `npm run app` | uruchamia aplikację w tle albo restartuje ją z czystymi danymi |
| `npm run app:stop` | zatrzymuje aplikację |
| `npm test` | testy unit + API + e2e (Playwright korzysta z działającej aplikacji albo sam ją uruchamia) |

Komendy działają tak samo w PowerShellu, Git Bash i na macOS/Linux.

Opcjonalnie (płatne, rozliczane przez organizację): GitHub Codespaces. Repo ma gotowy `.devcontainer`, aplikacja startuje w nim sama.

## Konta testowe

| E-mail | Hasło | Rola |
|--------|-------|------|
| anna@beanshop.test | Kawa1234! | klient |
| jan@beanshop.test | Espresso99 | klient |
| admin@beanshop.test | Admin1234! | obsługa sklepu |

## Mapa repozytorium

```
docs/                  wymagania (BR-xx), architektura, API
src/                   aplikacja (Express + TypeScript)
public/                frontend (HTML + JS)
tests/                 framework testowy: unit (Vitest), api i e2e (Playwright)
qa-manual/             ścieżka grupy M: ćwiczenia, szablony, folder uczestników
qa-auto/               ścieżka grupy A: ćwiczenia, checklisty, quality gates
.github/               instrukcje Copilota, prompty m-* i a-*, agent analityk-qa, formularze issues, CI
.vscode/mcp.json       serwer Playwright MCP
workshop/              dane do przygotowania repo przez trenera (issues, skrypt setup)
```

## Zasady wspólnego repozytorium

1. `main` jest wspólną bazą i nie zmienia się w trakcie szkolenia. Nikt nie merguje PR-ów uczestników.
2. Każdy pracuje na swoim branchu z prefiksem grupy (`m/` lub `a/`).
3. PR-y uczestników są **draft** i mają etykietę grupy.
4. Przed zgłoszeniem błędu sprawdź, czy nie ma go już w issues Twojej grupy (filtr `label:grupa-M` / `label:grupa-A`).
