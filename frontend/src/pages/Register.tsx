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
    Divider,
    Tooltip,
    Fade
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import PersonIcon from '@mui/icons-material/Person'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useAuth } from '../contexts/AuthContext'
import IconButton from '@mui/material/IconButton';


interface RegisterData {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

export default function Register() {
    const [formData, setFormData] = useState<RegisterData>({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (field: keyof RegisterData) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData(prev => ({
            ...prev,
            [field]: event.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:8000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                // Automatically log in the user after successful registration
                login(data.result.token);
                navigate('/');
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            console.error('Registration error:', err);
            setError(err instanceof Error ? err.message : 'An error occurred during registration');
        } finally {
            setIsLoading(false);
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
                                <PersonAddIcon sx={{ fontSize: 32, color: 'white' }} />
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
                                Create Account
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Join us to start analyzing leukemia cells
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
                            <Stack 
                                direction={{ xs: 'column', sm: 'row' }} 
                                spacing={2}
                            >
                                <TextField
                                    fullWidth
                                    label="First Name"
                                    variant="outlined"
                                    required
                                    autoFocus
                                    value={formData.first_name}
                                    onChange={handleChange('first_name')}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonIcon color="primary" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                />
                                <TextField
                                    fullWidth
                                    label="Last Name"
                                    variant="outlined"
                                    required
                                    value={formData.last_name}
                                    onChange={handleChange('last_name')}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonIcon color="primary" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                />
                            </Stack>

                            <TextField
                                fullWidth
                                label="Email Address"
                                type="email"
                                variant="outlined"
                                required
                                value={formData.email}
                                onChange={handleChange('email')}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon color="primary" />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                            />

                            <TextField
                                fullWidth
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                variant="outlined"
                                required
                                value={formData.password}
                                onChange={handleChange('password')}
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
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                            />

                            <Tooltip 
                                title="Create Account" 
                                TransitionComponent={Fade}
                                TransitionProps={{ timeout: 600 }}
                            >
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
                                        'Create Account'
                                    )}
                                </Button>
                            </Tooltip>
                        </Stack>

                        <Divider sx={{ my: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                                or
                            </Typography>
                        </Divider>

                        <Typography 
                            variant="body2" 
                            align="center" 
                            sx={{ mt: 2 }}
                        >
                            Already have an account?{' '}
                            <MuiLink 
                                component={Link} 
                                to="/login"
                                sx={{ 
                                    textDecoration: 'none',
                                    fontWeight: 500,
                                    color: 'primary.main',
                                    '&:hover': {
                                        textDecoration: 'underline'
                                    }
                                }}
                            >
                                Sign in
                            </MuiLink>
                        </Typography>
                    </Stack>
                </Paper>
            </Box>
        </Container>
    );
} 