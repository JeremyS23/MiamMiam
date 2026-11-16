// Importation de composants MUI nécessaires pour l'en-tête et la structure
import { AppBar, Toolbar, Typography, Container, Button } from "@mui/material";
import { Link, Outlet } from "react-router";

// Interface décrivant les props du composant PageLayout
interface PageLayoutProps {
	favoriteCount?: number; // Nombre de favoris à afficher dans la barre de navigation
}

// Composant conteneur global gérant la structure de base de la page
// const PageLayout = ({ title, children, favoriteCount = 0 }: PageLayoutProps) => {

const PageLayout = ({ favoriteCount = 0 }: PageLayoutProps) => {
	return (
		<>
			<AppBar position="static">
				<Toolbar>
					{/* Titre de l'application avec affichage optionnel des favoris */}
					<Typography variant="h6" sx={{ flexGrow: 1 }}>
						MiamMiam {favoriteCount > 0 && `(${favoriteCount} favoris)`}
					</Typography>

					{/* Lien vers la page d'accueil (liste des recettes) */}
					<Button component={Link} to="/" color="inherit">
						Recettes
					</Button>
					{/* Lien vers le formulaire d'ajout */}
					<Button component={Link} to="/recipes/new" color="inherit">
						Ajouter
					</Button>
				</Toolbar>
			</AppBar>

			{/* Conteneur principal affichant la page active de la route enfant */}
			<Container sx={{ py: 4 }}>
				<Outlet />
			</Container>
		</>
	);
};

// Exportation du composant de layout (pour l'utiliser ailleurs)
export default PageLayout;
