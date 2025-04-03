import { AppBar, Toolbar, Box, Button, Typography, Container } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import ScienceIcon from '@mui/icons-material/Science'
import DashboardIcon from '@mui/icons-material/Dashboard'
import InfoIcon from '@mui/icons-material/Info'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { useAuth } from '../contexts/AuthContext'

export default function Navbar() {
    const { isAuthenticated, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

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
                        Arimov
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

                        {isAuthenticated && (
                            <Button
                                component={Link}
                                to="/patients"
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
                                Patients
                            </Button>
                        )}

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

                        {/* Conditional rendering of auth buttons */}
                        {!isAuthenticated ? (
                            <>
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
                            </>
                        ) : (
                            <Button
                                onClick={handleLogout}
                                variant="outlined"
                                startIcon={<LogoutIcon />}
                                sx={{ 
                                    borderRadius: 3,
                                    px: 2.5,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-2px)'
                                    }
                                }}
                            >
                                Logout
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
} 