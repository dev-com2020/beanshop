# M5. Eksploracja, raporty defektów i dokumentacja testowa (90 min)

**Cel:** przeprowadzić sesję eksploracyjną w podejściu SBTM, zgłosić błędy, które developer przyjmie bez dopytywania, i przygotować dane testowe.

## 5.1 Chartery z analizy ryzyka (10 min)

Zapytaj w Space "BeanShop QA - grupa M":

> *"Zaproponuj 6 charterów sesji eksploracyjnych dla BeanShop w formacie 'Eksploruj / używając / aby odkryć'. Oprzyj je na ryzykach biznesowych z `docs/wymagania.md`. Do każdego zaproponuj heurystykę z SFDIPOT lub FEW HICCUPPS i 3 pomysły na dane."*

Trener przydziela parom różne chartery, żeby pokryć cały sklep.

## 5.2 Sesja (30 min, timebox)

- Szablon: `qa-manual/szablony/charter.md`, plik: `qa-manual/uczestnicy/<login>/sesja-1.md`.
- Notuj na bieżąco z godziną. Nie formatuj, nie poprawiaj, nie zgłaszaj w trakcie.
- Copilot w trakcie sesji: tylko do szybkich pytań (*"jakie są dopuszczalne wartości pola X?"*, *"jakie żądanie API wysyła ten przycisk?"*).
- Przydatne: narzędzia deweloperskie przeglądarki (F12) -> zakładka `Network` pokazuje żądania i odpowiedzi API.

## 5.3 Raporty defektów z kontekstem technicznym (25 min)

Dla każdego znalezionego błędu (z sesji i z M3):

1. W VS Code uruchom `/m-bug-report` i wklej swoje surowe notatki.
2. **Zweryfikuj** wskazane przez Copilota "podejrzane miejsce w kodzie": otwórz plik, poproś o wyjaśnienie fragmentu. Jeśli nie pasuje, usuń tę sekcję. Lepiej brak hipotezy niż fałszywa.
3. Odtwórz błąd jeszcze raz według kroków z raportu. Jeśli się nie da, raport nie jest gotowy.
4. Zgłoś: `Issues` -> `New issue` -> **Zgłoszenie błędu**, grupa `grupa-M`. Dodaj etykietę `grupa-M`.
5. Przed zgłoszeniem sprawdź, czy ktoś z grupy nie zgłosił już tego samego. Jeśli tak: dodaj komentarz z nowymi informacjami zamiast duplikatu.

## 5.4 Podsumowanie sesji (10 min)

Poproś Copilota o podsumowanie notatek z `sesja-1.md` w formacie formularza **Sesja testów eksploracyjnych** (pokrycie, błędy, pytania, kolejne chartery). Popraw i zgłoś jako issue.

## 5.5 Dane testowe pod formularz i API (15 min)

Poproś o zestaw danych testowych dla formularza rejestracji (`/register`) i `POST /api/auth/register`:
- granice długości hasła i imienia,
- e-maile różniące się wielkością liter, z plusem, z polskimi znakami,
- wartości "złośliwe": bardzo długi tekst, znaki specjalne HTML (np. `<b>Anna</b>`), emoji, spacje na początku i końcu.

Wykonaj 5 najciekawszych przypadków w UI. Obserwuj, **gdzie** aplikacja potem wyświetla podane dane. Zapisz zestaw jako `dane-rejestracja.md` (tabela: wartość / klasa / oczekiwany wynik / wynik).

## Gotowe, gdy
- [ ] Co najmniej 2 issues `[BUG]` z etykietą `grupa-M`, odtworzone według własnych kroków.
- [ ] 1 issue `[SESJA]`.
- [ ] `dane-rejestracja.md` na Twoim branchu.
