// Importation du composant TextField pour le champ de saisie
import { TextField } from "@mui/material";

// Définition de l'interface des props
// Ce composant est "contrôlé", il ne gère pas son propre état
// Il reçoit la valeur actuelle et une
interface SearchBarProps {
	value: string;
	onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
	return (
		<TextField
			label="Rechercher une recette"
			// La valeur affichée est dictée entièrement par le parent (flux descendant)
			value={value}
			// À chaque modification, on apelle la fonction du parent pour lui transmettre la nouvelle valeur (flux remontant)
			onChange={(e) => onChange(e.target.value)}
			// Permet au champ de s'étendre sur toute la largeur disponible
			fullWidth
		/>
	);
};

export default SearchBar;
