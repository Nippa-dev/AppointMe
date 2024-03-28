import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { Table, message } from 'antd'

const Owners = () => {
    const [owners, setOwners] = useState([]);
    const getOwners = async () => {
        try {
            const res = await axios.get('/api/v1/admin/getAllOwners', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res.data.success) {
                setOwners(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    //handle accounts
    const handleAccountStatus = async (record, status) => {
        try {
            const res = await axios.post('/api/v1/admin/changeAccountStatus', { ownerId: record._id, userId: record.userId, status: status },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                })
            if (res.data.success) {
                message.success(res.data.message)
                window.location.reload()
            }
        } catch (error) {
            message.error("Something went wrong")
        }

    }
    useEffect(() => { getOwners() }, [])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text, record) => (<span>{record.firstName} {record.lastName}</span>)
        },
        {
            title: 'Status',
            dataIndex: 'status'
        },
        {
            title: 'Phone',
            dataIndex: 'phone'
        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => (
                <div className="d-flex">
                    {record.status === "pending" ? (
                        <button
                            className="btn btn-success"
                            onClick={() => handleAccountStatus(record, "approved")}
                        >
                            Approve
                        </button>
                    ) : (
                        <button className="btn btn-danger">Reject</button>
                    )}
                </div>
            ),
        },
    ];

    return (
        <Layout>
            <h1> All the owner </h1>
            <Table columns={columns} dataSource={owners} />
        </Layout>

    )
}

export default Owners
