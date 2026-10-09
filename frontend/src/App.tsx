// Importation du composant de mise en page globale
import PageLayout from "./components/PageLayout";
// Importation de la liste des recettes
import RecipeList from "./components/RecipeList";

// Composant racine de l'application
const App = () => {
  return (
    // Emballage de l'application dans le composant de mise en page
    <PageLayout title="MiamMiam">
      {/* RecipeList est transmis automatiquement à la prop children de PageLayout */}
      <RecipeList />
    </PageLayout>
  );
};

// Exportation du composant principal
export default App;