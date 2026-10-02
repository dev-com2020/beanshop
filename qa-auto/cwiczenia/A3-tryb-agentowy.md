# A3. Tryb agentowy w pracy z frameworkiem (75 min)

## 3.1 Refaktor testu odziedziczonego (35 min)

Branch: `a/<login>/A3-refaktor`. Plik: `tests/e2e/legacy/checkout-legacy.spec.ts`.

1. **Plan mode.** *"Zrefaktoryzuj checkout-legacy.spec.ts do standardów z .github/instructions/testy-e2e.instructions.md. Przenieś do tests/e2e/checkout.spec.ts. Brakujące elementy dodaj do page objects (utwórz OrdersPage). Nie zmieniaj niczego w src/ ani public/. Zachowaj sprawdzane zachowanie."*
2. Przeczytaj plan. Popraw go zanim zatwierdzisz (np. "dane koszyka przez API, a przez UI tylko checkout").
3. **Agent mode** wykonuje plan. Pilnuj, jakie komendy uruchamia (zatwierdzasz każdą).
4. **Checkpoints:** po zakończeniu poproś o dodatkową zmianę (np. "dodaj też test anulowania"). Następnie przywróć checkpoint sprzed tej prośby. Sprawdź `git status`, czy wszystko wróciło.
5. **Kontrola zakresu:** `git diff --stat main`. Czy agent dotknął plików spoza `tests/`? Czy usunął stary plik?
6. `npx playwright test tests/e2e/checkout.spec.ts --repeat-each=5`.

## 3.2 Polowanie na flaky test (30 min)

Branch: `a/<login>/A3-flaky`. Issue z etykietą `flaky` opisuje niestabilny test z CI.

1. Prompt `/a-analiza-flaky` z nazwą testu.
2. Agent uruchamia test wielokrotnie i stawia hipotezy. **Nie akceptuj** poprawek typu "zwiększ timeout" czy "dodaj waitForTimeout(2000)".
3. Potwierdź hipotezę sam: `npx playwright test -g "licznik" --trace on`, potem `npx playwright show-trace <plik>` (albo `npx playwright show-report` i trace z raportu). Co dzieje się między kliknięciem a zmianą licznika?
4. Po poprawce: `--repeat-each=30`, 0 porażek. Wynik i przyczyna w opisie draft PR.

## 3.3 Copilot coding agent (10 min, jeśli włączony w organizacji)

1. Otwórz issue **"Testy API dla zmiany ilości w koszyku"** (etykieta `grupa-A`). Trener przypisuje je do **Copilot** (Assignees).
2. Copilot pracuje w tle i otwiera PR. Obserwuj sesję agenta (link w PR).
3. Po A4 wróć do tego PR i zrób review według `qa-auto/checklista-review-kodu-ai.md`. Czy agent wykrył niezgodność z BR-03, czy "dopasował" testy do aplikacji?

## Gotowe, gdy
- [ ] Draft PR z refaktorem (stary plik usunięty, testy zielone 5/5).
- [ ] Draft PR z poprawką flaky testu (30/30) i opisem przyczyny.
