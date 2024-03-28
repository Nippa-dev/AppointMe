import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Layout from '../components/Layout';
import { Row } from 'antd'
import OwnerList from '../components/OwnerList';


const HomePage = () => {
    const [owners, setOwners] = useState([])
    //login user data
    const getUserData = async () => {
        try {
            const res = await axios.get('/api/v1/user/getAllOwners', {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            })
            if (res.data.success) {
                setOwners(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUserData()
    }, [])
    return (
        <Layout>
            <h1 className='text-center'> HomePage</h1>
            <Row>
                {owners && owners.map((owner) => <OwnerList owner={owner} />)}
            </Row>
        </Layout>
    )
}

export default HomePage;
