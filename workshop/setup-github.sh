#!/usr/bin/env bash
# Przygotowanie wspólnego repozytorium szkoleniowego na GitHubie.
# Użycie (z katalogu głównego repo):  bash workshop/setup-github.sh <organizacja>/<repo>
# Wymaga: gh CLI zalogowane kontem z prawem tworzenia repo w organizacji.
set -euo pipefail

REPO="${1:?Podaj <organizacja>/<repo>, np. integrivo-szkolenia/beanshop-qa}"
BRANCHES=(main feature/promocja-weekendowa feature/punkty-lojalnosciowe test/koszyk-testy-z-ai cwiczenie/nowy-ui-koszyka)

echo "==> Repozytorium $REPO"
if ! gh repo view "$REPO" > /dev/null 2>&1; then
  gh repo create "$REPO" --private --description "BeanShop: warsztat GitHub Copilot dla testerów (Integrivo)"
fi
git remote remove origin 2> /dev/null || true
git remote add origin "https://github.com/$REPO.git"
for b in "${BRANCHES[@]}"; do git push -u origin "$b"; done

echo "==> Etykiety"
label() { gh label create "$1" --repo "$REPO" --color "$2" --description "$3" --force > /dev/null; }
label "grupa-M"            "1f6feb" "Szkolenie: tester manualny"
label "grupa-A"            "8250df" "Szkolenie: tester automatyzujący"
label "user-story"         "0e8a16" "Historyjka użytkownika"
label "bug"                "d73a4a" "Błąd"
label "sesja-eksploracyjna" "fbca04" "Raport z sesji eksploracyjnej"
label "do-analizy"         "c5def5" "PR do analizy wpływu (grupa M)"
label "ai-generated"       "e99695" "Kod wygenerowany przez AI"
label "flaky"              "f9d0c4" "Niestabilny test"
label "testy"              "bfdadc" "Zadanie testowe"
label "cwiczenie"          "ededed" "Branch ćwiczeniowy"
label "trener"             "000000" "Informacje od trenera"

echo "==> Issues"
for f in workshop/issues/*.md; do
  title=$(sed -n 's/^title: //p' "$f" | head -1)
  labels=$(sed -n 's/^labels: //p' "$f" | head -1)
  body=$(mktemp)
  sed '1,/^---$/d' "$f" | sed "s#__REPO__#$REPO#g" > "$body"
  url=$(gh issue create --repo "$REPO" --title "$title" --label "$labels" --body-file "$body")
  echo "   $url  $title"
  case "$f" in *tablica*) gh issue pin "$url" --repo "$REPO" > /dev/null || true ;; esac
  rm "$body"
done

echo "==> Pull requesty"
pr() {
  local head="$1" file="workshop/prs/$2" labels="$3" draft="${4:-}"
  local title
  title=$(sed -n 's/^title: //p' "$file" | head -1)
  sed '1,/^---$/d' "$file" > /tmp/pr-body.md
  gh pr create --repo "$REPO" --base main --head "$head" --title "$title" --body-file /tmp/pr-body.md --label "$labels" $draft
}
pr feature/promocja-weekendowa  promocja-weekendowa.md  "do-analizy,grupa-M,grupa-A"
pr feature/punkty-lojalnosciowe punkty-lojalnosciowe.md "do-analizy,grupa-M"
pr test/koszyk-testy-z-ai       koszyk-testy-z-ai.md    "ai-generated,grupa-A"
pr cwiczenie/nowy-ui-koszyka    nowy-ui-koszyka.md      "cwiczenie,grupa-A" --draft

cat <<TODO

Gotowe. Kroki ręczne (ustawienia, których nie da się ustawić z gh CLI):
  1. Uczestnicy: przed szkoleniem git clone + npm ci + npm run sprawdz (README.md). Codespaces opcjonalnie (płatne).
  2. Organizacja -> Copilot -> Policies: Copilot Chat w IDE i na github.com, Agent mode, MCP servers in Copilot,
     Copilot code review, (opcjonalnie) Copilot coding agent. Licencje dla wszystkich uczestników.
  3. Repo -> Settings -> Collaborators and teams: zespoły "qa-grupa-m" i "qa-grupa-a" z prawem Write.
  4. Repo -> Settings -> Rules: ochrona brancha main (wymagany PR, blokada force push).
  5. Copilot Spaces: utwórz "BeanShop QA - grupa M" (docs/, src/domain/, issues z etykietą user-story)
     i udostępnij zespołowi qa-grupa-m.
  6. (A3.3) Przypisz issue "Testy API dla zmiany ilości w koszyku" do Copilota w trakcie ćwiczenia.
TODO
