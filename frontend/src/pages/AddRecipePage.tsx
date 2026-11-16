// Affiche la page dédiée à la création d'une nouvelle recette via le formulaire RecipeForm.

import Box from "@mui/material/Box";
import type { NewRecipe } from "../models/recipe";
import { Typography } from "@mui/material";
import RecipeForm from "../components/RecipeForm";

interface AddRecipePageProps {
	onAdd: (recipe: NewRecipe) => void;
}

const AddRecipePage = ({ onAdd }: AddRecipePageProps) => {
	return (
		<Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 3 }}>
			<Typography variant="h4" component="h1">
				Ajouter une nouvelle recette
			</Typography>
			<RecipeForm onAdd={onAdd} />
		</Box>
	);
};

export default AddRecipePage;
