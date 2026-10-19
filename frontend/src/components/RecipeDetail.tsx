import { Typography, Box, Stack, IconButton, CardActions, Button } from "@mui/material";
import type { Recipe } from "../models/recipe";

// Importation du hook d'état React
import { useState } from "react";

// Importation des icônes de décrémentation et d'incrémentation
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

// Interface définissant les propriétés attendues par le composant RecipeDetail
interface RecipeDetailProps {
	recipe: Recipe;
}

const RecipeDetail = ({ recipe }: RecipeDetailProps) => {
	// Déclaration de l'état local pour gérer l'affichage ou le masquage des étapes
	const [showSteps, setShowSteps] = useState(true);

	// Déclaration de l'état local des portions, initialisé avec la valeur de la recette
	const [servings, setServings] = useState(recipe.servings);

	// Calcul du ration pour adapter les quantités d'ingrédients selon les portions choisies
	const ratio = servings / recipe.servings;

	return (
		// Conteneur principal avec une marge supérieure de 4 unités (32px)
		<Box sx={{ mt: 4 }}>
			{/* Titre principal de la recette */}
			<Typography variant="h4" gutterBottom>
				{recipe.title}
			</Typography>

			{/* Description de la recette */}
			<Typography variant="body1" sx={{ mb: 2 }}>
				{recipe.description}
			</Typography>

			{/* Informations sur le temps, la cuisson et les portions */}
			<Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
				Préparation : {recipe.prepTime} min | Cuisson : {recipe.cookTime} min | Portions : {recipe.servings}
			</Typography>

			{/* Sélecteur de portions interactif */}
			<Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 2 }}>
				{/* Bouton de la décrémentation, désactivé si les portions sont égales ou inférieures à 1 */}
				<IconButton
					// Empêche le nombre de portions de descendre en dessous de 1
					onClick={() => setServings((prev) => Math.max(1, prev - 1))}
					disabled={servings <= 1}
					aria-label="Moins"
				>
					<RemoveIcon />
				</IconButton>

				{/* Affichage du nombre de portions actuel */}
				<Typography>{servings} personnes</Typography>

				{/* Bouton d'incrémentation des portions */}
				<IconButton onClick={() => setServings((prev) => prev + 1)} aria-label="Plus">
					<AddIcon />
				</IconButton>
			</Stack>

			{/* Section des ingrédients sous forme de liste non ordonnée */}
			<Typography variant="h6">Ingrédients</Typography>
			<ul>
				{recipe.ingredients.map((ing) => (
					<li key={ing.name}>
						{/* Multiplie la quantité initiale par le ratio et arrondit 1 décimale max */}
						{(ing.quantity * ratio).toFixed(1)} {ing.unit} {ing.name}
					</li>
				))}
			</ul>

			{/* Bouton pour basculer l'affichage de la section des étapes */}
			<Button variant="outlined" sx={{ mt: 2, mb: 1 }} onClick={() => setShowSteps((prev) => !prev)}>
				{showSteps ? "Masquer les étapes" : "Afficher les étapes"}
			</Button>

			{/* Affichage conditionnel de la section des étapes selon l'état showSteps */}
			{showSteps && (
				<Box>
					{/* Titre de la section des étapes  */}
					<Typography variant="h6" sx={{ mt: 2 }}>
						Étapes
					</Typography>
					{/* Liste ordonnée des étapes de préparation */}
					<ol>
						{recipe.steps.map((step, index) => (
							<li key={index}>{step}</li>
						))}
					</ol>
				</Box>
			)}
		</Box>
	);
};

export default RecipeDetail;
