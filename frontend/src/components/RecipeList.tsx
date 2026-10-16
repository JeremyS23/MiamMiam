// Importation du composant individuel d'affichage d'une carte de recette
import RecipeCard from "./RecipeCard";

// Importation du composant Grid de Material-UI pour la mise en page en grille
import { Grid, Typography } from "@mui/material";

// Importation du tableau de données brutes des recettes depuis le module data
import { recipes } from "../data/recipes";

const RecipeList = () => {
	if (recipes.length === 0) {
		return <Typography>Aucune recette pour le moment.</Typography>;
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
					{/* Transmission de l'objet recette entier sous forme de prop au composant carte */}
					<RecipeCard recipe={recipe} />
				</Grid>
			))}
		</Grid>
	);
};

export default RecipeList;
