// Affiche le détail complet d'une recette (provisoirement la première recette en attendant useParams).

import { Box, Typography, Button } from "@mui/material";
// S16 Consigne 1 : Import des hooks useParams et useNavigate pour lire l'URL et naviguer
import { useParams, useNavigate, Link } from "react-router";
import type { Recipe } from "../models/recipe";
import RecipeDetail from "../components/RecipeDetail";

interface RecipeDetailPageProps {
	recipes: Recipe[];
	// S16 Consigne 3 : Ajout de la prop onDelete reçue depuis App.tsx
	onDelete: (id: number) => void;
}

const RecipeDetailPage = ({ recipes, onDelete }: RecipeDetailPageProps) => {
	// S16 Consigne 1 : Lecture de l'ID dynamique dans l'URL
	const { id } = useParams();
	// S16 Consigne 2 : Initialisation du hook de navigation
	const navigate = useNavigate();
	
	// S16 Consigne 1 : Conversion de l'ID en nombre et recherche de la recette correspondante
	const recipeId = Number(id);
	const recipe = recipes.find((r) => r.id === recipeId);

	// S16 Consigne 1 : Gestion de l'ID invalide (NaN) ou recette introuvable avec lien vers la liste
	if (isNaN(recipeId) || !recipe) {
		return (
			<Box sx={{ p: 3, textAlign: "center" }}>
				<Typography variant="h6" color="error">Recette introuvable.</Typography>
				<Button component={Link} to="/" sx={{ mt: 2 }}>Retour à la liste</Button>
			</Box>
		);
	}

	// S16 Consigne 3 : Suppression de la recette et navigation avec replace pour empêcher le retour arrière
	const handleDelete = () => {
		onDelete(recipe.id);
		navigate("/", { replace: true });
	};

	return (
		<Box sx={{ p: 3 }}>
			{/* S16 Consigne 2 : Bouton de retour utilisant l'historique du navigateur */}
			<Button onClick={() => navigate(-1)} sx={{ mb: 2 }}>Retour</Button>
			<RecipeDetail recipe={recipe} />
			{/* S16 Consigne 3 : Bouton de suppression déplacé ici depuis RecipeCard */}
			<Button color="error" onClick={handleDelete} sx={{ mt: 3 }}>Supprimer cette recette</Button>
		</Box>
	);
};

export default RecipeDetailPage;