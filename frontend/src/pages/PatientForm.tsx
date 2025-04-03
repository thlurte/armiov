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
    MenuItem,
    Box,
    Divider,
    InputAdornment,
    IconButton,
    Tooltip,
    Fade
} from '@mui/material'
import { useState } from 'react'
import SaveIcon from '@mui/icons-material/Save'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import MaleIcon from '@mui/icons-material/Male'
import FemaleIcon from '@mui/icons-material/Female'
import TransgenderIcon from '@mui/icons-material/Transgender'
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

    const getGenderIcon = (gender: string) => {
        switch (gender) {
            case 'Male':
                return <MaleIcon />;
            case 'Female':
                return <FemaleIcon />;
            default:
                return <TransgenderIcon />;
        }
    };

    return (
        <Container maxWidth="lg">
            <Paper 
                elevation={0} 
                sx={{ 
                    p: 4,
                    borderRadius: 4,
                    bgcolor: 'background.paper',
                    mb: 4,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)'
                }}
            >
                <form onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                        {/* Header */}
                        <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 2,
                            mb: 4,
                            background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)',
                            p: 3,
                            borderRadius: 3,
                            color: 'white'
                        }}>
                            <Box
                                sx={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: '50%',
                                    bgcolor: 'rgba(255,255,255,0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <PersonAddIcon sx={{ fontSize: 24 }} />
                            </Box>
                            <Box>
                                <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
                                    Patient Record
                                </Typography>
                                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                                    Enter patient information below
                                </Typography>
                            </Box>
                        </Box>

                        {/* Personal Information */}
                        <Box>
                            <Typography 
                                variant="h6" 
                                sx={{ 
                                    color: 'primary.main',
                                    mb: 3,
                                    fontWeight: 600,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                }}
                            >
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
                                        variant="outlined"
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        required
                                        label="Last Name"
                                        value={patientData.lastName}
                                        onChange={handleChange('lastName')}
                                        variant="outlined"
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
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
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <CalendarTodayIcon color="primary" />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Gender</InputLabel>
                                        <Select
                                            value={patientData.gender}
                                            label="Gender"
                                            onChange={(e) => handleChange('gender')(e as any)}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    {getGenderIcon(patientData.gender)}
                                                </InputAdornment>
                                            }
                                            sx={{ borderRadius: 2 }}
                                        >
                                            <MenuItem value="Male">Male</MenuItem>
                                            <MenuItem value="Female">Female</MenuItem>
                                            <MenuItem value="Other">Other</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Box>

                        <Divider />

                        {/* Contact Information */}
                        <Box>
                            <Typography 
                                variant="h6" 
                                sx={{ 
                                    color: 'primary.main',
                                    mb: 3,
                                    fontWeight: 600,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                }}
                            >
                                Contact Information
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Contact Number"
                                        value={patientData.contactNumber}
                                        onChange={handleChange('contactNumber')}
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PhoneIcon color="primary" />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        type="email"
                                        label="Email"
                                        value={patientData.email}
                                        onChange={handleChange('email')}
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <EmailIcon color="primary" />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
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
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LocationOnIcon color="primary" />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                    />
                                </Grid>
                            </Grid>
                        </Box>

                        <Divider />

                        {/* Medical Information */}
                        <Box>
                            <Typography 
                                variant="h6" 
                                sx={{ 
                                    color: 'primary.main',
                                    mb: 3,
                                    fontWeight: 600,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                }}
                            >
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
                                        variant="outlined"
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
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
                                        variant="outlined"
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
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
                                        variant="outlined"
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
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
                                        variant="outlined"
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
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
                                        variant="outlined"
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
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
                                        variant="outlined"
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                    />
                                </Grid>
                            </Grid>
                        </Box>

                        {/* Submit Button */}
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                            <Tooltip 
                                title="Save Patient Record" 
                                TransitionComponent={Fade}
                                TransitionProps={{ timeout: 600 }}
                            >
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    startIcon={<SaveIcon />}
                                    sx={{ 
                                        py: 1.5,
                                        px: 4,
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
                                    Save Patient Record
                                </Button>
                            </Tooltip>
                        </Box>
                    </Stack>
                </form>
            </Paper>
        </Container>
    );
} 