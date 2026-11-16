// Affiche la page d'accueil avec la barre de recherche, les filtres (catégorie et favoris) et la grille des recettes.

import FormControlLabel from "@mui/material/FormControlLabel";
import RecipeList from "../components/RecipeList";
import type { Recipe } from "../models/recipe";
import CategoryFilter from "../components/CategoryFilter";
import SearchBar from "../components/SearchBar";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";

// Convention React : on préfixe par "on" (ex: onSearchChange) les fonctions reçues en props depuis un composant parent 
// pour signaler des événements/callbacks, tandis que "set" reste réservé aux setters locaux de useState.

interface HomePageProps {
	// SECTION RECIPES (Données et actions sur les recettes)
	recipes: Recipe[]; // le tableau filtré filteredRecipes
	onDelete: (id: number) => void; // La fonction deleteRecipe

	// SECTION RECHERCHES
	searchQuery: string; // La valeur actuelle du texte de recherche
	onSearchChange: (query: string) => void; // La fonction setSearchQuery
	selectedCategory: number | null; // L'ID de la catégorie sélectionnée (ou null)
	onSelectedCategory: (categoryId: number | null) => void; // La fonction setSelectedCategory
	onResetFilters: () => void; // La fonction réinitialisant tous les filtres

	// SECTION FAVORIS
	showFavoritesOnly: boolean; // L'état booléen du filtre "favoris uniquement"
	onToggleFavoritesOnly: (show: boolean) => void; // La fonction setShowFavoritesOnly
	favorites: number[]; // Le tableau des IDs des recettes favorites
	onToggleFavorite: (id: number) => void; // La focntion toggleFavorite
}

const HomePage = ({
	recipes,
	onDelete,
	searchQuery,
	onSearchChange,
	selectedCategory,
	onSelectedCategory,
	showFavoritesOnly,
	onToggleFavoritesOnly,
	favorites,
	onToggleFavorite,
	onResetFilters,
}: HomePageProps) => {
	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 4, width: "100%" }}>
			{/* Composants de filtrage contrôlés par App */}
			<SearchBar value={searchQuery} onChange={onSearchChange} />
			<CategoryFilter selectedCategory={selectedCategory} onSelectCategory={onSelectedCategory} />

			{/* Pour afficher uniquement les favoris */}
			<FormControlLabel
				control={
					<Switch
						checked={showFavoritesOnly}
						onChange={(e) => onToggleFavoritesOnly(e.target.checked)}
						color="primary"
					/>
				}
				label="Afficher uniquement les favoris"
			/>

			{/* Passage du tableau filtré à la liste de recettes */}
			<RecipeList
				recipes={recipes}
				onDelete={onDelete}
				onResetFilters={onResetFilters}
				favorites={favorites}
				onToggleFavorite={onToggleFavorite}
			/>
		</Box>
	);
};

export default HomePage;
