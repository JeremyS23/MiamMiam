// Affiche la page dédiée à la création d'une nouvelle recette via le formulaire RecipeForm.

import { Box, Typography, Button } from "@mui/material";
// S16 Consigne 4 : Import de useNavigate pour la redirection après ajout
import { useNavigate } from "react-router";
import type { NewRecipe } from "../models/recipe";
import RecipeForm from "../components/RecipeForm";

interface AddRecipePageProps {
	// S16 Consigne 4 : Le type de onAdd change pour retourner le number (ID créé)
	onAdd: (recipe: NewRecipe) => number;
}

const AddRecipePage = ({ onAdd }: AddRecipePageProps) => {
	const navigate = useNavigate();

	// S16 Consigne 4 : Récupération de l'ID créé et navigation vers la page de détail de la nouvelle recette
	const handleAdd = (newRecipe: NewRecipe) => {
		const newId = onAdd(newRecipe);
		navigate(`/recipes/${newId}`);
	};

	return (
		<Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 3, p: 3 }}>
			<Typography variant="h4" component="h1">
				Ajouter une nouvelle recette
			</Typography>
			<RecipeForm onAdd={handleAdd} />
			{/* S16 Consigne 5 : Bouton Annuler revenant à la page précédente de l'historique */}
			<Button variant="outlined" onClick={() => navigate(-1)} sx={{ alignSelf: "flex-start", mt: 2 }}>
				Annuler
			</Button>
		</Box>
	);
};

export default AddRecipePage;