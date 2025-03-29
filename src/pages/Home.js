import React, {createContext, useEffect, useState} from 'react';
import { Layout, Typography } from 'antd';
import WalletForm from '../components/WalletForm';
import TransactionForm from '../components/TransactionForm';
import TransactionsTable from '../components/TransactionsTable';
import Header from '../components/Header';
import {WalletContext} from "../context";
import {LOCALSTORE_KEYS} from "../Services/constants";

const { Content } = Layout;
const { Title } = Typography;


function Home() {
    const [walletDetails, setWalletDetails] = useState({});

    useEffect(() => {
        const walletData = localStorage.getItem(LOCALSTORE_KEYS.WALLET_DETAILS);
        console.log({walletData});
        if (walletData) {
            setWalletDetails(JSON.parse(walletData))
        }
    },[])

    const hasWallet = walletDetails.hasOwnProperty('_id');
    return (
        <Layout>
            <WalletContext.Provider value={{walletDetails, hasWallet}}>
                <Header />
                <Content style={{ marginTop: '64px', padding: '24px' }}>
                    <Title level={1} style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        Wallet Management System
                    </Title>
                    <WalletForm />
                    <TransactionForm />
                    <TransactionsTable />
                </Content>
            </WalletContext.Provider>
        </Layout>
    );
}

export default Home;