import { AppBar, Toolbar, Box, Button, Typography, Container } from '@mui/material'
import { Link } from 'react-router-dom'
import ScienceIcon from '@mui/icons-material/Science'
import DashboardIcon from '@mui/icons-material/Dashboard'
import InfoIcon from '@mui/icons-material/Info'

export default function Navbar() {
    return (
        <AppBar 
            position="static" 
            elevation={0}
            sx={{ 
                backgroundColor: 'background.paper',
                borderRadius: '0 0 24px 24px',
                mb: 2
            }}
        >
            <Container maxWidth="lg">
                <Toolbar 
                    sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        py: 2
                    }}
                >
                    <Typography 
                        variant="h5" 
                        component={Link} 
                        to="/" 
                        sx={{ 
                            color: 'primary.main',
                            textDecoration: 'none',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}
                    >
                        <ScienceIcon sx={{ fontSize: 32 }} />
                        LeukemiaAI
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                            component={Link}
                            to="/"
                            startIcon={<DashboardIcon />}
                            sx={{ 
                                borderRadius: 3,
                                px: 3
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
                                px: 3
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
                                px: 3
                            }}
                        >
                            About
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
} 