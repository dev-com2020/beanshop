# M4. Co przetestować po tej zmianie? Praca z pull requestami (60 min)

**Cel:** określić zakres testów po zmianie w kodzie bez czekania na developera: analiza wpływu, ryzyko, regresja, plan testów.

## 4.1 Analiza wpływu zmiany (20 min)

Otwórz PR **"Promocja weekendowa: darmowa dostawa od 150 zł"** (etykieta `do-analizy`).

1. Przeczytaj opis PR. Wejdź w `Files changed`. Na github.com otwórz Copilot Chat na stronie PR i zapytaj: *"Wyjaśnij tę zmianę testerowi manualnemu. Co zmienia się dla klienta?"*
2. W VS Code uruchom `/m-regresja-z-pr` i podaj nazwę brancha `feature/promocja-weekendowa`.
3. **Sprawdź Copilota:** czy zauważył, że zmieniony kod jest współdzielony z innymi metodami dostawy? Czy uwzględnił zależność od daty (weekend)? Czy zapytał, w jakiej strefie czasowej liczony jest weekend?

## 4.2 Regresja oparta na ryzyku (20 min)

1. Z wyniku zbuduj checklistę regresji, posortowaną według ryzyka. Max 12 pozycji: priorytety są ważniejsze niż kompletność.
2. Przełącz się na branch PR. W terminalu VS Code: `git fetch`, potem `git switch feature/promocja-weekendowa`, potem `npm run app`. Jeśli masz niezapisane zmiany, najpierw zrób commit na swoim branchu.
3. Wykonaj checklistę. Weekend możesz zasymulować: aplikacja ma ukryty endpoint zegara (zapytaj Copilota, jak ustawić czas serwera, i zweryfikuj odpowiedź w `docs/architektura.md`).
4. Wróć na swój branch: `git switch m/<login>`, potem `npm run app`.
5. Wklej checklistę z wynikami jako **review w PR** (komentarz, bez zatwierdzania). Początek: `[grupa-M] @<login>`.

## 4.3 Plan testów dla nowej funkcjonalności (20 min)

PR **"Punkty lojalnościowe"** (branch `feature/punkty-lojalnosciowe`) dodaje nową funkcję.

1. Poproś Copilota o jednostronicowy plan testów według `qa-manual/szablony/plan-testow.md` na podstawie opisu PR i zmian w kodzie.
2. Popraw plan: wykreśl ogólniki ("przetestować wszystko"), dopisz konkretne ryzyka i dane. Sprawdź, czy opis PR i kod mówią to samo (np. o zaokrąglaniu punktów i o anulowaniu zamówienia).
3. Zapisz jako `qa-manual/uczestnicy/<login>/plan-testow-punkty.md`.

## Gotowe, gdy
- [ ] Review w PR "Promocja weekendowa" z checklistą i wynikami.
- [ ] Plan testów punktów lojalnościowych na Twoim branchu.
