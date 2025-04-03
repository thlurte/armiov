import {Outlet} from "react-router-dom"
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Box, CssBaseline, Container } from '@mui/material'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
            light: '#42a5f5',
            dark: '#1565c0',
        },
        secondary: {
            main: '#9c27b0',
            light: '#ba68c8',
            dark: '#7b1fa2',
        },
        background: {
            default: '#f8f9fa',
            paper: '#ffffff',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 500,
        },
        h2: {
            fontWeight: 500,
        },
        h3: {
            fontWeight: 500,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    fontWeight: 500,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                },
            },
        },
    },
})

export default function RootLayout() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ 
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'background.default'
            }}>
                <Navbar />
                <Container 
                    maxWidth="lg" 
                    sx={{ 
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        px: { xs: 2, sm: 3 },
                        pb: 4
                    }}
                >
                    <Outlet />
                </Container>
                <Footer />
            </Box>
        </ThemeProvider>
    )
} 