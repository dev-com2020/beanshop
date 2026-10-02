# Ścieżka grupy M: GitHub Copilot dla testera manualnego

Ta część repozytorium jest **tylko dla grupy M** (testerzy manualni). Grupa A pracuje w `qa-auto/`.

| Element | Grupa M |
|---------|---------|
| Etykieta issues i PR | `grupa-M` |
| Twoje pliki | `qa-manual/uczestnicy/<twój-login>/` |
| Twój branch | `m/<twój-login>` |
| Gdzie pracujesz | VS Code lokalnie (Copilot Chat, aplikacja na localhost:3000) + github.com (issues, PR, Spaces) |
| Prompty startowe | `.github/prompts/m-*.prompt.md`, agent `analityk-qa` |
| Kod | Czytasz i pytasz o niego Copilota. **Nie zmieniasz** `src/`, `public/`, `tests/`. |

## Plan dnia

| Godz. | Moduł | Ćwiczenie |
|-------|-------|-----------|
| 09:00 | 1. Start: Copilot oczami testera | [M0](cwiczenia/M0-start.md) |
| 09:30 | 2. Rozumienie systemu bez czytania kodu | [M1](cwiczenia/M1-rozumienie-systemu.md) |
| 10:15 | 2. Analiza wymagań (shift-left) | [M2](cwiczenia/M2-wymagania.md) |
| 11:00 | przerwa 15 min | |
| 11:15 | 3. Test case'y z kontekstu projektu | [M3](cwiczenia/M3-test-case.md) |
| 12:45 | przerwa obiadowa 30 min | |
| 13:15 | 4. Co przetestować po tej zmianie? | [M4](cwiczenia/M4-pull-requesty.md) |
| 14:15 | 5. Eksploracja, defekty, dokumentacja | [M5](cwiczenia/M5-eksploracja-i-defekty.md) |
| 15:45 | przerwa 10 min | |
| 15:55 | 6. Bezpieczeństwo, ograniczenia, wdrożenie | [M6](cwiczenia/M6-bezpieczenstwo-wdrozenie.md) |
| 16:45 | Retrospektywa | |

## Techniki, które ćwiczymy

- **Shift-left**: ocena testowalności historyjek (INVEST), Example Mapping, kryteria akceptacji w Gherkinie.
- **Techniki projektowania testów** (ISTQB): podział na klasy równoważności, wartości brzegowe, tablice decyzyjne, przejścia stanów, pairwise.
- **Testowanie oparte na ryzyku**: priorytety test case'ów i zakres regresji z analizy wpływu zmiany (PR).
- **Testy eksploracyjne** w podejściu Session-Based Test Management: chartery, timebox, heurystyki SFDIPOT i FEW HICCUPPS.
- **Raportowanie z kontekstem technicznym**: żądanie API, podejrzane miejsce w kodzie, ważność z wpływu na klienta.
- **Weryfikacja odpowiedzi AI**: źródła, krzyżowe sprawdzanie z wymaganiami, rozpoznawanie halucynacji.

## Zasada nadrzędna

Copilot przyspiesza myślenie testera, ale go nie zastępuje. Każdą odpowiedź weryfikujesz z `docs/wymagania.md` albo z działaniem aplikacji.
