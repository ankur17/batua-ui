import React, {useState} from 'react';
import styled, {keyframes} from 'styled-components';
import {Input, Button, Switch, message, Form, InputNumber} from 'antd';
import {MinusOutlined, PlusOutlined} from '@ant-design/icons';
import {WalletContext} from "../context";
import {createTransaction} from "../Services/apiCall";


const bounce = keyframes`
    from {
        transform: translateY(30%);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
`;

const FormContainer = styled.div`
    margin: 2rem auto;
    max-width: 500px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    animation: ${bounce} 0.3s;
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

function TransactionForm({}) {
    const {walletDetails, setWalletDetails} = React.useContext(WalletContext);

    const [form] = Form.useForm();
    const [isCredit, setIsCredit] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {

            const calibratedAmount = isCredit ? values.amount : -values.amount;
            const result = await createTransaction({
                amount: calibratedAmount,
                description: values.description,
            })
            setWalletDetails({...walletDetails, balance: result.balance});

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
                        {required: true, message: 'Please enter amount'},
                        {type: 'Number', message: 'Amount must be a number'}
                        // { type: 'number', min: 0, message: 'Amount must be greater than 0' }

                    ]}
                >
                    <InputNumber
                        placeholder="Enter amount"
                        prefix="$"
                        step="0.0001"
                        min="0.0001"
                        stringMode
                        style={{width: 200}}
                        precision={4}
                    />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                        {required: true, message: 'Please enter description'},
                        {min: 3, message: 'Description must be at least 3 characters'}
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
                        icon={isCredit ? <PlusOutlined/> : <MinusOutlined/>}
                        loading={loading}
                        block
                        danger={!isCredit}
                    >
                        Execute Transaction
                    </Button>
                </Form.Item>
            </StyledForm>
        </FormContainer>
    );
}

export default TransactionForm;