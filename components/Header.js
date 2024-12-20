// components/Header.js
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { isAuthenticated, logout } from '../utils/auth';

const Header = () => {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        if (isAuthenticated()) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }
    }, []); // Runs only on the client-side after the component mounts

    const handleLogout = () => {
        logout();
        window.location.href = '/login'; // Redirect to login after logout
    };

    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link href='/'>Home</Link>
                    </li>
                    <li>
                        <Link href='/catalog'>Catalog</Link>
                    </li>
                    {authenticated && (
                        <>
                            <li>
                                <Link href='/dashboard'>Dashboard</Link>
                            </li>
                            <li>
                                <button onClick={handleLogout}>Logout</button>
                            </li>
                        </>
                    )}
                    {!authenticated && (
                        <li>
                            <Link href='/login'>Login</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
