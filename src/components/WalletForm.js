import React from 'react';
import { Form, Input, Button, Card } from 'antd';
import { WalletOutlined } from '@ant-design/icons';

function WalletForm() {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Form submitted:', values);
        form.resetFields();
    };

    return (
        <Card
            title={<><WalletOutlined /> Create New Wallet</>}
            style={{ maxWidth: 500, margin: '2rem auto' }}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    label="Wallet Name"
                    name="walletName"
                    rules={[{ required: true, message: 'Please input wallet name!' }]}
                >
                    <Input placeholder="Enter wallet name" />
                </Form.Item>

                <Form.Item
                    label="Balance"
                    name="balance"
                    rules={[{ required: true, message: 'Please input balance!' }]}
                >
                    <Input type="number" placeholder="Enter balance" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Create Wallet
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default WalletForm;