# M0. Start: Copilot oczami testera manualnego (30 min)

**Cel:** uruchomić środowisko i zobaczyć różnicę między czatem "bez kontekstu" a Copilotem w repozytorium.

## Kroki

1. **Środowisko.** Repozytorium masz sklonowane przed szkoleniem (instrukcja w `README.md`). Otwórz folder `beanshop` w VS Code, terminal (`` Ctrl+` ``): `git pull`, `npm run app`. Otwórz w przeglądarce http://localhost:3000.
2. **Aplikacja.** Zaloguj się jako `anna@beanshop.test` / `Kawa1234!`. Dodaj coś do koszyka. Konta testowe: `docs/wymagania.md`.
3. **Ten sam prompt w trzech miejscach.** Zadaj pytanie: *"Od jakiej kwoty dostawa w BeanShop jest darmowa i czy dotyczy to także kuriera express?"*
   - a) w dowolnym czacie AI bez dostępu do repo (jeśli masz),
   - b) w Copilot Chat na github.com (ikona Copilota na stronie repozytorium),
   - c) w VS Code: panel Chat, wybierz agenta **analityk-qa** z listy agentów.
4. Porównaj odpowiedzi: czy podają źródło (plik)? Czy odróżniają kod od wymagań?
5. **Twój folder.** W VS Code utwórz `qa-manual/uczestnicy/<twój-login>/notatki.md` i zapisz w nim wnioski z punktu 4.
6. **Twój branch.** Panel Source Control -> `...` -> `Branch` -> `Create branch` -> `m/<twój-login>`. Commit (wiadomość możesz wygenerować ikoną Copilota) i `Publish Branch`.

## Gotowe, gdy
- [ ] Aplikacja działa na Twoim komputerze (http://localhost:3000).
- [ ] Na branchu `m/<login>` jest plik `notatki.md` z porównaniem trzech odpowiedzi.
