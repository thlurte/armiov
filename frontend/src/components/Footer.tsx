import { Box, Container, Typography, Link as MuiLink, Stack } from '@mui/material'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <Box 
            component="footer" 
            sx={{ 
                py: 3,
                mt: 'auto',
                backgroundColor: '#f5f7fa',
                borderRadius: '32px 32px 0 0',
                borderTop: '1px solid rgba(0,0,0,0.05)'
            }}
        >
            <Container 
                maxWidth="lg" 
                sx={{ 
                    px: { xs: 2, sm: 3 }
                }}
            >
                <Stack 
                    direction={{ xs: 'column', sm: 'row' }} 
                    spacing={{ xs: 2, sm: 3 }} 
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography 
                        variant="body2" 
                        component={Link} 
                        to="/" 
                        sx={{ 
                            color: 'primary.dark',
                            textDecoration: 'none',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}
                    >
                        Armiov
                    </Typography>
                    <Stack 
                        direction="row" 
                        spacing={3}
                        sx={{ 
                            '& a': { 
                                color: 'text.secondary',
                                fontSize: '0.875rem',
                                textDecoration: 'none',
                                transition: 'color 0.3s ease',
                                '&:hover': { 
                                    color: 'primary.main'
                                }
                            }
                        }}
                    >
                        <MuiLink component={Link} to="/about">About</MuiLink>
                        <MuiLink component={Link} to="/privacy">Privacy</MuiLink>
                        <MuiLink component={Link} to="/terms">Terms</MuiLink>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    )
} 