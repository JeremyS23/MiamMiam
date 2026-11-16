// Affiche le détail complet d'une recette (provisoirement la première recette en attendant useParams).

import { Box, Typography } from "@mui/material";
import type { Recipe } from "../models/recipe";
import RecipeDetail from "../components/RecipeDetail";

interface RecipeDetailPageProps {
	recipes: Recipe[];
}

const RecipeDetailPage = ({ recipes }: RecipeDetailPageProps) => {
	return ( 
    <Box sx={{ width: 100 }}>
        {recipes.length > 0 ? (
            <RecipeDetail recipe={recipes[0]} />
        ) : (
            <Typography>Aucune recette disponible</Typography>
        )}
    </Box>
    );
};

export default RecipeDetailPage;
