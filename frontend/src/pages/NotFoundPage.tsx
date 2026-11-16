// Affiche une page d'erreur 404 avec un bouton de retour vers l'accueil lorsqu'une URL est inconnue.

import { Box, Button, Typography } from "@mui/material"
import { Link } from "react-router"

const NotFoundPage = () => {
    return (
        <Box sx={{textAlign: "center", py: 4}}>
            <Typography variant="h4" component="h1" gutterBottom>
                Page introuvable
            </Typography>
            <Button component={Link} to="/" variant="contained">
            Retour aux recettes
            </Button>
        </Box>
    )
}

export default NotFoundPage;