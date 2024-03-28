import { BrowserRouter, Route, Routes } from 'react-router-dom'
//import logo from './logo.svg';
import './App.css';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import ApplyOwner from './pages/ApplyOwner'
import NotificationPage from './pages/NotificationPage';

import { useSelector } from 'react-redux/es/hooks/useSelector';
import Spinner from './components/Spinner';
import ProtectedRoutes from './components/ProtectedRoutes';
import PublicRoutes from './components/PublicRoutes';
import Users from './pages/admin/Users';
import Owners from './pages/admin/Owners';
import Profile from './pages/owner/Profile';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import BookingPage from './pages/BookingPage';
import Appointments from './pages/Appointments';
import OwnerAppointment from './pages/owner/OwnerAppointment';
import Navbar from './components/Navbar';



function App() {
  const { loading } = useSelector(state => state.alerts)
  return (
    <>
      <BrowserRouter>
        {loading ? (<Spinner />) : (
          <Routes>
            <Route path='/'
              element={
                <ProtectedRoutes>
                  <HomePage />
                </ProtectedRoutes>
              } />

            <Route path='/appointment'
              element={
                <ProtectedRoutes>
                  <Appointments />
                </ProtectedRoutes>
              } />
            <Route path='/owner-appointments'
              element={
                <ProtectedRoutes>
                  <OwnerAppointment />
                </ProtectedRoutes>
              } />

            <Route path='/owner/profile/:id'
              element={
                <ProtectedRoutes>
                  <Profile />
                </ProtectedRoutes>
              } />
            <Route path='/notification'
              element={
                <ProtectedRoutes>
                  <NotificationPage />
                </ProtectedRoutes>
              } />
            <Route path='/apply-owner'
              element={
                <ProtectedRoutes>
                  <ApplyOwner />
                </ProtectedRoutes>
              } />
            <Route path='/admin/users'
              element={
                <ProtectedRoutes>
                  <Users />
                </ProtectedRoutes>
              } />
            <Route path='/admin/owners'
              element={
                <ProtectedRoutes>
                  <Owners />
                </ProtectedRoutes>
              } />
            <Route path='/owner/book-appointment/:ownerId'
              element={
                <ProtectedRoutes>
                  <BookingPage />
                </ProtectedRoutes>
              } />


            <Route path='/login' element={
              <PublicRoutes><Login /></PublicRoutes>
            } />
            <Route path='/register' element={
              <PublicRoutes>  <Register />  </PublicRoutes>
            } />

            <Route path='/index' element={
              <PublicRoutes>  <Index />  </PublicRoutes>
            } />

            <Route path='/navbar' element={
              <PublicRoutes>  <Navbar />  </PublicRoutes>
            } />


            Make sure to enable this in dev mode
            <Route path='*' element={
              <NotFound />
            } />


          </Routes>
        )}

      </BrowserRouter>
    </>
  );
}

export default App;
