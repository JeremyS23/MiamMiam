import { Chip, Stack } from "@mui/material";

// Importation de la liste des catégories depuis les données statiques
import { categories } from "../data/categories";

// Définition de l'interface des props
// selectedCategory : l'id de la catégorie active (ou null pour "Toutes")
// onSelectedCategory : fonction callback pour remonter le choix au parent
interface CategoryFilterProps {
	selectedCategory: number | null;
	onSelectCategory: (categoryId: number | null) => void;
}

const CategoryFilter = ({ selectedCategory, onSelectCategory }: CategoryFilterProps) => {
    return (
        // Stack aligne les éléments horizontalement (direction="row" avec un espacement de 1 unité (spacing={1}))
        <Stack direction="row" spacing={1}>
            {/* Chip dédiée pour réinitialiser le filtre et afficher toutes les recettes */}
            <Chip
            label="Toutes"
            // Si aucune catégorie n'est sélectionnée (null), le chip adopte la couleur primaire, sinon par défaut
            color={selectedCategory === null ? "primary" : "default"}
            // Au click, on remonte 'null' au parent pour désactiver le filtre de catégorie
            onClick={() => onSelectCategory(null)} 
            />

            {/* Génération dynamique d'un Chip pour chaque catégorie disponible dans le tableau */}
            {categories.map((category) => (
                <Chip
                key={category.id}
                label={category.name}
                // Le chip est mis en avant (primary) si son id correspond à la catégorie active, sinon par défaut
                color={selectedCategory === category.id ? "primary" : "default"}
                // Au clic, on remonte l'id de cette catégorie spécifique au parent
                onClick={() => onSelectCategory(category.id)} 
                />
            ))}
        </Stack>
    )
};

export default CategoryFilter;
