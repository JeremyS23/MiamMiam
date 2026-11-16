import { Button, IconButton, MenuItem, Rating, Stack, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, type ChangeEvent, type SyntheticEvent, type FormEvent } from "react";
import { categories } from "../data/categories";
import type { NewRecipe } from "../models/recipe";

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

// Interface pour la structure locale d'un ingrédient dans le formulaire
interface IngredientInput {
	key: number;
	name: string;
	quantity: string;
	unit: string;
}

// Interface pour la structure locale d'une étape de préparation
interface StepInput {
	key: number;
	text: string;
}

// Type union restreignant les champs modifiables d'un ingédient
type IngredientField = "name" | "quantity" | "unit"; // champs modifiables

//
interface RecipeFormProps {
	onAdd: (recipe: NewRecipe) => void;
}

// Composant de création de recette
const RecipeForm = ({ onAdd }: RecipeFormProps) => {
	// ÉTAPES
	// État local stockant la liste dynamiquement des étapes de préparation
	const [steps, setSteps] = useState<StepInput[]>([]);

	// Ajoute une nouvelle étape vide avec un identifiant unique
	const addStep = () => setSteps([...steps, { key: Date.now(), text: "" }]);

	// Supprime une étape en filtrant par sa clé unique
	const removeStep = (key: number) => setSteps(steps.filter((step) => step.key !== key));

	// Met à jour le texte de l'étape ciblée de manière immuable en copiant l'objet et modifiant 'text'
	const updateStep = (key: number, value: string) =>
		setSteps(steps.map((step) => (step.key === key ? { ...step, text: value } : step)));

	// Permet de remonter une étape dans la liste de manière immuable
	const moveStepUp = (index: number) => {
		if (index === 0) return; // Déjà tout en haut
		const newSteps = [...steps];
		const temp = newSteps[index];
		newSteps[index] = newSteps[index - 1];
		newSteps[index - 1] = temp;
		setSteps(newSteps);
	};

	// Permet de descendre une étape dans la liste de manière immuable
	const moveStepDown = (index: number) => {
		if (index === steps.length - 1) return; // Déjà tout en bas
		const newSteps = [...steps];
		const temp = newSteps[index];
		newSteps[index] = newSteps[index + 1];
		newSteps[index + 1] = temp;
		setSteps(newSteps);
	};

	// INGRÉDIENTS
	// État local stockant la liste dynamique des ingrédients saisis
	const [ingredients, setIngredients] = useState<IngredientInput[]>([]);

	// Ajoute un nouvel ingrédient avec un identifiant unique et des valeurs par défaut
	const addIngredient = () => setIngredients([...ingredients, { key: Date.now(), name: "", quantity: "", unit: " g" }]);

	// Supprime un ingrédient : filter conserve uniquement les éléments dont la clé est différente (!==) de celle ciblée
	const removeIngredient = (key: number) => setIngredients(ingredients.filter((ingredient) => ingredient.key !== key));

	// Met à jour un champ spécifique (field) de l'ingrédient ciblé en copiant l'objet via le spread operator
	const updateIngredient = (key: number, field: IngredientField, value: string) =>
		setIngredients(
			ingredients.map((ingredient) => (ingredient.key === key ? { ...ingredient, [field]: value } : ingredient)),
		);

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

	// Règles de validation pour les listes dynamiques
	const ingredientsError =
		ingredients.length === 0 || ingredients.some((ing) => ing.name.trim() === "" || Number(ing.quantity) <= 0);

	const stepsError = steps.length === 0 || steps.some((step) => step.text.trim() === "");

	// Indique si l'ensemble du formulaire est valide
	//const isValid = !titleError && !prepTimeError && !servingsError && !categoryError;

	const isValid = !titleError && !prepTimeError && !servingsError && !categoryError && !ingredientsError && !stepsError;

	// Handler unique pour màj. dynamiquement l'état du formulaire
	const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = event.target;
		setForm({ ...form, [name]: value });
	};

	// GESTION DE LA SOUMISSION DU FORMULAIRE ET CONVERSION DES DONNÉES NUMÉRIQUE
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		// Empêche le rechargement natif de la page web lors de la soumission du formulaire
		event.preventDefault();

		// Passe à l'état true pour signaler qu'une tentative de soumission a eu lieu et afficher les erreurs visuelles
		setSubmitted(true);

		// Arrête l'exécution de la fonction si le formulaire contient des erreurs (garde fou)
		if (!isValid) return;

		// Convertit les chaînes de l'état en nombres pour correspondre au format numérique attendu par le modèle
		const newRecipe = {
			...form,
			prepTime: Number(form.prepTime),
			cookTime: Number(form.cookTime),
			servings: Number(form.servings),
			difficulty: Number(form.difficulty),
			categoryId: Number(form.categoryId),
			tags: [],
			ingredients: ingredients.map((ing) => ({
				name: ing.name,
				quantity: Number(ing.quantity),
				unit: ing.unit,
			})),
			steps: steps.map((step) => step.text),
		};

		// Appel de la fonction transmise par le parent
		onAdd(newRecipe);

		// On n'affiche plus à la console!
		// console.log("Recette soumise :", newRecipe);

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

		// Réinitialise le tableau local des ingrédients pour vider la liste dynamique
		setIngredients([]);

		// Réinitialise le tableau local des étapes pour vider la liste dynamique
		setSteps([]);

		// Remet l'état de soumission à false pour effacer les messages d'erreur rouges
		setSubmitted(false);
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
			{/* Champ numérique pour le temps de préparation en minutes avec validation */}
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

			{/* SECTION INGRÉDIENTS */}
			{/* Affiche dynamiquement les champs de chaque ingrédient avec boutons de suppression */}
			<Typography variant="h6">Ingrédients</Typography>
			{ingredients.map((ingredient) => (
				<Stack key={ingredient.key} direction="row" spacing={1}>
					{/* Champ pour le nom de l'ingrédient */}
					<TextField
						label="Ingrédient"
						value={ingredient.name}
						onChange={(e) => updateIngredient(ingredient.key, "name", e.target.value)}
					/>

					{/* Champ pour la quantité de l'ingrédient */}
					<TextField
						label="Quantité"
						value={ingredient.quantity}
						onChange={(e) => updateIngredient(ingredient.key, "quantity", e.target.value)}
					/>

					{/* Champ pour l'unité de mesure */}
					<TextField
						label="Unité"
						value={ingredient.unit}
						onChange={(e) => updateIngredient(ingredient.key, "unit", e.target.value)}
					/>

					{/* Bouton pour retirer la ligne d'ingrédient  */}
					<IconButton onClick={() => removeIngredient(ingredient.key)} aria-label="Retirer">
						<DeleteIcon />
					</IconButton>
				</Stack>
			))}

			{/* Message d'erreur global pour les ingrédients */}
			{submitted && ingredientsError && (
				<Typography color="error" variant="caption">
					Ajoutez au moins un ingrédient valide (nom et quantité positive).
				</Typography>
			)}

			{/* Bouton d'ajout d'un ingrédient */}
			{/* <Button variant="contained" size="small" onClick={addIngredient} sx={{ alignSelf: "flex-start" }}>
				Ajouter un ingrédient
			</Button> */}

			<Button variant="outlined" size="small" onClick={addIngredient} sx={{ alignSelf: "flex-start" }}>
				Ajouter un ingrédient
			</Button>

			{/* SECTION ÉTAPES*/}
			<Typography variant="h6">Étapes de préparation</Typography>
			{steps.map((step, index) => (
				<Stack key={step.key} direction="row" spacing={1}>
					{/* Champ texte pour la description de l'étape */}
					<TextField
						label={`Étape ${index + 1}`}
						value={step.text}
						onChange={(s) => updateStep(step.key, s.target.value)}
					/>

					{/* Bouton pour monter l'étape (désactivé si c'est la première) */}
					<Button size="small" variant="outlined" disabled={index === 0} onClick={() => moveStepUp(index)}>
						↑
					</Button>

					{/* Bouton pour descendre l'étape (désactivé si c'est la dernière) */}
					<Button
						size="small"
						variant="outlined"
						disabled={index === steps.length - 1}
						onClick={() => moveStepDown(index)}
					>
						↓
					</Button>

					{/* Bouton pour retirer l'étape courante */}
					<IconButton onClick={() => removeStep(step.key)} aria-label="Retirer l'étape">
						<DeleteIcon />
					</IconButton>
				</Stack>
			))}

			{submitted && stepsError && (
				<Typography color="error" variant="caption">
					Ajoutez au moins une étape de préparation non vide.
				</Typography>
			)}

			{/* Bouton d'ajout d'étape */}
			{/* <Button variant="contained" size="small" onClick={addStep} sx={{ alignSelf: "flex-start" }}>
				Ajouter une étape
			</Button> */}

			<Button variant="outlined" size="small" onClick={addStep} sx={{ alignSelf: "flex-start" }}>
				Ajouter une étape
			</Button>

			{/* Bouton de validation du formulaire avec le style plein 'contained' déclenchant le submit */}
			<Button type="submit" variant="contained" size="small" sx={{ alignSelf: "center" }}>
				Créer la recette
			</Button>
		</Stack>
	);
};

export default RecipeForm;
