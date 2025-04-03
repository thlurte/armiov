export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    // Add other user properties as needed
}

export const getToken = (): string | null => {
    return localStorage.getItem('token');
};

export const getUser = (): User | null => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
};

export const isAuthenticated = (): boolean => {
    return !!getToken();
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Optionally redirect to login page
    window.location.href = '/login';
}; 