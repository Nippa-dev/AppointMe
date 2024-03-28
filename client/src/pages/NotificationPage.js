import Layout from './../components/Layout'
import React from 'react'
import { Tabs, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { showLoading, hideLoading } from '../redux/features/alertSlice'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const NotificationPage = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading())
      const res = await axios.post('/api/v1/user/get-all-notification', { userId: user._id }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      dispatch(hideLoading())
      if (res.data.success) {
        message.success(res.data.message)
      } else {
        message.error(res.data.message)
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error)
      message.error("Something went wrong")
    }

  }
  const handleDeleteAll = async () => {
    try {
      dispatch(showLoading())
      const res = await axios.post('/api/v1/user/delete-all-notification', { userId: user._id }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      dispatch(hideLoading())
      if (res.data.success) {
        message.success(res.data.message)
      } else {
        message.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      message.error("Something went wrong deleting notifications")
    }

  }



  return (

    <Layout>
      <h4 className='p-3 text-center' >Notification Page</h4>
      <Tabs>
        <Tabs.TabPane tab="Unread" key={0} >
          <div className='d-flex justify-content-end' >
            <h4 className='p-2 ' onClick={handleMarkAllRead} style={{ cursor: 'pointer' }}  >Mark All Read</h4>
          </div>
          {
            user?.notification.map(notificationMgs => (
              // deepcode ignore ReactMissingArrayKeys: <please specify a reason of ignoring this>
              <div className='card' style={{ cursor: 'pointer' }} >
                <div className='card-text' onClick={() => navigate(notificationMgs.onClickPath)} >  {notificationMgs.message}  </div>
              </div>
            ))
          }
        </Tabs.TabPane>

        <Tabs.TabPane tab="Read" key={1} >
          <div className='d-flex justify-content-end' >
            <h4 className='p-2 text-primary' onClick={handleDeleteAll} style={{ cursor: 'pointer' }}  >Delete All Read</h4>
          </div>

          {
            user?.seennotification.map(notificationMgs => (
              // deepcode ignore ReactMissingArrayKeys: <no error >
              <div className='card' style={{ cursor: 'pointer' }} >
                <div className='card-text' onClick={() => navigate(notificationMgs.onClickPath)} >  {notificationMgs.message}  </div>
              </div>
            ))
          }

        </Tabs.TabPane>
      </Tabs>
    </Layout>
  )
}

export default NotificationPage
