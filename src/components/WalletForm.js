import React, {useState} from 'react';
import {Form, Input, Button, Card, message, InputNumber} from 'antd';
import {WalletOutlined} from '@ant-design/icons';
import {WalletContext} from "../context";
import {setupWallet} from "../Services/apiCall";

function WalletForm() {
    const {setWalletDetails} = React.useContext(WalletContext);
    const [isLoading, setIsLoading] = useState(false);

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        setIsLoading(true);
        try {
            const payload = {
                name: values.name,
                balance: Number((+values.balance).toFixed(4)),
            }
            const data = await setupWallet(payload);

            // 1. save walletId on localStore (done in API call response)
            // 2. save walletDetails in the state.
            setWalletDetails(data)
            message.success(`Welcome ${data.name}!`);
        } catch (error) {
            console.error('Error:', error.message);
            message.error('Failed to create wallet');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card
            title={<><WalletOutlined/> Create New Wallet</>}
            style={{maxWidth: 500, margin: '2rem auto'}}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    label="Wallet Name"
                    name="name"
                    rules={[{required: true, message: 'Please input wallet name!'}]}
                >
                    <Input placeholder="Enter wallet name" autoFocus/>
                </Form.Item>

                <Form.Item
                    label="Balance"
                    name="balance"
                    rules={[{required: true, message: 'Please input balance!'}]}
                >
                    <InputNumber
                        style={{width: '100%'}}
                        placeholder="Enter balance"
                        prefix="$"
                        step="0.0001"
                        min="0.0001"
                        stringMode
                        precision={4}
                    />

                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block loading={isLoading}>
                        Create Wallet
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default WalletForm;