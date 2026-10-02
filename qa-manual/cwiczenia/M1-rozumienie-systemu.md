# M1. Rozumienie systemu bez czytania kodu (45 min)

**Cel:** zbudować model działania systemu z pomocą Copilota i znaleźć rozbieżności z wymaganiami, zanim uruchomisz pierwszy test (static testing, shift-left).

## 1.1 Pytania o działanie (10 min)

Zadaj agentowi **analityk-qa** (VS Code) lub Copilotowi na github.com:

- *"Opisz, jak liczona jest kwota do zapłaty w koszyku. Krok po kroku, z nazwami plików i funkcji."*
- *"Co się dzieje ze stanem magazynowym, gdy klient składa i gdy anuluje zamówienie?"*

Otwórz wskazane pliki i poproś Copilota o wyjaśnienie zaznaczonego fragmentu (zaznacz kod -> prawy klik -> `Copilot` -> `Explain`). Nie musisz rozumieć składni, sprawdzasz, czy wyjaśnienie zgadza się z odpowiedzią ogólną.

## 1.2 Mapa systemu w diagramach (20 min)

1. Poproś o diagram przepływu "od dodania produktu do złożenia zamówienia" w Mermaid, na podstawie `docs/architektura.md` i kodu w `src/routes/`.
2. Poproś o **diagram stanów zamówienia wyłącznie na podstawie kodu** (`src/domain/orderStatus.ts`), bez czytania dokumentacji.
3. Sam narysuj (albo poproś o drugi diagram) na podstawie reguły BR-09 z `docs/wymagania.md`.
4. Porównaj oba diagramy. Każdą różnicę zapisz jako "MOŻLIWY BŁĄD" z numerem reguły.

> Wskazówka: diagram Mermaid zobaczysz w podglądzie pliku Markdown (`Ctrl+Shift+V`) albo bezpośrednio w czacie.

## 1.3 Copilot Space dla QA (15 min)

Trener udostępnił Space **"BeanShop QA - grupa M"** (dokumentacja, `src/domain`, historyjki z issues).

1. Otwórz Space (github.com/copilot/spaces) i zapytaj: *"Jakie kody rabatowe istnieją, jakie mają ograniczenia i skąd to wiesz?"*
2. Zadaj to samo pytanie w zwykłym Copilot Chat bez Space. Porównaj kompletność i źródła.
3. Zapisz w notatkach: co warto dodać do Space w Twoim projekcie, a czego nie (np. dane klientów).

## Gotowe, gdy
- [ ] `qa-manual/uczestnicy/<login>/system.md` zawiera 2 diagramy (przepływ i stany) oraz listę rozbieżności kod vs wymagania.
- [ ] Każda rozbieżność ma numer BR i wskazanie pliku.
