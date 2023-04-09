import React, {Component} from 'react';
import { Button, Modal, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { signup } from '../utils'

class SignupForm extends Component {
    state = {
        displayModal: false
    }

    signupOnClick = () => {
        this.setState( { displayModal: true})
    }
    handleCancel = () => {
        this.setState( { displayModal: false })
    }
    onFinish = (data) => {
        console.log('Received values of form: ', data);
        //1. collect all values
        //2. send signup request to server -> add api
        //3. analyze the response from the server
        // 3.1 success
        // 3.2 fail
        signup(data)
            .then( () => {
                message.success(`Successfully signed up`);
                })
            .catch( err => {
                message.error(err.message);
            })
    }
    render() {
        return (
            <>
                <Button type="primary" onClick={this.signupOnClick}>
                    Register!
                </Button>
                <Modal title="Basic Modal"
                       open={this.state.displayModal}
                       onCancel={this.handleCancel}
                       footer = {null}
                       //react node is null
                       destroyOnClose={true}
                >
                    <Form
                        name="normal_register"
                        onFinish={this.onFinish}
                        //preserve={false}
                    >
                        <Form.Item
                            name="email"
                            rules={[{
                                required: true,
                                message: "Please input your email!"
                            }]}
                        >
                            <Input
                                //add icon
                                prefix={<UserOutlined />}
                                placeholder="Email"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your password!" },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined />}
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item
                            name="firstname"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your first name!" },
                            ]}
                        >
                            <Input

                                placeholder="firstname"
                            />
                        </Form.Item>
                        <Form.Item
                            name="lastname"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your last name!" },
                            ]}
                        >
                            <Input

                                placeholder="lastname"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Register
                            </Button>
                        </Form.Item>

                    </Form>
                </Modal>
            </>
        );
    }
}

export default SignupForm;