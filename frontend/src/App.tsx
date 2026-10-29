// Importation du composant de mise en page globale
import PageLayout from "./components/PageLayout";
// Importation de la liste des recettes
import RecipeList from "./components/RecipeList";
// Importation de l'image d'accueil depuis src/assets/
import logo from "./assets/MiamMiam.png";

// Importation du formulaire de création de recette
import RecipeForm from "./components/RecipeForm";

// Données de démonstration des recettes initiales
import { recipes } from "./data/recipes";

// Composants de style et de mise en page de Material-UI
import { createTheme, CssBaseline, ThemeProvider, Box, Typography } from "@mui/material";
import RecipeDetail from "./components/RecipeDetail";

// Configuration du thème avec la couleur principale
const theme = createTheme({
	palette: {
		primary: { main: "#e65100" }, // Orange MiamMiam
	},
});

// Composant racine de l'application
const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{/* Affichage de l'image d'accueil importée depuis src/assets/ */}
			<img src={logo} alt="MiamMiam Accueil" style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }} />
			{/* Emballage de l'application dans le composant de mise en page */}
			<PageLayout title="MiamMiam">
				{/*
				 * Box conteneur en colonne (flexDirection: "column") pour empiler
				 * proprement la grille de recettes et le détail provisoire de la première recette
				 */}
				<Box sx={{ display: "flex", flexDirection: "column", gap: 4, width: "100%" }}>
					
					{/* Composant de saisie et de validation du formulaire de création */}
					<RecipeForm />
					
					{/* RecipeList est transmis automatiquement à la prop children de PageLayout */}
					<RecipeList />

					{/* Affichage provisoire des détails de la première recette du tableau (index 0) */}
					{recipes.length > 0 && <RecipeDetail recipe={recipes[0]} />}
				</Box>
			</PageLayout>
			{/* Pied de page centré avec un espacement vertical */}
			<Box component={"footer"} sx={{ textAlign: "center", py: 4 }}>
				<Typography variant="body2" color="text.secondary">@MiamMiam</Typography>
			</Box>
		</ThemeProvider>
	);
};

// Exportation du composant principal
export default App;
