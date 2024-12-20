// pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { loginAdmin } from '../utils/auth';
import Layout from '../components/Layout';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = await loginAdmin({ email, password });
        if (success) {
            router.push('/dashboard'); // Redirect to dashboard if login is successful
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <Layout>
            <h1>Admin Login</h1>
            <form onSubmit={handleSubmit}>
                <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit'>Login</button>
            </form>
            {error && <p>{error}</p>}
        </Layout>
    );
};

export default LoginPage;
