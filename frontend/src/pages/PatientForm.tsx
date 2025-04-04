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
    Fade,
    Alert,
    Snackbar
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
import { Link, useNavigate, useParams } from 'react-router-dom'
import { patientService, PatientRecord } from '../services/patientService'

export default function PatientForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const [patientData, setPatientData] = useState<PatientRecord>({
        first_name: '',
        last_name: '',
        date_of_birth: '',
        gender: '',
        contact_number: '',
        email: '',
        address: '',
        medical_history: '',
        symptoms: '',
        diagnosis: '',
        treatment_plan: '',
        test_results: '',
        notes: ''
    });

    // Load patient data if editing
    useState(() => {
        if (id) {
            const loadPatient = async () => {
                try {
                    const patient = await patientService.getPatient(Number(id));
                    setPatientData(patient);
                } catch (err) {
                    setError('Failed to load patient data');
                }
            };
            loadPatient();
        }
    }, [id]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        console.log('Patient data saved successfully');

        try {
            if (id) {
                await patientService.updatePatient(Number(id), patientData);
            } else {
                await patientService.createPatient(patientData);
            }
            console.log('Patient data saved successfully');
            setSuccess(true);
            setTimeout(() => {
                navigate('/patients');
            }, 2000);
        } catch (err) {
            setError('Failed to save patient data');
        } finally {
            setLoading(false);
        }
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
                                    {id ? 'Edit Patient Record' : 'New Patient Record'}
                                </Typography>
                                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                                    {id ? 'Update patient information below' : 'Enter patient information below'}
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
                                        value={patientData.first_name}
                                        onChange={handleChange('first_name')}
                                        variant="outlined"
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        required
                                        label="Last Name"
                                        value={patientData.last_name}
                                        onChange={handleChange('last_name')}
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
                                        value={patientData.date_of_birth}
                                        onChange={handleChange('date_of_birth')}
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
                                        value={patientData.contact_number}
                                        onChange={handleChange('contact_number')}
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
                                        value={patientData.medical_history}
                                        onChange={handleChange('medical_history')}
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
                                        value={patientData.treatment_plan}
                                        onChange={handleChange('treatment_plan')}
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
                                        value={patientData.test_results}
                                        onChange={handleChange('test_results')}
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
                                title={id ? "Update Patient Record" : "Save Patient Record"} 
                                TransitionComponent={Fade}
                                TransitionProps={{ timeout: 600 }}
                            >
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    startIcon={<SaveIcon />}
                                    disabled={loading}
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
                                    {loading ? 'Saving...' : (id ? 'Update Patient Record' : 'Save Patient Record')}
                                </Button>
                            </Tooltip>
                        </Box>
                    </Stack>
                </form>
            </Paper>

            {/* Error Snackbar */}
            <Snackbar 
                open={!!error} 
                autoHideDuration={6000} 
                onClose={() => setError(null)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>

            {/* Success Snackbar */}
            <Snackbar 
                open={success} 
                autoHideDuration={2000} 
                onClose={() => setSuccess(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
                    Patient record {id ? 'updated' : 'created'} successfully!
                </Alert>
            </Snackbar>
        </Container>
    );
} 