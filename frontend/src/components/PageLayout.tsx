// Importation du type ReactNode pour typer la prop children
import type { ReactNode } from "react";

// Interface décrivant les props du composant PageLayout
interface PageLayoutProps {
  // Titre principal de la page
  title: string;
  // Éléments JSX enfants injectés entre les balises du composant
  children: ReactNode;
}

// Composant conteneur de mise en page générale
const PageLayout = ({ title, children }: PageLayoutProps) => {
  return (
    // Conteneur principal de la page
    <div className="page">
      {/* En-tête de la page avec le titre dynamique */}
      <header>
        <h1>{title}</h1>
      </header>

      {/* Zone principale contenant les composants enfants */}
      <main>{children}</main>

      {/* Pied de page fixe */}
      <footer>&copy; 2026 MiamMiam</footer>
    </div>
  );
};

// Exportation du composant de layout
export default PageLayout;