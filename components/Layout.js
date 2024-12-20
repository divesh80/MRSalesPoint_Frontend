// components/Layout.js
import React from 'react';
import Header from './Header';

const Layout = ({ children, renderHeader = true }) => {
    return (
        <div>
            {renderHeader && <Header />} {/* Conditionally render header */}
            <main>{children}</main>
        </div>
    );
};

export default Layout;
