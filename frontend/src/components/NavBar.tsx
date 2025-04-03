import { AppBar, Toolbar, Box, Button, Typography, Container } from '@mui/material'
import { Link } from 'react-router-dom'
import ScienceIcon from '@mui/icons-material/Science'
import DashboardIcon from '@mui/icons-material/Dashboard'
import InfoIcon from '@mui/icons-material/Info'
import LoginIcon from '@mui/icons-material/Login'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

export default function Navbar() {
    return (
        <AppBar 
            position="static" 
            elevation={0}
            sx={{ 
                backgroundColor: '#f5f7fa', // Light gray background
                borderRadius: '0 0 32px 32px', // More curved bottom
                mb: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                    backgroundColor: '#e8eef7', // Lighter blue on hover
                },
                borderBottom: '1px solid rgba(0,0,0,0.05)'
            }}
        >
            <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
                <Toolbar 
                    sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        py: 1.5,
                        minHeight: '64px'
                    }}
                >
                    <Typography 
                        variant="h5" 
                        component={Link} 
                        to="/" 
                        sx={{ 
                            color: 'primary.dark',
                            textDecoration: 'none',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            transition: 'color 0.3s ease',
                            '&:hover': {
                                color: 'primary.main'
                            }
                        }}
                    >
                        <ScienceIcon sx={{ fontSize: 32 }} />
                        LeukemiaAI
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                        <Button
                            component={Link}
                            to="/"
                            startIcon={<DashboardIcon />}
                            sx={{ 
                                borderRadius: 3,
                                px: 2.5,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    backgroundColor: 'rgba(25, 118, 210, 0.08)',
                                    transform: 'translateY(-2px)'
                                }
                            }}
                        >
                            Dashboard
                        </Button>
                        <Button
                            component={Link}
                            to="/analysis"
                            variant="contained"
                            startIcon={<ScienceIcon />}
                            sx={{ 
                                borderRadius: 3,
                                px: 2.5,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-2px)'
                                }
                            }}
                        >
                            Analysis
                        </Button>
                        <Button
                            component={Link}
                            to="/about"
                            startIcon={<InfoIcon />}
                            sx={{ 
                                borderRadius: 3,
                                px: 2.5,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    backgroundColor: 'rgba(25, 118, 210, 0.08)',
                                    transform: 'translateY(-2px)'
                                }
                            }}
                        >
                            About
                        </Button>

                        {/* Divider between nav links and auth buttons */}
                        <Box 
                            sx={{ 
                                height: 24, 
                                borderLeft: '2px solid rgba(0,0,0,0.08)',
                                margin: '8px 8px'
                            }} 
                        />

                        {/* Auth Buttons */}
                        <Button
                            component={Link}
                            to="/login"
                            startIcon={<LoginIcon />}
                            sx={{ 
                                borderRadius: 3,
                                px: 2.5,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    backgroundColor: 'rgba(25, 118, 210, 0.08)',
                                    transform: 'translateY(-2px)'
                                }
                            }}
                        >
                            Sign In
                        </Button>
                        <Button
                            component={Link}
                            to="/register"
                            variant="outlined"
                            startIcon={<PersonAddIcon />}
                            sx={{ 
                                borderRadius: 3,
                                px: 2.5,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-2px)'
                                }
                            }}
                        >
                            Register
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
} 