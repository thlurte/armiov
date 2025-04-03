import { Typography, Container, Box, Grid, Button, Card, CardContent, Stack, Paper } from '@mui/material'
import { Link } from 'react-router-dom'
import ScienceIcon from '@mui/icons-material/Science'
import AssessmentIcon from '@mui/icons-material/Assessment'
import SpeedIcon from '@mui/icons-material/Speed'
import SecurityIcon from '@mui/icons-material/Security'

interface Feature {
    title: string
    description: string
    icon: React.ReactNode
    color: string
}

const features: Feature[] = [
    {
        title: 'Advanced AI Analysis',
        description: 'Utilizing state-of-the-art machine learning algorithms to analyze leukemia cell images with high accuracy.',
        icon: <ScienceIcon sx={{ fontSize: 40 }} />,
        color: 'primary.main'
    },
    {
        title: 'Comprehensive Reports',
        description: 'Detailed analysis reports with visualizations and statistical insights for better understanding.',
        icon: <AssessmentIcon sx={{ fontSize: 40 }} />,
        color: 'secondary.main'
    },
    {
        title: 'Fast Results',
        description: 'Get accurate diagnosis results in minutes, helping medical professionals make timely decisions.',
        icon: <SpeedIcon sx={{ fontSize: 40 }} />,
        color: 'success.main'
    },
    {
        title: 'Secure & Private',
        description: 'Your data is protected with enterprise-grade security measures and strict privacy protocols.',
        icon: <SecurityIcon sx={{ fontSize: 40 }} />,
        color: 'info.main'
    }
]

export default function Home() {
    return (
        <Container maxWidth="lg">
            <Box sx={{ 
                py: 8,
                textAlign: 'center'
            }}>
                <Typography variant="h2" component="h1" gutterBottom sx={{ 
                    fontWeight: 600,
                    color: 'primary.main',
                    mb: 4
                }}>
                    Leukemia Cell Diagnosis
                </Typography>
                <Typography variant="h5" color="text.secondary" paragraph sx={{ mb: 6 }}>
                    Advanced AI-powered analysis for accurate leukemia cell detection and classification
                </Typography>
                <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 8 }}>
                    <Button
                        component={Link}
                        to="/analysis"
                        variant="contained"
                        size="large"
                        startIcon={<ScienceIcon />}
                        sx={{ borderRadius: 3 }}
                    >
                        Start Analysis
                    </Button>
                    <Button
                        component={Link}
                        to="/about"
                        variant="outlined"
                        size="large"
                        sx={{ borderRadius: 3 }}
                    >
                        Learn More
                    </Button>
                </Stack>
            </Box>

            <Grid container spacing={4}>
                {features.map((feature, index) => (
                    <Grid key={index} item xs={12} sm={6}>
                        <Card sx={{ 
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'transform 0.2s',
                            borderRadius: 4,
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: 6
                            }
                        }}>
                            <CardContent sx={{ 
                                flexGrow: 1,
                                textAlign: 'center',
                                p: 4
                            }}>
                                <Box sx={{ 
                                    color: feature.color,
                                    mb: 2
                                }}>
                                    {feature.icon}
                                </Box>
                                <Typography variant="h6" component="h3" gutterBottom>
                                    {feature.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {feature.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ mt: 8, mb: 4 }}>
                <Paper elevation={0} sx={{ 
                    p: 4,
                    bgcolor: 'background.paper',
                    borderRadius: 4
                }}>
                    <Typography variant="h4" component="h2" gutterBottom sx={{ 
                        textAlign: 'center',
                        color: 'primary.main',
                        mb: 3
                    }}>
                        How It Works
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ 
                                textAlign: 'center',
                                p: 3,
                                borderRadius: 3,
                                bgcolor: 'background.paper',
                                boxShadow: 1
                            }}>
                                <Typography variant="h6" gutterBottom>
                                    1. Upload Images
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Upload your leukemia cell images securely
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ 
                                textAlign: 'center',
                                p: 3,
                                borderRadius: 3,
                                bgcolor: 'background.paper',
                                boxShadow: 1
                            }}>
                                <Typography variant="h6" gutterBottom>
                                    2. AI Analysis
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Our AI model analyzes the cells in real-time
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ 
                                textAlign: 'center',
                                p: 3,
                                borderRadius: 3,
                                bgcolor: 'background.paper',
                                boxShadow: 1
                            }}>
                                <Typography variant="h6" gutterBottom>
                                    3. Get Results
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Receive detailed analysis and recommendations
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </Container>
    )
}