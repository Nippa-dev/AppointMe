import Layout from '../../components/Layout'
import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { message, Table } from 'antd'
import axios from 'axios'

const OwnerAppointments = () => {

    const [appointments, setAppointments] = useState([])
    const getAppointments = async () => {
        try {
            const res = await axios.get("/api/v1/owner//owner-appointments", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });
            if (res.data.success) {
                setAppointments(res.data.data);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAppointments()
        //eslint-disable-next-line
    }, [])

    const handleStatus = async (record, status) => {
        try {
            const res = await axios.post(
                "/api/v1/owner/update-status",
                { appointmentsId: record._id, status },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (res.data.success) {
                message.success(res.data.message);
                getAppointments();
            }
        } catch (error) {
            console.log(error);
            message.error("Something Went Wrong");
        }
    };
    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
        },

        {
            title: 'Date & Time ',
            dataIndex: 'date',
            render: (text, record) => (
                <span>
                    {moment(record.date).format('DD-MM-YYYY')} &nbsp;
                    {moment(record.time).format('HH:mm')}
                </span>
            )
        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => (
                <div className="d-flex">
                    {record.status === "pending" && (
                        <div className="d-flex">
                            <button
                                className="btn btn-success"
                                onClick={() => handleStatus(record, "approved")}
                            >
                                Approved
                            </button>
                            <button
                                className="btn btn-danger ms-2"
                                onClick={() => handleStatus(record, "reject")}
                            >
                                Reject
                            </button>
                        </div>
                    )}
                </div>
            ),
        },
    ];

    return (
        <div>
            <Layout>
                <h1> Doc Appointments</h1>
                <Table columns={columns} dataSource={appointments} />

            </Layout>
        </div>
    )
}

export default OwnerAppointments
