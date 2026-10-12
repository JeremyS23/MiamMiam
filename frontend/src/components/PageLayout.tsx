// Importation du type ReactNode pour typer la prop children
import type { ReactNode } from "react";

// Importation de composants MUI nécessaires pour l'en-tête et la structure
import { AppBar, Toolbar, Typography, Container, Box, Stack } from "@mui/material";

// Interface décrivant les props du composant PageLayout
interface PageLayoutProps {
	// Titre principal de la page
	title: string;
	// Éléments JSX enfants injectés entre les balises du composant
	children: ReactNode;
}

// Composant conteneur global gérant la structure de base de la page
const PageLayout = ({ title, children }: PageLayoutProps) => {
	return (
    // Boîte flexible principale occupant toute la hauteur de l'écran (100vh = 100% de la hauteur de la vue)
		<Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
			{/* Barre de navigation supérieure (AppBar) fixe dans le flux normal */}
      <AppBar position="static">
				{/* Barre d'outils interne alignant les éléments de l'en-tête */}
        <Toolbar>
					{/* Composant de texte typographié stylisé en titre h6 mais générant une balise HTML h1 sémantique */}
          <Typography variant="h6" component="h1">
						{title}
					</Typography>
				</Toolbar>
			</AppBar>
			{/* Conteneur centré avec une largeur maximale de type grand (lg) */}
      {/* mt: 4 = margin-top de 4 unités (32px), mb: 4 = margin-bottom de 4 unités (32px), flex: 1 = occupe l'espace disponible */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flex: 1 }}>
				{/* Stack organise les composants enfants en ligne (direction="row") avec un espacement fixe */}
        {/* spacing={2} = espace de 2 unités (16px) entre chaque élément enfant */}
        <Stack direction="row" spacing={2}>
					{children}
				</Stack>
			</Container>
		</Box>
	);
};

// Exportation du composant de layout (pour l'utiliser ailleurs)
export default PageLayout;
