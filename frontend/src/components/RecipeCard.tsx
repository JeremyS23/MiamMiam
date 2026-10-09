// L'interface qui av décrire la forme de l'objet props
interface RecipeCardProps {
	title: string;
	imageUrl: string;
	duration: number;
	difficulty: number; // de 1 (facile) à 5 (difficile)
	description?: string;
}

const RecipeCard = ({ title, imageUrl, duration, difficulty, description = "Pas de description" }: RecipeCardProps) => {
	return (
		<div className="recipe-card">
			<h2>{title}</h2>
			<img src={imageUrl} alt={title} />
			<p>Durée : {duration} minutes</p>
			<p>Difficulté : {difficulty}/5</p>
			{description && <p>{description}</p>}
		</div>
	);
};

export default RecipeCard;
