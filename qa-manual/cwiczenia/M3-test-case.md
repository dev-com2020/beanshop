# M3. Test case'y i scenariusze z kontekstu projektu (90 min)

**Cel:** projektować test case'y świadomie dobranymi technikami, z Copilotem jako partnerem, i wykonać je na aplikacji.

Szablon: `qa-manual/szablony/test-case.md`. Prompt startowy: w VS Code wpisz w czacie `/m-test-case-z-wymagan`.
Wynik zapisuj w `qa-manual/uczestnicy/<login>/test-cases.md`.

## 3.1 Klasy równoważności i wartości brzegowe (25 min)

Dla trzech reguł:
- **BR-01** długość hasła,
- **BR-03** ilość produktu w koszyku,
- **BR-04** próg darmowej dostawy.

1. Uruchom prompt `/m-test-case-z-wymagan` dla każdej reguły.
2. **Sprawdź Copilota:** czy dla każdej granicy są wartości min-1, min, max, max+1? Czy przy BR-04 uwzględnił, że próg liczony jest *po rabacie*? Czy wie, że ilość można zmienić także w koszyku, nie tylko przy dodawaniu?
3. Popraw i uzupełnij. Przy każdym TC zostaw technikę i priorytet.

## 3.2 Tablica decyzyjna i pairwise (20 min)

Koszt dostawy zależy od: wartości produktów po rabacie (< 200 / >= 200), metody (standard / express) i kodu (brak / KAWA10 / MINUS20).

1. Poproś o pełną tablicę decyzyjną (ile jest kombinacji?) z oczekiwanym kosztem dostawy i kwotą do zapłaty dla konkretnych koszyków.
2. Poproś o redukcję metodą pairwise. Dyskusja w grupie: której kombinacji z pełnej tablicy nie odpuściłbyś mimo pairwise i dlaczego (ryzyko)?
3. **Przelicz ręcznie co najmniej 3 wiersze.** Copilot często myli się w arytmetyce.

## 3.3 Przejścia stanów (15 min)

1. Na bazie diagramu z M1 poproś o tabelę przejść 5x5 (z każdego statusu do każdego) z oznaczeniem dozwolone / niedozwolone wg BR-09.
2. Zaprojektuj test case'y dla **niedozwolonych** przejść, które klient lub obsługa może realnie wywołać w UI.

## 3.4 Wykonanie (30 min)

1. Wybierz 10 test case'ów o najwyższym priorytecie i wykonaj je w aplikacji na http://localhost:3000.
   - Klient: `anna@beanshop.test` / `Kawa1234!`. Obsługa (zmiana statusów): `admin@beanshop.test` / `Admin1234!`.
   - Dane wracają do stanu początkowego po restarcie aplikacji: w terminalu `npm run app`.
2. Uzupełnij "Wynik wykonania". Każdy niezaliczony TC to kandydat na zgłoszenie w M5 (zapisz notatkę: kroki, dane, co widzisz).

## Gotowe, gdy
- [ ] Co najmniej 15 test case'ów z techniką i priorytetem.
- [ ] 10 wykonanych, z wynikiem.
- [ ] Commit i push na `m/<login>`.
