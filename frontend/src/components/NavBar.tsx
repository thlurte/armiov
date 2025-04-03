import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import ScienceIcon from '@mui/icons-material/Science'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AssessmentIcon from '@mui/icons-material/Assessment'
import InfoIcon from '@mui/icons-material/Info'

export default function NavBar() {
    return (
        <AppBar position="static" color="primary" elevation={0}>
            <Toolbar>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ScienceIcon sx={{ fontSize: 28 }} />
                    <Typography variant="h6" component="div" sx={{ fontWeight: 500 }}>
                        LeukemiaAI
                    </Typography>
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button 
                        component={Link} 
                        to="/" 
                        color="inherit"
                        startIcon={<DashboardIcon />}
                        sx={{ 
                            '&:hover': { 
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                transform: 'translateY(-1px)'
                            }
                        }}
                    >
                        Dashboard
                    </Button>
                    <Button 
                        component={Link} 
                        to="/analysis" 
                        color="inherit"
                        startIcon={<AssessmentIcon />}
                        sx={{ 
                            '&:hover': { 
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                transform: 'translateY(-1px)'
                            }
                        }}
                    >
                        Analysis
                    </Button>
                    <Button 
                        component={Link} 
                        to="/about" 
                        color="inherit"
                        startIcon={<InfoIcon />}
                        sx={{ 
                            '&:hover': { 
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                transform: 'translateY(-1px)'
                            }
                        }}
                    >
                        About
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
} 