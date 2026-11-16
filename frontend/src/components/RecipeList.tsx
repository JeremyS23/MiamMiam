// Importation du composant individuel d'affichage d'une carte de recette
import RecipeCard from "./RecipeCard";

// Importation du composant Grid de Material-UI pour la mise en page en grille
import { Box, Button, Grid, Typography } from "@mui/material";

// Importation du tableau de données brutes des recettes depuis le module data
// Inutile car les recettes sont désormais reçues dynamiquement du parent via les props
// import { recipes } from "../data/recipes";

import type { Recipe } from "../models/recipe";

// Définition de l'interface des props pour typer le tableau de recettes reçues
interface RecipeListProps {
	recipes: Recipe[];
	onDelete: (id: number) => void; // Ajout du type pour la fonction de suppression
	onResetFilters?: () => void; // Fonction facultative pour réinitialiser
	favorites: number[];
	onToggleFavorite: (id: number) => void;
}

const RecipeList = ({ recipes, onDelete, onResetFilters, favorites, onToggleFavorite }: RecipeListProps) => {
	if (recipes.length === 0) {
		// return <Typography>Aucune recette pour le moment.</Typography>;

		return (
			<Box sx={{ textAlign: "center", py: 4 }}>
				<Typography variant="body1" color="text.secondary" gutterBottom>
					Aucune recette ne correspond à votre recherche ou à vos filtres.
				</Typography>

				{/* Si la focntion est fournie, on affiche le bouton de réinitialisation */}
				{onResetFilters && (
					<Button variant="outlined" onClick={onResetFilters} sx={{ mt: 2 }}>
						Réinitialiser les filtres
					</Button>
				)}
			</Box>
		);
	}

	return (
		/* Conteneur de grille global avec un espacement de 2 unités (16px) entre chaque carte*/
		<Grid container spacing={2}>
			{/*
			 * Parcours du tableau des recettes avec map() pour transformer
			 * chaque objet de données en un élément JSX affichable[cite: 1]
			 */}
			{recipes.map((recipe) => (
				/*
				 * Élément de grille pour une recette :
				 * - key : identifiant unique obligatoire pour que React gère efficacement les mises à jour
				 * - size : adaptation responsive (12 colonnes sur mobile, 6 sur tablette, 4 sur desktop)
				 */
				<Grid key={recipe.id} size={{ xs: 12, sm: 6, md: 4 }}>
					{/* Transmission de l'objet recette et des états de favoris au composant carte  */}
					<RecipeCard 
					recipe={recipe} 
					onDelete={onDelete}
					isFavorite={favorites.includes(recipe.id)}
					onToggle={()=> onToggleFavorite(recipe.id)}
					/>
				</Grid>
			))}
		</Grid>
	);
};

export default RecipeList;
