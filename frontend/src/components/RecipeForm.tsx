import { Button, MenuItem, Rating, Stack, TextField, Typography } from "@mui/material";
import { useState, type ChangeEvent, type SyntheticEvent, type FormEvent } from "react";
import { categories } from "../data/categories";

// Interface représentant les données du formulaire
interface RecipeFormData {
	title: string;
	description: string;
	imageUrl: string;
	prepTime: string;
	cookTime: string;
	servings: string;
	difficulty: string;
	categoryId: string;
}

// Composant de création de recette
const RecipeForm = () => {
	// État unique regroupant tout les champs du formulaire initialisés à "vide"
	const [form, setForm] = useState<RecipeFormData>({
		title: "",
		description: "",
		imageUrl: "",
		prepTime: "",
		cookTime: "",
		servings: "",
		difficulty: "",
		categoryId: "",
	});

	// État pour suivre si le formulaire a déjà été soumis au moins une fois
	const [submitted, setSubmitted] = useState(false);

	// Règles de validation déduites de l'état
	const titleError = form.title.trim().length < 3;

	const prepTimeError = form.prepTime === "" || Number(form.prepTime) < 0;

	const servingsError = form.servings.trim() === "" || Number(form.servings) < 1;

	const categoryError = form.categoryId === "";

	// Indique si l'ensemble du formulaire est valide
	const isValid = !titleError && !prepTimeError && !servingsError && !categoryError;

	// Handler unique pour màj. dynamiquement l'état du formulaire
	const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = event.target;
		setForm({ ...form, [name]: value });
	};

	// Gestion de la soumission du formulaire et conversion des données numériques
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		// Empêche le rechargement natif de la page web lors de la soumission du formulaire
		event.preventDefault();

		setSubmitted(true);
		if (!isValid) return;

		// Convertit les chaînes de l'état en nombres pour correspondre au format numérique attendu par le modèle
		const newRecipe = {
			...form,
			prepTime: Number(form.prepTime),
			cookTime: Number(form.cookTime),
			servings: Number(form.servings),
			difficulty: Number(form.difficulty),
			categoryId: Number(form.categoryId),
		};

		console.log("Recette soumise :", newRecipe);

		// Réinitialise l'état du formulaire en remettant tous les champs à des chaînes vides
		setForm({
			title: "",
			description: "",
			imageUrl: "",
			prepTime: "",
			cookTime: "",
			servings: "",
			difficulty: "",
			categoryId: "",
		});
	};

	return (
		// Transforme le Stack en balise <form> HTML et intercepte sa soumission via handleSubmit
		<Stack component="form" spacing={2} sx={{ mb: 4 }} onSubmit={handleSubmit}>
			{/* <TextField label="Titre" name="title" value={form.title} onChange={handleChange} /> */}
			{/* Champ texte pour le titre de la recette avec gestion des erreurs*/}
			<TextField
				label="Titre"
				name="title"
				value={form.title}
				onChange={handleChange}
				error={submitted && titleError}
				helperText={submitted && titleError ? "Au moins 3 caractères : " : ""}
			/>

			{/* Champ texte pour la description */}
			<TextField label="Description" name="description" value={form.description} onChange={handleChange} />

			{/* Champ texte pour l'URL de l'image */}
			<TextField label="Url de l'image" name="imageUrl" value={form.imageUrl} onChange={handleChange} />

			{/* Temps de préparation en minutes */}
			{/* <TextField
				label="Préparation (min)"
				name="prepTime"
				type="number"
				value={form.prepTime}
				onChange={handleChange}
			/> */}
			
			{/* Champ numérique pour le nombre de portions avec validation */}
			<TextField
				label="Préparation (min)"
				name="prepTime"
				type="number"
				value={form.prepTime}
				onChange={handleChange}
				error={submitted && prepTimeError}
				helperText={submitted && prepTimeError ? "Le temps doit être positif ou nul : " : ""}
			/>

			{/* Champ numérique pour le temps de cuisson en minutes */}
			<TextField label="Cuisson (min)" name="cookTime" type="number" value={form.cookTime} onChange={handleChange} />

			{/* Nombre de portions */}
			{/* <TextField label="Portions" name="servings" type="number" value={form.servings} onChange={handleChange} /> */}
			
			{/* Champ numérique pour le nombre de portions avec validation */}
			<TextField
				label="Portions"
				name="servings"
				type="number"
				value={form.servings}
				onChange={handleChange}
				error={submitted && servingsError}
				helperText={submitted && servingsError ? "Au moins une portion requise : " : ""}
			/>

			{/* Sélection de la difficulté avec le composant Rating */}
			<Stack spacing={1}>
				<Typography component="legend"> Difficulté</Typography>

				{/* Composant de notation par étoiles gérant la mise à jour de la difficulté dans l'état */}
				<Rating
					name="difficulty"
					// Convertit la chaîne de l'état en nombre pour le composant Rating (ou 0 si vide)
					value={form.difficulty ? Number(form.difficulty) : 0}
					// Événement déclenché lors du clic sur une étoile ; récupère la nouvelle valeur numérique ou null
					onChange={(_event: SyntheticEvent, newValue: number | null) => {
						// Met à jour l'état global en copiant l'objet et en convertissant la valeur en chaîne (ou chaîne vide si null)
						setForm({ ...form, difficulty: newValue ? String(newValue) : "" });
					}}
				/>
			</Stack>
			{/* Transforme le TextField en liste déroulante grâce à l'attribut select */}
			{/* <TextField select label="Catégorie" name="categoryId" value={form.categoryId} onChange={handleChange}> */}
			
			{/* Liste déroulante des catégories générée dynamiquement avec validation */}
			<TextField
				select
				label="Catégorie"
				name="categoryId"
				value={form.categoryId}
				onChange={handleChange}
				error={submitted && categoryError}
				helperText={submitted && categoryError ? "Veuillez choisir une catégorie : " : ""}
			>
				{/* Parcourt dynamiquement le tableau des catégories pour générer les options cliquables MenuItem */}
				{categories.map((cat) => (
					<MenuItem key={cat.id} value={String(cat.id)}>
						{cat.name}
					</MenuItem>
				))}
			</TextField>

			{/* Bouton de validation du formulaire avec le style plein 'contained' déclenchant le submit */}
			<Button type="submit" variant="contained">
				Créer la recette
			</Button>
		</Stack>
	);
};

export default RecipeForm;
