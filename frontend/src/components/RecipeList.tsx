import RecipeCard from "./RecipeCard";

// Importation du composant Grid de MUI
import { Grid } from "@mui/material";

const RecipeList = () => {
	return (
		// Conteneur de grille avec un espacement de 2 unités (16px) entre les éléments
		<Grid container spacing={2}>
			{/* Élément de grille occupant 12 colonnes sur mobile, 6 sur tablette, 4 sur ordinateur[cite: 2] */}
			<Grid size={{ xs: 12, sm: 6, md: 4 }}>
				<RecipeCard
					title="Pancakes moelleux"
					imageUrl="https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800"
					duration={25}
					difficulty={1}
					description="Des pancakes épais et aérés pour un brunch réussi."
					category="Brunch"
				/>
			</Grid>

			{/* Élément de grille pour la deuxième recette */}
			<Grid size={{ xs: 12, sm: 6, md: 4 }}>
				<RecipeCard
					title="Spaghetti carbonara"
					imageUrl="https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800"
					duration={25}
					difficulty={2}
					category="PLat"
				/>
			</Grid>

			{/* Élément de grille pour la troisième recette */}
			<Grid size={{ xs: 12, sm: 6, md: 4 }}>
				<RecipeCard
					title="Soupe de potiron"
					imageUrl="https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=800"
					duration={45}
					difficulty={1}
					description="Des pancakes épais et aérés pour un brunch réussi."
					category="Soupe"
				/>
			</Grid>
		</Grid>
	);
};

export default RecipeList;
