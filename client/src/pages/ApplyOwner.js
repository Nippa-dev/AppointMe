import React from 'react'
import Layout from '../components/Layout'
import { Form, Col, Input, Row, TimePicker, message, } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { showLoading, hideLoading } from '../redux/features/alertSlice'
import axios from 'axios'
import moment from 'moment'
import '../styles/layout.css'
// import { Form } from 'react-router-dom'
const ApplyOwner = () => {
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleFinish = async (values) => {
        try {
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/apply-owner', {
                ...values, userId: user._id, timings: [
                    moment(values[0]).format("HH:mm"),
                    moment(values[1]).format("HH:mm"),
                ]
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if (res.data.success) {
                message.success('Succesfuty Added')
                navigate('/')

            } else message.error(res.data.success);
        } catch (error) {
            dispatch(hideLoading())
            console.log(error)
            message.error('Something went wrong')

        }

    }
    return (
        <div>
            <Layout>
                <h1 className='text-center'>Register My Salon</h1>
                <Form layout="vertical" onFinish={handleFinish} className='m-3 text-white'>
                    <h4 className='text-white'> Personal Details : </h4>
                    <Row gutter={20} >
                        <Col xs={24} md={24} lg={8} clas>
                            <Form.Item label="First Name" name="firstName" required rules={[{ required: true }]}  >
                                <Input type='text' placeholder='Your Name' />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label="Last Name" name="lastName" required rules={[{ required: true }]}>
                                <Input type='text' placeholder='Your Name' />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label="Phone" name="phone" required rules={[{ required: true }]}>
                                <Input type='text' placeholder='Phone number' />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label="email" name="email" required rules={[{ required: true }]}>
                                <Input type='text' placeholder='Your email' />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label="website" name="website" required >
                                <Input type='text' placeholder='Your website' />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label="address" name="address" required rules={[{ required: true }]}>
                                <Input type='text' placeholder='Your address' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <h4 className='text-white'> Other Details : </h4>

                    <Row gutter={20}>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label="description" name="description" required rules={[{ required: true }]}>
                                <Input type='text' placeholder='Your description' />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label="features" name="features" required rules={[{ required: true }]}>
                                <Input type='text' placeholder=' features' />
                            </Form.Item>
                        </Col>


                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label="Price Range" name="feesAvg" required rules={[{ required: true }]}>
                                <Input type='text' placeholder='Price Range' />
                            </Form.Item>
                        </Col>


                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label="timings" name="timings" required rules={[{ required: true }]}>
                                <TimePicker.RangePicker format="HH:mm" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}></Col>
                        <Col xs={24} md={24} lg={8}>
                            <div className='d-flex justify-content-end'>
                                <button type="submit" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Submit</button>
                            </div>
                        </Col>

                    </Row>

                </Form>

            </Layout>

        </div>
    )
}

export default ApplyOwner
