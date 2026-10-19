import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
	Chip,
	Box,
	Rating,
	IconButton,
} from "@mui/material";

// Importation des icônes de favoris Material-UI
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

// Importation du type Recipe pour le typage des props
import type { Recipe } from "../models/recipe";

// Importation du tableau des catégories pour récupérer le nom de la catégorie via son ID
import { categories } from "../data/categories";
import { useState } from "react";

// Interface décrivant la structure des props reçues par le composant
interface RecipeCardProps {
	recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
	// Déclaration de l'état local pour gérer le statut favori de la carte
	const [isFavorite, setIsFavorite] = useState(false);

	// Recherche de la catégorie correspondante à l'aide de l'identifiant de la recette
	const category = categories.find((cat) => cat.id === recipe.categoryId);

	return (
		// Conteneur principal de la carte avec une largeur maximale fixe
		// Force la carte à occuper toute la hauteur disponible avec une disposition flexible en colonne
		<Card sx={{ maxWidth: 345, height: "100%", display: "flex", flexDirection: "column" }}>
			{/* Affichage de l'image de la recette via CardMedia */}
			<CardMedia component="img" height="200" image={recipe.imageUrl} alt={recipe.title} />

			{/* Contenu textuel principal de la carte */}
			{/* Permet au contenu textuel de s'étendre pour aligner le bouton en bas */}
			<CardContent sx={{ flexGrow: 1 }}>
				{/* Conteneur flexible pour aligner la catégorie et les tags */}
				<Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 1 }}>
					{/* Affichage conditionnel du nom de la catégorie dans un Chip si elle existe */}
					{category && <Chip label={category.name} color="primary" size="small" />}

					{/* Transformation du tableau des tags de la recette en balises Chip */}
					{recipe.tags.map((tag) => (
						<Chip key={tag} label={tag} variant="outlined" size="small" />
					))}
				</Box>

				{/* Affichage du titre principal de la recette */}
				<Typography variant="h6" component="h2">
					{recipe.title}
				</Typography>

				{/* Affichage de la durée totale calculée (préparation + cuisson) */}
				<Typography variant="body2" color="text.secondary">
					{recipe.prepTime + recipe.cookTime} min, pour {recipe.servings} personnes
				</Typography>

				{/* Conteneur pour espacer et afficher la note de difficulté sous forme d'étoiles */}
				<Box sx={{ mt: 1 }}>
					<Rating value={recipe.difficulty} max={5} readOnly size="small" />
				</Box>
			</CardContent>

			{/* Zone de bas de carte réservée aux actions */}
			<CardActions>
				{/* Bouton d'action pour consulter le détail de la recette */}
				<Button size="small">Voir la recette</Button>

				{/* Bouton interactif pour basculer l'état favori */}
				<IconButton
					color="primary"
					aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
					onClick={() => setIsFavorite((prev) => !prev)}
				>
					{/* Affiche l'icône pleine si favori, sinon l'icône vide */}
					{isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
				</IconButton>
			</CardActions>
		</Card>
	);
};

export default RecipeCard;
