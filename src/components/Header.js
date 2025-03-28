import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #fff;
  padding: 1rem 2rem;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
`;

const WalletBalance = styled.div`
  font-size: 1.25rem;
  color: #28a745;
  font-weight: 500;
`;

function Footer({ balance = 0, logo = 'Wallet App' }) {
    return (
        <FooterContainer>
            <FooterContent>
                <Logo>{logo}</Logo>
                <WalletBalance>Balance: ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</WalletBalance>
            </FooterContent>
        </FooterContainer>
    );
}

export default Footer;