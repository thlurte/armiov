import { 
    Box, 
    Container, 
    Paper, 
    Typography, 
    TextField, 
    Button, 
    Stack,
    Link as MuiLink,
    Alert,
    CircularProgress,
    InputAdornment,
    IconButton,
    Divider
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import LoginIcon from '@mui/icons-material/Login'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import GoogleIcon from '@mui/icons-material/Google'
import { useAuth } from '../contexts/AuthContext'

interface LoginFormData {
    email: string;
    password: string;
}

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const { login } = useAuth()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            const response = await fetch('http://localhost:8000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            })

            // Check if response is ok (status in the range 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            // Try to parse the response as JSON
            let data
            try {
                data = await response.json()
            } catch (parseError) {
                console.error('Error parsing JSON:', parseError)
                throw new Error('Invalid response from server')
            }

            if (data.success) {
                login(data.result.token)
                navigate('/')
            } else {
                setError(data.message || 'Login failed')
            }
        } catch (err) {
            console.error('Login error:', err)
            setError(err instanceof Error ? err.message : 'An error occurred during login')
        } finally {
            setIsLoading(false)
        }
    }

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
                        boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)'
                    }}
                >
                    <Stack spacing={4}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Box
                                sx={{
                                    width: 64,
                                    height: 64,
                                    borderRadius: '50%',
                                    bgcolor: 'primary.main',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 16px',
                                    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)'
                                }}
                            >
                                <LoginIcon sx={{ fontSize: 32, color: 'white' }} />
                            </Box>
                            <Typography 
                                variant="h4" 
                                component="h1" 
                                gutterBottom
                                sx={{ 
                                    fontWeight: 600,
                                    background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}
                            >
                                Welcome Back
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Sign in to continue your analysis
                            </Typography>
                        </Box>

                        {error && (
                            <Alert 
                                severity="error" 
                                sx={{ 
                                    borderRadius: 2,
                                    '& .MuiAlert-icon': {
                                        color: 'error.main'
                                    }
                                }}
                            >
                                {error}
                            </Alert>
                        )}

                        <Stack spacing={3}>
                            <TextField
                                fullWidth
                                label="Email Address"
                                type="text"
                                name="email"
                                value={email}
                                onChange={handleInputChange}
                                variant="outlined"
                                required
                                autoFocus
                                disabled={isLoading}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon color="primary" />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <TextField
                                fullWidth
                                label="Password"
                                type={showPassword ? 'text' : 'text'}
                                name="password"
                                value={password}
                                onChange={handleInputChange}
                                variant="outlined"
                                required
                                disabled={isLoading}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon color="primary" />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                disabled={isLoading}
                                sx={{ 
                                    py: 1.5,
                                    borderRadius: 3,
                                    textTransform: 'none',
                                    fontSize: '1.1rem',
                                    background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)',
                                    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                                    '&:hover': {
                                        background: 'linear-gradient(45deg, #1565c0 30%, #1cb5e0 90%)',
                                    }
                                }}
                            >
                                {isLoading ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    'Sign In'
                                )}
                            </Button>

                            <Divider sx={{ my: 2 }}>
                                <Typography variant="body2" color="text.secondary">
                                    or continue with
                                </Typography>
                            </Divider>

                            <Button
                                variant="outlined"
                                size="large"
                                startIcon={<GoogleIcon />}
                                sx={{ 
                                    py: 1.5,
                                    borderRadius: 3,
                                    textTransform: 'none',
                                    fontSize: '1.1rem',
                                    borderColor: 'text.secondary',
                                    color: 'text.primary',
                                    '&:hover': {
                                        borderColor: 'primary.main',
                                        color: 'primary.main',
                                    }
                                }}
                            >
                                Sign in with Google
                            </Button>
                        </Stack>

                        <Stack 
                            direction="row" 
                            spacing={1} 
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{ mt: 2 }}
                        >
                            <Typography variant="body2">
                                New to LeukemiaAI?{' '}
                                <MuiLink 
                                    component={Link} 
                                    to="/register"
                                    sx={{ 
                                        textDecoration: 'none',
                                        fontWeight: 500,
                                        color: 'primary.main',
                                        '&:hover': {
                                            textDecoration: 'underline'
                                        }
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
                                    fontWeight: 500,
                                    color: 'primary.main',
                                    '&:hover': {
                                        textDecoration: 'underline'
                                    }
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