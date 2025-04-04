import axios from 'axios';

const API_URL = 'http://localhost:8000';

export interface PatientRecord {
    id?: number;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    gender: string;
    contact_number: string;
    email: string;
    address: string;
    medical_history: string;
    symptoms: string;
    diagnosis: string;
    treatment_plan: string;
    test_results: string;
    notes: string;
}

const getAuthHeader = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        throw new Error('No authentication token found');
    }
    console.log('token', token);
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const patientService = {
    createPatient: async (patient: PatientRecord) => {
        const response = await axios.post(`${API_URL}/patients/`, patient, getAuthHeader());
        return response.data;
    },

    getPatients: async (skip: number = 0, limit: number = 100) => {
        const response = await axios.get(
            `${API_URL}/patients/?skip=${skip}&limit=${limit}`,
            getAuthHeader()
        );
        return response.data;
    },

    getPatient: async (id: number) => {
        const response = await axios.get(`${API_URL}/patients/${id}`, getAuthHeader());
        return response.data;
    },

    updatePatient: async (id: number, patient: Partial<PatientRecord>) => {
        const response = await axios.put(
            `${API_URL}/patients/${id}`,
            patient,
            getAuthHeader()
        );
        return response.data;
    },

    deletePatient: async (id: number) => {
        await axios.delete(`${API_URL}/patients/${id}`, getAuthHeader());
    },
}; 