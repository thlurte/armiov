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
import PersonAddIcon from '@mui/icons-material/PersonAdd'

export default function Register() {
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
                            <PersonAddIcon 
                                sx={{ 
                                    fontSize: 48, 
                                    color: 'primary.main',
                                    mb: 2
                                }} 
                            />
                            <Typography variant="h4" component="h1" gutterBottom>
                                Create Account
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Join us to start analyzing leukemia cells
                            </Typography>
                        </Box>

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
                                />
                                <TextField
                                    fullWidth
                                    label="Last Name"
                                    variant="outlined"
                                    required
                                />
                            </Stack>

                            <TextField
                                fullWidth
                                label="Email Address"
                                type="email"
                                variant="outlined"
                                required
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
                                Register
                            </Button>
                        </Stack>

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
                                    fontWeight: 500
                                }}
                            >
                                Sign in
                            </MuiLink>
                        </Typography>
                    </Stack>
                </Paper>
            </Box>
        </Container>
    )
} 