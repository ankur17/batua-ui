import React from 'react';
import { Layout, Typography } from 'antd';
import WalletForm from '../components/WalletForm';
import TransactionForm from '../components/TransactionForm';
import TransactionsTable from '../components/TransactionsTable';
import Footer from '../components/Footer';

const { Content } = Layout;
const { Title } = Typography;

function Home() {
    return (
        <Layout>
            <Footer />
            <Content style={{ marginTop: '64px', padding: '24px' }}>
                <Title level={1} style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    Wallet Management System
                </Title>
                <WalletForm />
                <TransactionForm />
                <TransactionsTable />
            </Content>
        </Layout>
    );
}

export default Home;