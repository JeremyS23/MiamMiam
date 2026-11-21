# Fiche de Révision et de Traçabilité : React Router Hooks (Séance 16)

## 🎯 Récapitulatif Global

Cet exercice valide la maîtrise des hooks de navigation et de lecture d'URL dans **React Router**. Il confirme la capacité à :

1. Lire et typer des paramètres dynamiques d'URL (`useParams`).
2. Naviguer programmatiquement après une action utilisateur (`useNavigate`).
3. Manipuler l'historique du navigateur pour contrôler le bouton « Précédent » (`replace: true`, `navigate(-1)`).
4. Utiliser l'URL comme source de vérité unique pour les filtres, rendant les états partageables et persistants au rechargement (`useSearchParams`).

---

## 📁 Détail des Modifications par Fichier

### 1. `src/App.tsx`

* **Modifications effectuées :**
  * La fonction `addRecipe` retourne désormais un `number` (le nouvel ID) au lieu de `void`.
  * La prop `onDelete` est transmise au composant `RecipeDetailPage`.
  * *(Optionnel)* Suppression des `useState` locaux pour `searchQuery` et `selectedCategory` : le tableau complet `recipes` est passé directement à `HomePage`.
* **Pourquoi :**
  * La redirection post-création nécessite de connaître l'ID de la recette nouvellement insérée.
  * La suppression doit être déclenchée depuis la page de détail : l'état global doit donc lui fournir la fonction.
  * Déplacer la gestion des filtres dans `HomePage` respecte la consigne de faire de l'URL la source de vérité, évitant ainsi la duplication d'état entre le parent et l'enfant.
* **À retenir pour la révision :**
  * ⚠️ **Piège classique :** Oublier de mettre à jour le type de retour d'une fonction dans le composant parent entraîne une erreur TypeScript immédiate dans le composant enfant.
  * 🧠 **Réflexe :** Si un enfant doit naviguer après une action qui modifie l'état du parent, le parent doit exécuter l'action **et** retourner les données nécessaires à la navigation (ex. : l'ID).

---

### 2. `src/pages/RecipeDetailPage.tsx`

* **Modifications effectuées :**
  * Ajout de `useParams` pour lire l'ID dans l'URL.
  * Ajout de `useNavigate` pour les boutons « Retour » et « Supprimer ».
  * Ajout d'une condition `if (isNaN(recipeId) || !recipe)` affichant un message d'erreur et un lien vers `/`.
  * Ajout du bouton « Supprimer » avec `navigate("/", { replace: true })`.
* **Pourquoi :**
  * `useParams` retourne toujours des chaînes de caractères (`string`). Une conversion explicite (`Number`) et une vérification (`isNaN`) sont obligatoires pour éviter des crashes ou des affichages incohérents.
  * `replace: true` écrase l'entrée actuelle de l'historique : après une suppression, revenir en arrière sur une page inexistante dégraderait l'expérience utilisateur (UX).
* **À retenir pour la révision :**
  * ⚠️ **Piège classique :** Utiliser `recipe.id === id` sans convertir `id` en nombre. La comparaison stricte (`===`) échouera toujours (`3 === "3"` vaut `false`).
  * 🧠 **Réflexe :** Toujours gérer le cas « 404 métier » (ID valide mais objet non trouvé) et le cas « 400 » (ID non numérique).

---

### 3. `src/pages/AddRecipePage.tsx`

* **Modifications effectuées :**
  * Mise à jour du type de la prop `onAdd` : `(recipe: NewRecipe) => number`.
  * Création d'un gestionnaire `handleAdd` qui récupère l'ID retourné et appelle `navigate(\`/recipes/${newId}\`)`.
  * Ajout d'un bouton « Annuler » déclenchant `navigate(-1)`.
* **Pourquoi :**
  * Permet une navigation fluide et contextuelle : l'utilisateur voit immédiatement le résultat de son action (la fiche de la recette qu'il vient de créer).
  * `navigate(-1)` utilise l'historique du navigateur, ce qui correspond au comportement attendu d'un bouton « Annuler » (retour à l'écran précédent, quelle que soit sa provenance).
* **À retenir pour la révision :**
  * ⚠️ **Piège classique :** Appeler `navigate()` directement dans le corps du rendu du composant (hors d'un événement), ce qui provoque une boucle de rendu infinie.
  * 🧠 **Réflexe :** `useNavigate` s'utilise exclusivement dans des gestionnaires d'événements (`onClick`, `onSubmit`) ou dans un `useEffect`.

---

### 4. `src/components/RecipeCard.tsx`

* **Modifications effectuées :**
  * Suppression de la prop `onDelete` dans l'interface `RecipeCardProps`.
  * Suppression du bouton « Supprimer » dans le JSX.
* **Pourquoi :**
  * Respecte la consigne de centraliser l'action de suppression sur la page de détail afin d'éviter les suppressions accidentelles depuis la liste et d'alléger l'interface de la carte.
* **À retenir pour la révision :**
  * 🧠 **Réflexe :** Quand on retire une prop d'un composant, il faut systématiquement vérifier que le composant parent (ici `RecipeList` ou `HomePage`) ne la lui passe plus, sous peine d'erreur TypeScript.

---

### 5. `src/pages/HomePage.tsx`

* **Modifications effectuées :**
  * Remplacement des props de recherche/catégorie par l'import et l'utilisation de `useSearchParams`.
  * Lecture des paramètres via `searchParams.get("search")` et `searchParams.get("category")`.
  * Filtrage du tableau `recipes` effectué localement dans ce composant.
  * Fonctions `handleSearchChange` et `handleCategoryChange` utilisant `setSearchParams` en reconstruisant l'objet complet des paramètres.
* **Pourquoi :**
  * L'URL devient la **source de vérité** : cela permet de partager un lien avec des filtres pré-appliqués et de conserver l'état après un rechargement de page (`F5`).
  * `setSearchParams` remplace tous les paramètres de l'URL : si on ne passe que `{ search: "nouveau" }`, le paramètre `category` est perdu. Il faut donc fusionner les valeurs existantes.
* **À retenir pour la révision :**
  * ⚠️ **Piège classique :** Oublier de conserver les autres paramètres lors de l'appel à `setSearchParams`, ce qui réinitialise silencieusement les autres filtres actifs.
  * 🧠 **Réflexe :** `searchParams.get()` retourne `string | null`. Utiliser l'opérateur de coalescence nulle (`?? ""`) ou une vérification explicite pour éviter les erreurs de type.