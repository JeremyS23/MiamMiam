// Affiche la page d'accueil avec la barre de recherche, les filtres (catégorie et favoris) et la grille des recettes.

import FormControlLabel from "@mui/material/FormControlLabel";
import RecipeList from "../components/RecipeList";
import type { Recipe } from "../models/recipe";
import CategoryFilter from "../components/CategoryFilter";
import SearchBar from "../components/SearchBar";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";

// S16 Consigne 6 (Optionnel) : Import du hook pour gérer les paramètres d'URL
import { useSearchParams } from "react-router";

// Convention React : on préfixe par "on" (ex: onSearchChange) les fonctions reçues en props depuis un composant parent
// pour signaler des événements/callbacks, tandis que "set" reste réservé aux setters locaux de useState.

interface HomePageProps {
	// SECTION RECIPES (Données et actions sur les recettes)
	// S16 Consigne 6 : On reçoit maintenant toutes les recettes, le filtrage se fait ici via l'URL
	recipes: Recipe[];
	onDelete: (id: number) => void; // La fonction deleteRecipe

	// SECTION FAVORIS
	showFavoritesOnly: boolean; // L'état booléen du filtre "favoris uniquement"
	onToggleFavoritesOnly: (show: boolean) => void; // La fonction setShowFavoritesOnly
	favorites: number[]; // Le tableau des IDs des recettes favorites
	onToggleFavorite: (id: number) => void; // La fonction toggleFavorite
}

const HomePage = ({
	recipes,
	onDelete,
	showFavoritesOnly,
	onToggleFavoritesOnly,
	favorites,
	onToggleFavorite,
}: HomePageProps) => {
	// S16 Consigne 6 : Lecture et modification des paramètres de requête URL
	const [searchParams, setSearchParams] = useSearchParams();

	// S16 Consigne 6 : Récupération des valeurs (avec valeur par défaut si absentes)
	const query = searchParams.get("search") ?? "";
	const catParam = searchParams.get("category");
	const selectedCategory = catParam ? Number(catParam) : null;

	// S16 Consigne 6 : Filtrage des recettes basé sur les paramètres d'URL (source de vérité)
	const filteredRecipes = recipes.filter((recipe) => {
		const matchesSearch = recipe.title.toLowerCase().includes(query.toLowerCase());
		const matchesCategory = selectedCategory === null || recipe.categoryId === selectedCategory;
		const matchesFavorites = !showFavoritesOnly || favorites.includes(recipe.id);
		return matchesSearch && matchesCategory && matchesFavorites;
	});

	// S16 Consigne 6 : Mise à jour de la recherche en conservant la catégorie actuelle dans l'URL
	const handleSearchChange = (value: string) => {
		setSearchParams({ search: value, category: catParam || "" });
	};

	// S16 Consigne 6 : Mise à jour de la catégorie en conservant la recherche actuelle dans l'URL
	const handleCategoryChange = (value: number | null) => {
		setSearchParams({ search: query, category: value ? String(value) : "" });
	};

	// S16 Consigne 6 : Réinitialisation de tous les filtres d'URL
	const handleResetFilters = () => {
		setSearchParams({});
	};

	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 4, width: "100%" }}>
			{/* Composants de filtrage contrôlés par les paramètres d'URL */}
			<SearchBar value={query} onChange={handleSearchChange} />
			<CategoryFilter selectedCategory={selectedCategory} onSelectCategory={handleCategoryChange} />

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

			{/* Passage du tableau filtré localement à la liste de recettes */}
			<RecipeList
				recipes={filteredRecipes}
				onDelete={onDelete}
				onResetFilters={handleResetFilters}
				favorites={favorites}
				onToggleFavorite={onToggleFavorite}
			/>
		</Box>
	);
};

export default HomePage;
