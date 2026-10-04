# BeanShop: wymagania biznesowe

Wersja 1.4. Właściciel produktu: Zespół BeanShop. Dokument jest źródłem prawdy dla testów manualnych i automatycznych.

## Reguły biznesowe

| ID | Obszar | Reguła |
|----|--------|--------|
| BR-01 | Rejestracja | Hasło ma od 8 do 64 znaków, zawiera co najmniej jedną wielką literę i jedną cyfrę. Adres e-mail jest unikalny bez względu na wielkość liter. |
| BR-02 | Logowanie | Po 5 **kolejnych** nieudanych próbach logowania konto zostaje zablokowane (HTTP 423). Udane logowanie zeruje licznik nieudanych prób. |
| BR-03 | Koszyk | Ilość jednego produktu w koszyku: od 1 do 10 sztuk i nie więcej niż stan magazynowy. Produktu ze stanem 0 nie można dodać. |
| BR-04 | Dostawa | Kurier standard: 14,99 zł, **darmowy od 200,00 zł** wartości produktów po rabacie; w soboty i niedziele **od 150,00 zł** (promocja weekendowa). Kurier express: 24,99 zł; gdy przysługuje darmowa dostawa, express kosztuje 10,00 zł (dopłata). |
| BR-05 | Kody rabatowe | Do zamówienia można zastosować **jeden** kod. Zastosowanie nowego kodu zastępuje poprzedni. Wielkość liter w kodzie nie ma znaczenia. |
| BR-06 | Kody rabatowe | `KAWA10`: -10%. `MINUS20`: -20,00 zł przy wartości produktów min. 100,00 zł. `JESIEN15`: -15%, ważny do 30.11.2026 **włącznie**. `LATO25`: wygasł 31.08.2026. |
| BR-07 | Kody rabatowe | Warunek minimalnej wartości jest sprawdzany przy każdej zmianie koszyka. Gdy przestaje być spełniony, kod jest usuwany, a klient widzi komunikat. |
| BR-08 | Kwoty | Wszystkie kwoty (rabat, dostawa, suma) są zaokrąglane do 0,01 zł (half-up) i tak zwracane przez API. |
| BR-09 | Zamówienia | Statusy: NEW -> PAID -> SHIPPED -> DELIVERED. Anulować (CANCELLED) można tylko zamówienie NEW lub PAID. Anulowanie zwraca towar na stan. |
| BR-10 | Wyszukiwanie | Wyszukiwanie po nazwie produktu, bez rozróżniania wielkości liter, minimum 2 znaki. |
| BR-11 | Dostępność | Sklep spełnia WCAG 2.2 AA: każde pole formularza ma etykietę, komunikaty o błędach są ogłaszane przez czytniki ekranu, kontrast tekstu min. 4.5:1. |

## Historyjki użytkownika

Pełna lista z kryteriami akceptacji jest w issues repozytorium (etykieta `user-story`). Skrót:

- **US-01 Rejestracja konta**: jako nowy klient chcę założyć konto, aby składać zamówienia.
- **US-02 Logowanie i blokada konta**: jako klient chcę się logować; jako właściciel sklepu chcę blokować konta przy próbach odgadnięcia hasła.
- **US-03 Wyszukiwanie produktów**: jako klient chcę szybko znaleźć produkt.
- **US-04 Koszyk**: jako klient chcę dodawać produkty i zmieniać ich ilość.
- **US-05 Kody rabatowe**: jako klient chcę użyć kodu rabatowego.
- **US-06 Dostawa**: jako klient chcę wybrać sposób dostawy i wiedzieć, ile zapłacę.
- **US-07 Zamówienia i anulowanie**: jako klient chcę złożyć, opłacić i w razie potrzeby anulować zamówienie.
- **US-08 Panel obsługi**: jako pracownik sklepu chcę zmieniać status zamówień.

## Konta testowe

| E-mail | Hasło | Rola |
|--------|-------|------|
| anna@beanshop.test | Kawa1234! | klient |
| jan@beanshop.test | Espresso99 | klient |
| admin@beanshop.test | Admin1234! | obsługa sklepu |

Dane są w pamięci i wracają do stanu początkowego po restarcie aplikacji (lub `POST /api/test/reset`, gdy działa API testowe).
