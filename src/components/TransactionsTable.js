import React, {useState, useEffect, useMemo} from 'react';
import styled from 'styled-components';
import {Button} from 'antd';
import {DownloadOutlined} from '@ant-design/icons';
import {getTransactions, transactionCSV} from "../Services/apiCall";
import {formatDateTime} from "../utils/dateTime";
import {WalletContext} from "../context";


const TableContainer = styled.div`
    margin: 2rem auto;
    max-width: 1000px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 1rem;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
`;

const Th = styled.th`
    padding: 1rem;
    text-align: left;
    background-color: #f8f9fa;
    border-bottom: 2px solid #dee2e6;
    font-weight: 500;
`;

const Td = styled.td`
    padding: 1rem;
    border-bottom: 1px solid #dee2e6;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
`;

const Title = styled.h2`
    margin: 0;
    color: #333;
`;

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
`;

function TransactionsTable() {
    const {walletDetails} = React.useContext(WalletContext);

    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [cache, setCache] = useState({});
    const pageSize = 10;

    const fetchTransactions = async (page) => {
        // Check cache first
        if (cache[page]) {
            setTransactions(cache[page]);
            return;
        }

        setLoading(true);
        try {
            const skip = (page - 1) * pageSize;
            const data = await getTransactions({skip, limit: pageSize});


            // Update cache
            setCache(prev => ({...prev, [page]: data}));
            setTransactions(data);

            // If we got less than pageSize items, we've reached the end
            setHasMore(data.length === pageSize);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions(currentPage);
    }, [currentPage]);

    const getCSVDownloadURL = useMemo(() => transactionCSV(), [walletDetails]);
    const handleNext = () => {
        if (hasMore) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const handleExport = () => {
        // TODO: Implement export to CSV
    };

    return (
        <TableContainer>
            <Header>
                <Title>Wallet Transactions</Title>
                <Button
                    type="primary"
                    icon={<DownloadOutlined/>}
                    href={getCSVDownloadURL}
                    // onClick={handleExport}
                >
                    Export to CSV
                </Button>
            </Header>

            <Table>
                <thead>
                <tr>
                    <Th>Description</Th>
                    <Th>Amount</Th>
                    <Th>Balance</Th>
                    <Th>Date</Th>
                    <Th>Type</Th>
                </tr>
                </thead>
                <tbody>
                {transactions.map(transaction => (
                    <tr key={transaction._id}>
                        <Td>{transaction.description}</Td>
                        <Td>${transaction.amount.toFixed(4)}</Td>
                        <Td>${transaction.balance.toFixed(4)}</Td>
                        <Td>{formatDateTime(transaction.createdAt)}</Td>
                        <Td>{transaction.type}</Td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <PaginationContainer>
                {currentPage > 1 && (
                    <Button onClick={handlePrevious} disabled={loading}>
                        Previous
                    </Button>
                )}
                {hasMore && (
                    <Button onClick={handleNext} disabled={loading}>
                        Next
                    </Button>
                )}
            </PaginationContainer>
        </TableContainer>
    );
}

export default TransactionsTable;