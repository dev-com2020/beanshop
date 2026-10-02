# A1. Generowanie testów pod kontrolą (75 min)

**Cel:** generować testy szybko, ale mierzyć ich wartość: wartości brzegowe, styl frameworka, testy mutacyjne, property-based.

Branch: `git switch main`, potem `git switch -c a/<login>/A1-generowanie`.

## 1.1 `/tests` i Test Explorer (15 min)

1. Otwórz `src/domain/password.ts`, zaznacz funkcję, w czacie: `/tests`. Zapisz w `tests/unit/password.test.ts` (rozszerz istniejący plik).
2. Uruchom w Test Explorer (ikona kolby) i z terminala `npm run test:unit`.
3. **Kontrola:** czy są wartości brzegowe BR-01 dla długości: 7, 8, 64, 65? Jeśli nie, dopisz (sam albo promptem *"dodaj analizę wartości brzegowych dla BR-01 z docs/wymagania.md"*).
4. Jeśli któryś test pada: kto ma rację, test czy kod? Zastosuj regułę z `.github/copilot-instructions.md` (`it.fails` + komentarz `// BUG: ..., BR-xx`).

## 1.2 Test "w stylu naszego frameworka" (15 min)

Prompt `/a-test-e2e`, scenariusz: *"wyszukiwanie produktów zgodnie z BR-10: wielkość liter, minimalna długość, brak wyników"*.

- Czy Copilot użył `CatalogPage` i fixtures? Czy dodał brakujące elementy do page objectu zamiast do testu?
- Czy test jest parametryzowany, gdy przypadki różnią się tylko danymi?

## 1.3 Pułapka testów, które tylko przechodzą (20 min)

1. `npm run test:mutation`, otwórz `reports/mutation/index.html` (dwuklik w Eksploratorze plików albo `start reports/mutation/index.html` w PowerShellu).
2. Znajdź `src/domain/pricing.ts`. Które mutanty przeżyły? Który istniejący test w `tests/unit/pricing.test.ts` "przechodzi, ale nic nie sprawdza"?
3. Poproś Copilota: *"Wzmocnij testy w tests/unit/pricing.test.ts tak, żeby zabiły mutanty, które przeżyły w raporcie Strykera. Oczekiwane wartości bierz z docs/wymagania.md, nie z kodu."*
4. Uruchom Strykera ponownie. Zapisz mutation score dla `pricing.ts` przed i po.

## 1.4 Property-based testing (25 min)

Zamiast pojedynczych przykładów: **niezmienniki**, które muszą być prawdziwe dla każdego koszyka.

Poproś Copilota o `tests/unit/pricing.property.test.ts` z `fast-check`, sprawdzający dla losowych koszyków (1-5 pozycji, ceny z katalogu, ilości 1-10) i losowych kodów:

- suma do zapłaty nigdy nie jest ujemna,
- rabat nigdy nie przekracza wartości produktów,
- wszystkie kwoty w `summary` mają co najwyżej 2 miejsca po przecinku (BR-08),
- dostawa standard jest darmowa **wtedy i tylko wtedy**, gdy wartość po rabacie >= 200 (BR-04),

Gdy fast-check znajdzie kontrprzykład, przeczytaj go (to zminimalizowany przypadek). Zapisz go jako zwykły test przykładowy z komentarzem `// BUG`.

## Gotowe, gdy
- [ ] Draft PR `a/<login>/A1-generowanie` z etykietą `grupa-A`.
- [ ] W opisie PR: mutation score przed/po i lista niezgodności z wymaganiami, które wykryły Twoje testy.
