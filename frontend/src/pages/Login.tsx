import { 
    Box, 
    Container, 
    Paper, 
    Typography, 
    TextField, 
    Button, 
    Stack,
    Link as MuiLink
} from '@mui/material'
import { Link } from 'react-router-dom'
import LoginIcon from '@mui/icons-material/Login'

export default function Login() {
    return (
        <Container maxWidth="sm">
            <Box sx={{ 
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: 8
            }}>
                <Paper 
                    elevation={0} 
                    sx={{ 
                        p: 4,
                        width: '100%',
                        borderRadius: 4,
                        bgcolor: 'background.paper',
                        boxShadow: theme => `0 0 24px rgba(0,0,0,0.1)`
                    }}
                >
                    <Stack spacing={4}>
                        <Box sx={{ textAlign: 'center' }}>
                            <LoginIcon 
                                sx={{ 
                                    fontSize: 48, 
                                    color: 'primary.main',
                                    mb: 2
                                }} 
                            />
                            <Typography variant="h4" component="h1" gutterBottom>
                                Welcome Back
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Sign in to continue your analysis
                            </Typography>
                        </Box>

                        <Stack spacing={3}>
                            <TextField
                                fullWidth
                                label="Email Address"
                                type="email"
                                variant="outlined"
                                required
                                autoFocus
                            />

                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                variant="outlined"
                                required
                            />

                            <Button
                                variant="contained"
                                size="large"
                                sx={{ 
                                    py: 1.5,
                                    borderRadius: 3,
                                    textTransform: 'none',
                                    fontSize: '1.1rem'
                                }}
                            >
                                Sign In
                            </Button>
                        </Stack>

                        <Stack 
                            direction="row" 
                            spacing={1} 
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Typography variant="body2">
                                New to LeukemiaAI?{' '}
                                <MuiLink 
                                    component={Link} 
                                    to="/register"
                                    sx={{ 
                                        textDecoration: 'none',
                                        fontWeight: 500
                                    }}
                                >
                                    Create account
                                </MuiLink>
                            </Typography>
                            <MuiLink 
                                component={Link} 
                                to="/forgot-password"
                                variant="body2"
                                sx={{ 
                                    textDecoration: 'none',
                                    fontWeight: 500
                                }}
                            >
                                Forgot password?
                            </MuiLink>
                        </Stack>
                    </Stack>
                </Paper>
            </Box>
        </Container>
    )
} 