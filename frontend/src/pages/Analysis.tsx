import { 
    Box, 
    Container, 
    Typography, 
    Paper, 
    Button, 
    Stack,
    IconButton,
    LinearProgress,
    Card,
    CardContent,
    CardMedia
} from '@mui/material'
import { useState } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import DeleteIcon from '@mui/icons-material/Delete'

interface AnalysisResult {
    originalImage: string;
    processedImage: string;
    prediction: string;
    confidence: number;
}

export default function Analysis() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [results, setResults] = useState<AnalysisResult[]>([]);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setIsAnalyzing(true);
            // Here you would normally send the files to your backend
            // For now, we'll simulate the analysis
            setTimeout(() => {
                setIsAnalyzing(false);
                // Simulate results
                const newResults = Array.from(files).map(file => ({
                    originalImage: URL.createObjectURL(file),
                    processedImage: URL.createObjectURL(file), // In real app, this would be the processed image
                    prediction: "Abnormal Cell Detected",
                    confidence: 0.95
                }));
                setResults(newResults);
            }, 2000);
        }
    };

    const nextSlide = () => {
        setCurrentSlide(prev => (prev + 1) % results.length);
    };

    const prevSlide = () => {
        setCurrentSlide(prev => (prev - 1 + results.length) % results.length);
    };

    return (
        <Container maxWidth="lg">
            <Stack spacing={4}>
                {/* Upload Section */}
                <Paper 
                    elevation={0} 
                    sx={{ 
                        p: 4,
                        borderRadius: 4,
                        bgcolor: 'background.paper',
                        textAlign: 'center'
                    }}
                >
                    <Stack spacing={3} alignItems="center">
                        <Typography variant="h4" component="h1">
                            Analyze Blood Cell Images
                        </Typography>
                        <Button
                            component="label"
                            variant="contained"
                            size="large"
                            startIcon={<CloudUploadIcon />}
                            sx={{ 
                                borderRadius: 3,
                                py: 2,
                                px: 4
                            }}
                        >
                            Upload Images
                            <input
                                type="file"
                                hidden
                                multiple
                                accept="image/*"
                                onChange={handleFileUpload}
                            />
                        </Button>
                    </Stack>
                </Paper>

                {/* Analysis Progress */}
                {isAnalyzing && (
                    <Paper 
                        elevation={0} 
                        sx={{ 
                            p: 4,
                            borderRadius: 4,
                            bgcolor: 'background.paper'
                        }}
                    >
                        <Stack spacing={2}>
                            <Typography variant="h6">
                                Analyzing Images...
                            </Typography>
                            <LinearProgress />
                        </Stack>
                    </Paper>
                )}

                {/* Results Slider */}
                {results.length > 0 && (
                    <Paper 
                        elevation={0} 
                        sx={{ 
                            p: 4,
                            borderRadius: 4,
                            bgcolor: 'background.paper'
                        }}
                    >
                        <Stack spacing={3}>
                            <Typography variant="h5" gutterBottom>
                                Analysis Results ({currentSlide + 1}/{results.length})
                            </Typography>
                            
                            <Box sx={{ position: 'relative' }}>
                                <Stack 
                                    direction="row" 
                                    spacing={2} 
                                    sx={{ 
                                        position: 'relative',
                                        minHeight: 400
                                    }}
                                >
                                    {/* Original Image */}
                                    <Card sx={{ flex: 1, borderRadius: 3 }}>
                                        <CardMedia
                                            component="img"
                                            image={results[currentSlide].originalImage}
                                            alt="Original blood cell"
                                            sx={{ 
                                                height: 300,
                                                objectFit: 'contain',
                                                bgcolor: 'grey.100'
                                            }}
                                        />
                                        <CardContent>
                                            <Typography variant="subtitle1" gutterBottom>
                                                Original Image
                                            </Typography>
                                        </CardContent>
                                    </Card>

                                    {/* Processed Image */}
                                    <Card sx={{ flex: 1, borderRadius: 3 }}>
                                        <CardMedia
                                            component="img"
                                            image={results[currentSlide].processedImage}
                                            alt="Processed blood cell"
                                            sx={{ 
                                                height: 300,
                                                objectFit: 'contain',
                                                bgcolor: 'grey.100'
                                            }}
                                        />
                                        <CardContent>
                                            <Typography variant="subtitle1" gutterBottom>
                                                Processed Image
                                            </Typography>
                                            <Typography 
                                                variant="body2" 
                                                color="text.secondary"
                                            >
                                                {results[currentSlide].prediction}
                                                <br />
                                                Confidence: {(results[currentSlide].confidence * 100).toFixed(1)}%
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Stack>

                                {/* Navigation Buttons */}
                                <Box sx={{ 
                                    position: 'absolute',
                                    top: '50%',
                                    left: -20,
                                    transform: 'translateY(-50%)',
                                    display: 'flex',
                                    gap: 2
                                }}>
                                    <IconButton 
                                        onClick={prevSlide}
                                        sx={{ 
                                            bgcolor: 'background.paper',
                                            boxShadow: 2,
                                            '&:hover': { bgcolor: 'grey.100' }
                                        }}
                                    >
                                        <NavigateBeforeIcon />
                                    </IconButton>
                                </Box>
                                <Box sx={{ 
                                    position: 'absolute',
                                    top: '50%',
                                    right: -20,
                                    transform: 'translateY(-50%)',
                                    display: 'flex',
                                    gap: 2
                                }}>
                                    <IconButton 
                                        onClick={nextSlide}
                                        sx={{ 
                                            bgcolor: 'background.paper',
                                            boxShadow: 2,
                                            '&:hover': { bgcolor: 'grey.100' }
                                        }}
                                    >
                                        <NavigateNextIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Stack>
                    </Paper>
                )}
            </Stack>
        </Container>
    );
} 