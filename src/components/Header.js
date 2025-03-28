import React from 'react';

function Header({ balance = 0, logo = 'Wallet App' }) {
    return (
        <header style={{
            backgroundColor: '#fff',
            padding: '1rem 2rem',
            boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1)',
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: '1200px',
            margin: '0 auto'
        }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#222' }}>
                {logo}
            </div>
            <div style={{ fontSize: '1.25rem', color: '#218838', fontWeight: '600' }}>
                Balance: ${balance.toFixed(2)}
            </div>
        </header>
    );
}

export default Header;
