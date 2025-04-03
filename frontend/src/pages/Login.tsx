import { 
    Box, 
    Container, 
    Paper, 
    Typography, 
    TextField, 
    Button, 
    Stack,
    Link as MuiLink,
    Alert
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import LoginIcon from '@mui/icons-material/Login'

interface LoginFormData {
    email: string;
    password: string;
}

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: ''
    });
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            if (data.success) {
                // Store the token in localStorage
                localStorage.setItem('token', data.result.token);
                // Store user data if needed
                localStorage.setItem('user', JSON.stringify(data.result.user));
                // Redirect to dashboard/home
                navigate('/patients');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

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
                    component="form"
                    onSubmit={handleSubmit}
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

                        {error && (
                            <Alert severity="error" sx={{ borderRadius: 2 }}>
                                {error}
                            </Alert>
                        )}

                        <Stack spacing={3}>
                            <TextField
                                fullWidth
                                label="Email Address"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                variant="outlined"
                                required
                                autoFocus
                                disabled={loading}
                            />

                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                variant="outlined"
                                required
                                disabled={loading}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                disabled={loading}
                                sx={{ 
                                    py: 1.5,
                                    borderRadius: 3,
                                    textTransform: 'none',
                                    fontSize: '1.1rem'
                                }}
                            >
                                {loading ? 'Signing in...' : 'Sign In'}
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