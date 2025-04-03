import { 
    Container, 
    Paper, 
    Typography, 
    TextField, 
    Button, 
    Stack, 
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material'
import { useState } from 'react'
import SaveIcon from '@mui/icons-material/Save'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { Link } from 'react-router-dom'

interface PatientRecord {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    contactNumber: string;
    email: string;
    address: string;
    medicalHistory: string;
    symptoms: string;
    diagnosis: string;
    treatmentPlan: string;
    testResults: string;
    notes: string;
}

export default function PatientForm() {
    const [patientData, setPatientData] = useState<PatientRecord>({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        contactNumber: '',
        email: '',
        address: '',
        medicalHistory: '',
        symptoms: '',
        diagnosis: '',
        treatmentPlan: '',
        testResults: '',
        notes: ''
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Here you would send the data to your backend
        console.log(patientData);
    };

    const handleChange = (field: keyof PatientRecord) => (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setPatientData(prev => ({
            ...prev,
            [field]: event.target.value
        }));
    };

    return (
        <Container maxWidth="lg">
            <Paper 
                elevation={0} 
                sx={{ 
                    p: 4,
                    borderRadius: 4,
                    bgcolor: 'background.paper',
                    mb: 4
                }}
            >
                <form onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                        {/* Header */}
                        <Stack 
                            direction="row" 
                            alignItems="center" 
                            spacing={2}
                            sx={{ mb: 4 }}
                        >
                            <PersonAddIcon sx={{ fontSize: 32, color: 'primary.main' }} />
                            <Typography variant="h4" component="h1">
                                Patient Record
                            </Typography>
                        </Stack>

                        {/* Personal Information */}
                        <Typography variant="h6" sx={{ color: 'primary.main' }}>
                            Personal Information
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    required
                                    label="First Name"
                                    value={patientData.firstName}
                                    onChange={handleChange('firstName')}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Last Name"
                                    value={patientData.lastName}
                                    onChange={handleChange('lastName')}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    type="date"
                                    label="Date of Birth"
                                    InputLabelProps={{ shrink: true }}
                                    value={patientData.dateOfBirth}
                                    onChange={handleChange('dateOfBirth')}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Gender</InputLabel>
                                    <Select
                                        value={patientData.gender}
                                        label="Gender"
                                        onChange={(e) => handleChange('gender')(e as any)}
                                    >
                                        <MenuItem value="Male">Male</MenuItem>
                                        <MenuItem value="Female">Female</MenuItem>
                                        <MenuItem value="Other">Other</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>

                        {/* Contact Information */}
                        <Typography variant="h6" sx={{ color: 'primary.main' }}>
                            Contact Information
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Contact Number"
                                    value={patientData.contactNumber}
                                    onChange={handleChange('contactNumber')}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    type="email"
                                    label="Email"
                                    value={patientData.email}
                                    onChange={handleChange('email')}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    label="Address"
                                    value={patientData.address}
                                    onChange={handleChange('address')}
                                />
                            </Grid>
                        </Grid>

                        {/* Medical Information */}
                        <Typography variant="h6" sx={{ color: 'primary.main' }}>
                            Medical Information
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    label="Medical History"
                                    value={patientData.medicalHistory}
                                    onChange={handleChange('medicalHistory')}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    label="Current Symptoms"
                                    value={patientData.symptoms}
                                    onChange={handleChange('symptoms')}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    label="Diagnosis"
                                    value={patientData.diagnosis}
                                    onChange={handleChange('diagnosis')}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    label="Treatment Plan"
                                    value={patientData.treatmentPlan}
                                    onChange={handleChange('treatmentPlan')}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    label="Test Results"
                                    value={patientData.testResults}
                                    onChange={handleChange('testResults')}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    label="Additional Notes"
                                    value={patientData.notes}
                                    onChange={handleChange('notes')}
                                />
                            </Grid>
                        </Grid>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            startIcon={<SaveIcon />}
                            sx={{ 
                                mt: 4,
                                py: 1.5,
                                px: 4,
                                borderRadius: 3,
                                alignSelf: 'flex-end'
                            }}
                        >
                            Save Patient Record
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </Container>
    );
} 