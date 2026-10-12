// Importation du composant de mise en page globale
import PageLayout from "./components/PageLayout";
// Importation de la liste des recettes
import RecipeList from "./components/RecipeList";
// Importation de l'image d'accueil depuis src/assets/
import logo from "./assets/MiamMiam.png";

//
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

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
				{/* RecipeList est transmis automatiquement à la prop children de PageLayout */}
				<RecipeList />
			</PageLayout>
		</ThemeProvider>
	);
};

// Exportation du composant principal
export default App;
