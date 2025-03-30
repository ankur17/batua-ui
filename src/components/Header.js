import React from 'react';
import styled from 'styled-components';
import {WalletContext} from "../context";
import logoIcon from "../Assets/icons8-wallet-account-100.png";
// icon source: // https://img.icons8.com/cotton/64/euro-account.png

const HeaderContainer = styled.footer`
    background-color: #fff;
    padding: 1rem 2rem;
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
`;

const HeaderContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
`;

const BrandName = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
    margin-left: 5px;
`;

const WalletBalance = styled.div`
    display: ${props => (props.show ? 'block' : 'none')};
    font-size: 1.25rem;
    color: #28a745;
    font-weight: 500;
`;

const Logo = styled.img`
    width: 2rem;
    height: 2rem;
`

const Branding = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

function Header() {
    const {walletDetails, hasWallet} = React.useContext(WalletContext);
    return (
        <HeaderContainer>
            <HeaderContent>
                <Branding>
                    <Logo src={logoIcon} alt="Logo" />
                    <BrandName>Batua</BrandName>
                </Branding>
                <WalletBalance show={hasWallet} >
                    Balance: ${walletDetails?.balance?.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })}
                </WalletBalance>
            </HeaderContent>
        </HeaderContainer>
    );
}

export default Header;