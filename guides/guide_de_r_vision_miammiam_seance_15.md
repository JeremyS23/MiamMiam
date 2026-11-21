# Guide de Révision : Gestion des États et Flux de Données (Projet MiamMiam)

---

## 1. Synthèse de l'Architecture et du Flux de Données

Dans l'application **MiamMiam** (développée en React, TypeScript et Material-UI), l'architecture repose sur deux principes fondamentaux :
1. **La Remontée d'État (*State Lifting*)** : Lorsqu'un état doit être partagé ou affiché à plusieurs endroits de l'application (ex: les favoris présents à la fois sur les cartes de recettes et dans l'en-tête), cet état **doit** résider dans le parent commun le plus proche, c'est-à-dire `App.tsx` (la source unique de vérité).
2. **Le Flux Unidirectionnel** :
   * **Flux Descendant (Props Down)** : Le parent (`App.tsx`) transmet les données et les états aux composants enfants via des props (`recipes`, `favorites`, `searchQuery`, etc.).
   * **Flux Ascendant (Callbacks Up)** : Les composants enfants ne modifient jamais directement l'état global. Ils appellent des fonctions de rappel (*callbacks*) transmises en props par le parent (ex: `onToggleFavorite`, `onDelete`, `onAdd`).

---

## 2. Guide Pas à Pas : Application Concrète (Fichier par Fichier)

### 📁 Étape 1 : Centraliser les états et les logiques dans `src/App.tsx`

C'est ici que résident tous les états globaux de l'application. 

**Ce qu'il faut écrire dans `App.tsx` :**
- Déclarer les états globaux (`recipes`, `favorites`, `searchQuery`, `selectedCategory`, `showFavoritesOnly`).
- Écrire la fonction de bascule des favoris (`toggleFavorite`) basée sur l'immutabilité (`.includes()`, `.filter()`, spread operator `...`).
- Écrire la logique de filtrage combiné (*search + category + favorites*).

```tsx
// src/App.tsx
import { useState } from "react";
import { ThemeProvider, createTheme, CssBaseline, Box, Switch, FormControlLabel } from "@mui/material";
import PageLayout from "./components/PageLayout";
import RecipeForm from "./components/RecipeForm";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import RecipeList from "./components/RecipeList";
import RecipeDetail from "./components/RecipeDetail";
import { recipes as initialRecipes } from "./data/recipes";
import type { NewRecipe, Recipe } from "./models/recipe";

const theme = createTheme({
    palette: { primary: { main: "#e65100" } }, // Orange MiamMiam
});

const App = () => {
    // 1. États globaux
    const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

    // 2. Fonction de gestion des favoris (State Lifting)
    const toggleFavorite = (recipeId: number) => {
        setFavorites((prevFavorites) =>
            prevFavorites.includes(recipeId)
                ? prevFavorites.filter((id) => id !== recipeId) // Retirer si déjà présent
                : [...prevFavorites, recipeId] // Ajouter sinon
        );
    };

    const addRecipe = (newRecipe: NewRecipe) => {
        const recipe: Recipe = { ...newRecipe, id: Date.now(), authorId: 1 };
        setRecipes([...recipes, recipe]);
    };

    const deleteRecipe = (id: number) => {
        setRecipes(recipes.filter((recipe) => recipe.id !== id));
    };

    // 3. Logique de filtrage combiné séquentiel
    const filteredRecipes = recipes.filter((recipe) => {
        const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === null || recipe.categoryId === selectedCategory;
        const matchesFavorites = !showFavoritesOnly || favorites.includes(recipe.id);

        return matchesSearch && matchesCategory && matchesFavorites;
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* Transmission du nombre de favoris au Layout */}
            <PageLayout title="MiamMiam" favoriteCount={favorites.length}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 4, width: "100%" }}>
                    <RecipeForm onAdd={addRecipe} />
                    <SearchBar value={searchQuery} onChange={setSearchQuery} />
                    <CategoryFilter selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
                    
                    <FormControlLabel
                        control={
                            <Switch 
                                checked={showFavoritesOnly} 
                                onChange={(e) => setShowFavoritesOnly(e.target.checked)} 
                                color="primary"
                            />
                        }
                        label="Afficher uniquement les favoris"
                    />

                    {/* Liste des recettes filtrées et transmission des callbacks */}
                    <RecipeList
                        recipes={filteredRecipes}
                        onDelete={deleteRecipe}
                        onResetFilters={() => {
                            setSearchQuery("");
                            setSelectedCategory(null);
                            setShowFavoritesOnly(false);
                        }}
                        favorites={favorites}
                        onToggleFavorite={toggleFavorite}
                    />
                    
                    {recipes.length > 0 && <RecipeDetail recipe={recipes[0]} />}
                </Box>
            </PageLayout>
        </ThemeProvider>
    );
};

export default App;
```

---

### 📁 Étape 2 : Afficher les données globales dans l'en-tête (`src/components/PageLayout.tsx`)

Le composant de mise en page récupère le compteur de favoris transmis par `App.tsx` et l'affiche dans la barre de navigation (`AppBar` / `Toolbar`).

**Ce qu'il faut écrire dans `PageLayout.tsx` :**
- Définir l'interface des props en incluant `favoriteCount`.
- Utiliser `justifyContent: "space-between"` sur la `Toolbar` pour séparer le titre et le compteur de favoris aux extrémités opposées.

```tsx
// src/components/PageLayout.tsx
import type { ReactNode } from "react";
import { AppBar, Toolbar, Typography, Container, Box, Stack } from "@mui/material";

interface PageLayoutProps {
    title: string;
    children: ReactNode;
    favoriteCount?: number;
}

const PageLayout = ({ title, children, favoriteCount = 0 }: PageLayoutProps) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <AppBar position="static">
                {/* Espace entre le titre (gauche) et le compteur (droite) */}
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h6" component="h1">
                        {title}
                    </Typography>
                    <Typography variant="body1" component="div">
                        ❤️ Favoris : {favoriteCount}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flex: 1 }}>
                <Stack direction="row" spacing={2}>
                    {children}
                </Stack>
            </Container>
        </Box>
    );
};

export default PageLayout;
```

---

### 📁 Étape 3 : Transmettre les états aux cartes (`RecipeList.tsx` & `RecipeCard.tsx`)

Chaque niveau intermédiaire (`RecipeList`) se contente de faire transiter (*prop drilling*) les tableaux et fonctions vers l'enfant final (`RecipeCard`), qui affiche le bouton de suppression et le bouton favori (`FavoriteButton`).

**Points clés à retenir :**
* Pour vérifier si une carte est en favori : `favorites.includes(recipe.id)`.
* Pour déclencher le changement : appeler `onToggleFavorite(recipe.id)` remontant l'information jusqu'à `App.tsx`.
* Pour supprimer : appeler `onDelete(recipe.id)`.

---

## 3. Méthode Flash pour l'Examen

Face à un exercice similaire, posez-vous toujours ces 3 questions dans l'ordre :
1. **Où est stockée la donnée ?** $\rightarrow$ Dans le parent commun (`App.tsx`) via `useState`.
2. **Comment l'enfant la modifie-t-il ?** $\rightarrow$ Via une fonction de callback (`set...`) passée en prop.
3. **Comment les filtres se combinent-ils ?** $\rightarrow$ En combinant des variables booléennes dans un `.filter()` unique avec l'opérateur logique `&&`.