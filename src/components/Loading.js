import React, {createContext, useEffect, useState} from 'react';
import {Layout, Typography} from 'antd';
import WalletForm from '../components/WalletForm';
import TransactionForm from '../components/TransactionForm';
import TransactionsTable from '../components/TransactionsTable';
import Header from '../components/Header';
import {WalletContext} from "../context";
import {LOCALSTORE_KEYS, PAGE_STATE} from "../Services/constants";
import PageToggle from "../components/PageToggle";
import TransactionSearch from "../components/TransactionSearch";
import {resolveWalletId} from "../utils/apiHelper";
import {getWalletDetails} from "../Services/apiCall";
import Loading from "../components/Loading";

const {Content} = Layout;
const {Title} = Typography;


function Home() {
    const [walletDetails, setWalletDetails] = useState({});
    const [pageState, setPageState] = useState(PAGE_STATE.FORM)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const walletId = resolveWalletId();
        if (walletId) {
            setLoading(true);
            getWalletDetails(walletId)
                .then(result => result.json())
                .then(data => {
                    setWalletDetails(data)
                    setLoading(false);
                })
                .catch(error => setLoading(false));
        }
    }, [])

    const hasWallet = walletDetails.hasOwnProperty('id');
    return (
        <Layout style={{paddingRight: "34"}}>
            <WalletContext.Provider value={{walletDetails, setWalletDetails, hasWallet}}>
                <Header/>
                <Loading loading={loading}/>
                <Content style={{marginTop: '64px', padding: '24px'}}>
                    <Title level={1} style={{textAlign: 'center', marginBottom: '2rem'}}>
                        Wallet Management System
                    </Title>
                    {hasWallet && <PageToggle setPageState={setPageState}/>}
                    {!hasWallet && <WalletForm/>}
                    {hasWallet && pageState === PAGE_STATE.FORM && <TransactionForm/>}
                    {hasWallet && pageState === PAGE_STATE.TRANSACTIONS && <TransactionsTable/>}
                    {hasWallet && pageState === PAGE_STATE.SEARCH && <TransactionSearch/>}
                </Content>
            </WalletContext.Provider>
        </Layout>
    );
}

export default Home;