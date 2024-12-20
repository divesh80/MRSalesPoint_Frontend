// utils/auth.js

export const loginAdmin = async ({ email, password }) => {
    const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (data.message === 'Login successful') {
        if (typeof window !== 'undefined') {
            localStorage.setItem('isAuthenticated', 'true'); // Set authentication status in localStorage
        }
        return true;
    }
    return false;
};

export const isAuthenticated = () => {
    if (typeof window !== 'undefined') {
        // Check for authentication flag in localStorage only in the browser
        return localStorage.getItem('isAuthenticated') === 'true';
    }
    return false;
};

export const logout = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('isAuthenticated'); // Clear the authentication status from localStorage
    }
};
