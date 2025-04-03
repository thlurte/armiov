import { 
    Container, 
    Paper, 
    Typography, 
    Button, 
    Stack,
    Card,
    CardContent,
    Grid
} from '@mui/material'
import { Link } from 'react-router-dom'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import AssessmentIcon from '@mui/icons-material/Assessment'

// Mock data - replace with actual data from your backend
const mockPatients = [
    {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1990-05-15',
        diagnosis: 'Under Investigation',
        lastVisit: '2024-03-15'
    },
    {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        dateOfBirth: '1985-08-22',
        diagnosis: 'Pending Analysis',
        lastVisit: '2024-03-14'
    },
    // Add more mock patients as needed
];

export default function PatientList() {
    return (
        <Container maxWidth="lg">
            <Stack spacing={4}>
                <Stack 
                    direction="row" 
                    justifyContent="space-between" 
                    alignItems="center"
                >
                    <Typography variant="h4" component="h1">
                        Patients
                    </Typography>
                    <Button
                        component={Link}
                        to="/patient/new"
                        variant="contained"
                        size="large"
                        sx={{ 
                            borderRadius: 3,
                            px: 3
                        }}
                    >
                        Add New Patient
                    </Button>
                </Stack>

                <Grid container spacing={3}>
                    {mockPatients.map((patient) => (
                        <Grid item xs={12} md={6} key={patient.id}>
                            <Card 
                                sx={{ 
                                    borderRadius: 4,
                                    transition: 'transform 0.2s',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: 3
                                    }
                                }}
                            >
                                <CardContent>
                                    <Stack spacing={2}>
                                        <Typography variant="h6">
                                            {patient.firstName} {patient.lastName}
                                        </Typography>
                                        <Stack 
                                            direction="row" 
                                            spacing={1} 
                                            sx={{ color: 'text.secondary' }}
                                        >
                                            <Typography variant="body2">
                                                DOB: {patient.dateOfBirth}
                                            </Typography>
                                            <Typography variant="body2">•</Typography>
                                            <Typography variant="body2">
                                                Last Visit: {patient.lastVisit}
                                            </Typography>
                                        </Stack>
                                        <Typography 
                                            variant="body2" 
                                            color="text.secondary"
                                        >
                                            Diagnosis: {patient.diagnosis}
                                        </Typography>
                                        
                                        <Stack 
                                            direction="row" 
                                            spacing={2} 
                                            sx={{ mt: 2 }}
                                        >
                                            <Button
                                                component={Link}
                                                to={`/analysis/upload/${patient.id}`}
                                                variant="contained"
                                                startIcon={<CloudUploadIcon />}
                                                sx={{ 
                                                    borderRadius: 3,
                                                    flex: 1
                                                }}
                                            >
                                                Upload Images
                                            </Button>
                                            <Button
                                                component={Link}
                                                to={`/analysis/view/${patient.id}`}
                                                variant="outlined"
                                                startIcon={<AssessmentIcon />}
                                                sx={{ 
                                                    borderRadius: 3,
                                                    flex: 1
                                                }}
                                            >
                                                View Analysis
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Stack>
        </Container>
    );
} 