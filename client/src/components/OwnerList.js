//import { Cursor } from 'mongoose'
import React from 'react'
import { useNavigate } from 'react-router-dom'
const OwnerList = ({ owner }) => {
    const navigate = useNavigate()
    return (
        <div>
            <div className='card m-2' style={{ cursor: 'pointer' }} onClick={() => { navigate(`/owner/book-appointment/${owner._id}`) }}>
                <div className='card-header'>
                    Salon: {owner.firstName} {owner.lastName}
                </div>
                <div className='card-body'>
                    <p> <b>Description</b> {owner.description} </p>
                    <p> <b>Features</b> {owner.features} </p>
                    <p> <b>Email</b> {owner.email} </p>
                    <p> <b>Timing</b> {owner.timings[0]} - {owner.timings[1]} </p>
                    <p> <b></b> { } </p>
                    <p> <b></b> { } </p>
                </div>
            </div>
        </div>
    )
}

export default OwnerList
