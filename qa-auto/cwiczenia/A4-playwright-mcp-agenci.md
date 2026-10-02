# A4. Playwright MCP i agenci testowi (75 min)

Branch: `a/<login>/A4-agenci`.

## 4.1 Playwright MCP: agent steruje przeglądarką (25 min)

1. Serwer MCP jest skonfigurowany w `.vscode/mcp.json`. Otwórz plik i kliknij `Start` nad serwerem `playwright` (albo: paleta poleceń -> `MCP: List Servers`). W Chat (Agent) w ikonie narzędzi sprawdź, czy narzędzia `playwright` są włączone.
2. Aplikacja musi działać (`npm run app`). Prompt:

   > *"Używając narzędzi Playwright MCP otwórz http://localhost:3000. Zaloguj się jako anna@beanshop.test / Kawa1234!, dodaj Brazylię Santos do koszyka, złóż i opłać zamówienie. Wyloguj się, zaloguj jako admin@beanshop.test / Admin1234! i zmień status tego zamówienia na 'Wysłane'. Sprawdź, jakie akcje są teraz dostępne dla zamówienia. Porównaj z BR-09. Na koniec napisz test e2e odtwarzający te kroki w stylu naszego frameworka."*

3. Obserwuj, jak agent korzysta ze snapshotów dostępności strony zamiast zrzutów ekranu.
4. Uruchom wygenerowany test. Popraw go do standardów (dane przez API, page objects).

## 4.2 Agenci testowi Playwrighta: planner i generator (25 min)

1. `npx playwright init-agents --loop=vscode --project=e2e`. Sprawdź, co powstało: `.github/agents/playwright-test-*.agent.md`, `tests/e2e/seed.spec.ts`, wpis w `.vscode/mcp.json`.
2. Popraw **seed**: zaimportuj `test` z `./fixtures` i użyj `loggedInPage`, żeby agenci startowali od zalogowanej Anny z czystymi danymi.
3. Wybierz agenta **playwright-test-planner**: *"Zaplanuj testy kodów rabatowych w koszyku zgodnie z BR-05..BR-07 z docs/wymagania.md."* Plan trafia do `specs/`.
4. **Review planu**: czy scenariusze są zgodne z wymaganiami, czy z tym, co agent zobaczył w aplikacji? Popraw plan ręcznie.
5. Agent **playwright-test-generator**: wygeneruj testy z 2 wybranych scenariuszy planu. Uruchom.

## 4.3 Healer: naprawa po zmianie UI (15 min)

1. `git stash -u` (jeśli masz zmiany), `git switch cwiczenie/nowy-ui-koszyka`, `npm run app`. Ten branch zmienia UI koszyka (nowe etykiety i identyfikatory).
2. `npx playwright test tests/e2e/cart.spec.ts`: testy padają.
3. Agent **playwright-test-healer**: *"Napraw padające testy w tests/e2e/cart.spec.ts."*
4. Oceń każdą zmianę healera: **naprawa lokatora** (OK) czy **zmiana oczekiwanego wyniku** (wymaga decyzji człowieka)? Czy zmiany trafiły do page objectu, czy do testu?
5. Wróć: `git switch a/<login>/A4-agenci`, potem `git stash pop`.

## 4.4 Kiedy to ma sens (10 min, dyskusja)

Uzupełnij w grupie tabelę w opisie swojego PR:

| Zadanie | MCP / agenci | Zwykły Copilot w IDE | Ręcznie |
|---------|--------------|----------------------|---------|
| Szkic testu dla nowego ekranu | | | |
| Naprawa po zmianie lokatorów w 30 testach | | | |
| Test reguły biznesowej z wyliczeniem kwot | | | |
| Eksploracja nieznanej aplikacji | | | |
| Test w CI uruchamiany 50 razy dziennie | | | |

## Gotowe, gdy
- [ ] Draft PR z testem z MCP, planem z `specs/`, testami z generatora, wypełnioną tabelą.
