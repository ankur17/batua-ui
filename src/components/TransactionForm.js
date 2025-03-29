import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Button, Switch, message, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {WalletContext} from "../context";

const FormContainer = styled.div`
    margin: 2rem auto;
    max-width: 500px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
`;

const StyledForm = styled(Form)`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const ToggleContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const WALLET_ID = '67e32b50bcd1a5b93e017f36';
const API_URL = `http://localhost:8081/api/v1/transact/${WALLET_ID}`;

function TransactionForm() {
    const {walletDetails, hasWallet} = React.useContext(WalletContext);

    const [form] = Form.useForm();
    const [isCredit, setIsCredit] = useState(true);
    const [loading, setLoading] = useState(false);


    if(hasWallet){
        return null
    }


    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: isCredit ? Math.abs(values.amount) : -Math.abs(values.amount),
                    description: values.description
                }),
            });

            if (!response.ok) {
                throw new Error('Transaction failed');
            }

            message.success('Transaction completed successfully');
            form.resetFields();
        } catch (error) {
            console.error('Error:', error);
            message.error('Failed to complete transaction');
        } finally {
            setLoading(false);
        }
    };

    return (
        <FormContainer>
            <h2>New Transaction</h2>
            <StyledForm
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="Amount"
                    name="amount"
                    rules={[
                        { required: true, message: 'Please enter amount' },
                        { type: 'number', message: 'Amount must be a number' },
                        { type: 'number', min: 0.0001, message: 'Amount must be greater than 0' }
                    ]}
                >
                    <Input
                        type="number"
                        placeholder="Enter amount"
                        prefix="$"
                        step="0.0001"
                        min="0.0001"
                    />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                        { required: true, message: 'Please enter description' },
                        { min: 3, message: 'Description must be at least 3 characters' }
                    ]}
                >
                    <Input
                        placeholder="Enter transaction description"
                        maxLength={100}
                    />
                </Form.Item>

                <ToggleContainer>
                    <span>Transaction Type:</span>
                    <Switch
                        checked={isCredit}
                        onChange={setIsCredit}
                        checkedChildren="CREDIT"
                        unCheckedChildren="DEBIT"
                    />
                </ToggleContainer>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        icon={<PlusOutlined />}
                        loading={loading}
                        block
                    >
                        Execute Transaction
                    </Button>
                </Form.Item>
            </StyledForm>
        </FormContainer>
    );
}

export default TransactionForm;