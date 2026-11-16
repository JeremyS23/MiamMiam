import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

interface FavoriteButtonProps {
    isFavorite: boolean;
    onToggle: () => void;
}

const FavoriteButton = ({ isFavorite, onToggle }: FavoriteButtonProps) => {
    return (
        <IconButton 
            onClick={onToggle} 
            color="primary"
            aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
            {/* Affiche le cœur plein si c'est un favori, sinon le cœur vide */}
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
    );
};

export default FavoriteButton;