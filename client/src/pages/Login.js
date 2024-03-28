// Import necessary components from Ant Design
import { Form, Input, Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import '../styles/Login.css'
import logoPhoto from '../assets/Appointme-05.png'
export default function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinishHandler = async (values) => {
        try {
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/login', values);
            dispatch(hideLoading());

            if (res.data.success) {
                localStorage.setItem("token", res.data.token);
                message.success('Successfully Logged');
                navigate('/');
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.error(error.response || error);
            message.error('Something went wrong');
        }
    };

    return (
        <div className="form-container flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bgImg"  >
            <div className='forBg'>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm" >
                    <img
                        className="mx-auto h-10 w-auto logo"
                        src={logoPhoto}
                        height="150px"
                        width="150px"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-pink-500">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
                    <Form
                        layout="vertical"
                        onFinish={onFinishHandler}
                        className="space-y-6"
                    >
                        <Form.Item

                            label={<label style={{ color: "black" }}>Email address</label>}
                            name="email"
                            rules={[
                                { required: true, message: 'Please enter your email address' },
                                { type: 'email', message: 'Please enter a valid email address' },
                            ]}
                        >
                            <Input
                                type="email"
                                autoComplete="email"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </Form.Item>

                        <Form.Item
                            label={<label style={{ color: "black" }}>password</label>}
                            name="password"
                            rules={[{ required: true, message: 'Please enter your password' }]}
                        >
                            <Input.Password
                                autoComplete="current-password"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="flex w-full justify-center rounded-md bg-pink-500 px-3 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                            >
                                Sign in
                            </Button>
                        </Form.Item>
                    </Form>


                    <Link to="/register" className="font-semibold leading-6 text-orange-600 hover:text-orange-500">
                        <p className="mt-10 text-center text-sm text-pink-500 container-padding">
                            Not a member?{' '}</p>
                    </Link>

                </div>
            </div>
        </div>
    );
}
