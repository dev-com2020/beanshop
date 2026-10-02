# A0. Setup pod automatyzację (30 min)

**Cel:** działające środowisko, rozumienie trybów Copilota i tego, jak instrukcje repozytorium sterują generowanym kodem.

## Kroki

1. Lokalnie (przygotowane przed szkoleniem według `README.md`): `git pull`, `npm ci`, `npm run sprawdz`. VS Code z rozszerzeniami z `.vscode/extensions.json`.
2. `npm test`. Zanotuj wynik. Uruchom drugi raz. Czy wynik jest taki sam? (Wrócimy do tego w A3.)
3. Utwórz branch: `git switch -c a/<login>/A0-setup`.
4. **Tryby Copilota.** W panelu Chat przełącz kolejno **Ask**, **Plan**, **Agent** i zadaj to samo: *"Dodaj test e2e sprawdzający, że niezalogowany klient po kliknięciu 'Dodaj do koszyka' trafia na stronę logowania."*
   - Ask: co dostajesz? Plan: jak wygląda plan i co możesz w nim zmienić? Agent: jakie pliki zmienia, jakie komendy chce uruchomić?
   - Zostaw wynik z trybu Agent, odrzuć resztę.
5. **Instrukcje repozytorium.** Otwórz `.github/copilot-instructions.md` i `.github/instructions/testy-e2e.instructions.md`. W odpowiedzi Copilota rozwiń sekcję `References`: czy instrukcje zostały użyte? Czy wygenerowany test je spełnia (fixtures, page objects, `getByRole`, brak `waitForTimeout`)?
6. **Eksperyment.** Na swoim branchu dopisz do `testy-e2e.instructions.md` regułę: *"Każdy test ma tag `@smoke` albo `@regression` w tytule."* Wygeneruj test jeszcze raz w nowym czacie. Czy reguła zadziałała?

## Gotowe, gdy
- [ ] `npm test` działa (z ewentualnym niestabilnym testem).
- [ ] Na branchu jest test "niezalogowany -> logowanie" zgodny z instrukcjami i przechodzący.
