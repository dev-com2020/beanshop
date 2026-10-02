# Ścieżka grupy A: GitHub Copilot dla testera automatyzującego

Ta część repozytorium jest **tylko dla grupy A** (testerzy automatyzujący, SDET). Grupa M pracuje w `qa-manual/`.

| Element | Grupa A |
|---------|---------|
| Etykieta issues i PR | `grupa-A` |
| Twoje branche | `a/<twój-login>/<ćwiczenie>`, np. `a/jkowalski/A1-generowanie` |
| PR-y | zawsze **draft**, do `main`, z etykietą `grupa-A`. Nie mergujemy: `main` zostaje wspólną bazą. |
| Gdzie pracujesz | VS Code lokalnie z Copilotem w trybach Ask / Plan / Agent |
| Prompty startowe | `.github/prompts/a-*.prompt.md`, instrukcje `.github/instructions/testy-*.instructions.md` |
| Stack | TypeScript, Playwright (API + e2e), Vitest, fast-check, Stryker, axe-core |

## Szybki start

```bash
npm ci
npx playwright install chromium               # przeglądarka dla Playwrighta
npm run sprawdz                               # kontrola stanowiska
npm run app                                   # aplikacja w tle na :3000 (restart = czyste dane)
npm test                                      # unit + API + e2e
npm run test:mutation                         # testy mutacyjne domeny
npx playwright test --ui                      # tryb UI Playwrighta
```

## Plan dnia

| Godz. | Moduł | Ćwiczenie |
|-------|-------|-----------|
| 09:00 | 1. Setup pod automatyzację | [A0](cwiczenia/A0-setup.md) |
| 09:30 | 2. Generowanie testów pod kontrolą | [A1](cwiczenia/A1-generowanie-testow.md) |
| 10:45 | przerwa 15 min | |
| 11:00 | 3. Mocki, fixtures i dane testowe | [A2](cwiczenia/A2-mocki-fixtures-dane.md) |
| 12:00 | 4. Tryb agentowy w pracy z frameworkiem | [A3](cwiczenia/A3-tryb-agentowy.md) |
| 13:15 | przerwa obiadowa 30 min | |
| 13:45 | 5. Playwright MCP i agenci testowi | [A4](cwiczenia/A4-playwright-mcp-agenci.md) |
| 15:00 | przerwa 10 min | |
| 15:10 | 6. Weryfikacja kodu AI i standardy zespołowe | [A5](cwiczenia/A5-weryfikacja-i-standardy.md) |
| 16:20 | Plan wdrożenia w moim projekcie | A5, część 5.4 |
| 16:45 | Retrospektywa | |

## Techniki, które ćwiczymy

- **Testy mutacyjne** (Stryker): obiektywna miara, czy test cokolwiek sprawdza.
- **Property-based testing** (fast-check): niezmienniki zamiast pojedynczych przykładów, automatyczne zawężanie kontrprzykładu.
- **Testy kontraktowe** API ze schematami (zod).
- **Testy parametryzowane z tablic decyzyjnych** i analiza wartości brzegowych w kodzie.
- **Kontrola czasu** w testach (sterowany zegar serwera) i **mockowanie sieci** (`page.route`).
- **Wzorce frameworka**: fixtures, page objects, test data builders, lokatory po roli, asercje web-first.
- **Diagnostyka flaky testów**: `--repeat-each`, trace viewer, hipotezy i eksperyment.
- **Agentowe AI w testach**: tryb Agent i Plan, Playwright MCP, agenci planner / generator / healer, Copilot coding agent.
- **Quality gates dla kodu z AI**: Copilot code review, automatyczne testy dostępności (axe), próg mutacyjny w CI.

## Zasada nadrzędna

Test wygenerowany przez AI jest gotowy dopiero wtedy, gdy wiesz, jaki błąd by wykrył. Gdy test pokazuje niezgodność z `docs/wymagania.md`, poprawiamy zgłoszenie, a nie oczekiwanie w teście.
