import React from 'react'
import '../styles/LayoutStyles.css'
import { adminMenu, userMenu } from '../Data/data'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logoPhoto from '../assets/Appointme-07.png'
import { useSelector } from 'react-redux'
import { message, Badge } from 'antd'
import '../styles/Login.css'


const Layout = ({ children }) => {
    const { user } = useSelector(state => state.user)
    const location = useLocation()
    const navigate = useNavigate()

    //logout Func
    const handleLogout = () => {
        localStorage.clear()
        message.success("Logout Successfully")
        navigate("/login")
        window.location.reload()
    }

    //...........Doc menu............
    const ownerMenu = [
        {
            name: 'Home',
            path: '/',
            icon: 'fa-sharp fa-solid fa-house'
        },
        {
            name: 'Appointment',
            path: '/owner-appointments',
            icon: 'fa-sharp fa-solid fa-list'
        },
        {
            name: 'Profile',
            path: `/owner/profile/${user?._id}`,
            icon: 'fa-sharp fa-solid fa-user'
        },

    ]
    //...........Doc menu...........



    //rendering menu list
    const SidebarMenu = user?.isAdmin ? adminMenu : user?.isOwner ? ownerMenu : userMenu;

    return (
        <>
            <div className='main bgImg'>
                <div className='layout'>
                    <div className='sidebar'>
                        <div className='' onClick={() => { navigate('/') }}>
                            <img src={logoPhoto} alt='AppointMe' className='logoPhoto' />

                            <hr />
                        </div>
                        <div className='menu'>
                            {SidebarMenu.map(menu => {
                                const isActive = location.pathname === menu.path
                                return (
                                    <>
                                        <div className={`menu-item ${isActive && 'active'}`}>
                                            <i className={menu.icon}></i>
                                            <Link to={menu.path} > {menu.name} </Link>
                                        </div>
                                    </>
                                )
                            })}
                            <div className={`menu-item `} onClick={handleLogout} >
                                <i className="fa-sharp fa-solid fa-right-from-bracket"></i>
                                <Link to='/login' > LogOut </Link>
                            </div>
                        </div>
                    </div>
                    <div className='content'>
                        <div className='header'>
                            <div className='header-content'>
                                <Badge count={user && user.notification.length} onClick={() => { navigate('notification') }} style={{ cursor: 'pointer' }}  >
                                    <Link to="/profile">{user?.name}</Link>
                                </Badge>
                                <i class="fa-sharp fa-solid fa-bell"></i>
                            </div>
                        </div>
                        <div className='body ' > {children}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout
