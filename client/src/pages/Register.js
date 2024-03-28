import React, { useState } from 'react';
import { Form, Input, message, Button } from 'antd';
import '../styles/RegisterStyle.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import logoPhoto from '../assets/Appointme-05.png';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../firebase/setup';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showOTPInput, setShowOTPInput] = useState(false);
    const [user, setUser] = useState(null);
    const [otp, setOtp] = useState('');
    const [phone, setPhone] = useState('');
    const [showSignup, setShowSignup] = useState(false);

    const onfinishHandler = async (values) => {
        try {
            // Add the phone number to the form data
            values.phone = phone.replace('+', '');

            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/register', values);
            dispatch(hideLoading());
            if (res.data.success) {
                message.success('Successfully registered');
                navigate('/login');
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error('Something went wrong');
        }
    };

    const sendOTP = async () => {
        try {
            const recaptcha = new RecaptchaVerifier(auth, 'recaptcha', {});
            const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha);
            console.log(confirmation);
            setUser(confirmation);
            message.success('OTP code has sent to the phone number');
            setShowOTPInput(true);
        } catch (error) {
            console.log(error);
            message.error('Error while sending OTP');
        }
    };

    const verifyOTP = async () => {
        try {
            await user.confirm(otp);
            message.success('OTP code is verified');
            setShowSignup(true);
        } catch (error) {
            message.error('Invalid OTP');
        }
    };

    const handleSubmit = () => {
        if (!phone) {
            message.error('Please enter your phone number');
            return;
        }
        else {
            sendOTP();
        }
    };

    return (
        <>
            <div className="form-container flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bgImg">
                <div className='forBg'>
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            className="mx-auto h-10 w-auto logo"
                            src={logoPhoto}
                            height="150px"
                            width="150px"
                            alt="Your Company"
                        />
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-pink-600">
                            Sign Up
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">

                        <Form layout="vertical" onFinish={onfinishHandler} className="space-y-6">
                            <Form.Item
                                label={<label style={{ color: "black" }}>Name</label>}
                                name="name"
                                rules={[{ required: true, message: 'Please enter your name' }]}
                            >
                                <Input
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </Form.Item>

                            <Form.Item
                                label={<label style={{ color: "black" }}>Email Address</label>}
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

                            <Form.Item label={<label style={{ color: "black" }}>Phone number</label>}>
                                <Input.Group compact style={{ display: 'flex' }}>
                                    <PhoneInput
                                        country={'lk'}
                                        value={phone}
                                        onChange={(phone) => setPhone('+' + phone)}
                                        style={{ flex: 1 }}
                                        inputProps={{
                                            name: 'phone',
                                            required: true,
                                            autoFocus: true,
                                            placeholder: 'Enter phone number',
                                            maxLength: 15, // Maximum length for formatted phone number

                                        }}
                                    />
                                    <Button
                                        variant="contained"
                                        type="primary"
                                        className="flex w-full justify-center rounded-md bg-pink-500 px-2 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                                        style={{ width: '105px', height: '34px', marginLeft: '10px' }} // Add margin-left for spacing
                                        onClick={handleSubmit}
                                    >
                                        {!showSignup ? 'Get the code' : 'Verify'}
                                    </Button>
                                </Input.Group>
                                <div id="recaptcha"></div>
                            </Form.Item>

                            {showOTPInput && (
                                <Form.Item label="OTP" name="otp">
                                    <Input.Group compact style={{ display: 'flex' }}>
                                        <Input
                                            placeholder="x-x-x-x-x-x"
                                            onChange={(e) => setOtp(e.target.value)}
                                            maxLength={6} // Limits input to 6 characters
                                            type="text"
                                            className="block flex-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            style={{ marginRight: '10px' }} // Add margin-right for spacing
                                        />
                                        <Button
                                            type="primary"
                                            className="flex justify-center rounded-md bg-pink-500 px-2 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                                            style={{ width: '105px', height: '34px' }}
                                            onClick={verifyOTP}
                                        >
                                            Verify
                                        </Button>
                                    </Input.Group>
                                </Form.Item>
                            )}

                            {showSignup && (
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="flex w-full justify-center rounded-md bg-pink-500 px-3 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                                    >
                                        Sign Up
                                    </Button>
                                </Form.Item>
                            )}
                        </Form>

                        <Link to="/login" className="font-semibold leading-6 text-orange-600 hover:text-orange-500">
                            <p className="mt-10 text-center text-sm text-pink-500 container-padding ">Already a member? Login</p>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
