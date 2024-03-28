import React from 'react'
import '../styles/indexpage.css'
import mainImg from '../assets/35.jpg'
import barber from '../assets/barber.jpg'
import barber2 from '../assets/barber2.jpg'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
function Index() {
    return (
        <div>
            <Navbar />
            <header className="w3-display-container w3-content w3-wide " style={{ maxWidth: '1600px', minWidth: '500px' }} id="home">
                <img className="w3-image mainBg " src={mainImg} alt=" Hamburger Catering" width="1600" height="600" mainBg />
                <div className="w3-display-bottomleft w3-padding-large w3-opacity">
                    <h1 className="w3-xxlarge">Book Your Appointment</h1>
                </div>
            </header>

            <div className="w3-content" style={{ maxWidth: '1100px' }}>


                <div className="w3-row w3-padding-64" id="about">
                    <div className="w3-col m6 w3-padding-large w3-hide-small">
                        <img src={barber} className="w3-round w3-image w3-opacity-min" alt="Table Setting" width="600" height="750" />
                    </div>

                    <div className="w3-col m6 w3-padding-large bg-gray-100">
                        <h1 className="w3-center">About Us</h1><br />
                        <h5 className="w3-center">Tradition since 1889</h5>
                        <p className="w3-large">Welcome to AppointMe, your premier destination for effortless salon booking. We strive to simplify your beauty routine by providing a seamless online platform where you can easily schedule appointments with your favorite stylists and salons. <span className="w3-tag w3-light-grey">  </span> </p>
                        <p className="w3-large w3-text-grey w3-hide-medium"> With AppointMe, you can say goodbye to long waiting times and hello to convenience and confidence. Discover the future of salon booking with us.  </p>
                    </div>
                </div>

                <hr />

                {/* Menu Section */}
                <div className="w3-row w3-padding-64 bg-pink-100 Ourservices" id="menu">
                    <div className="w3-col l6 w3-padding-large">
                        <h1 className="w3-center">Our Services</h1><br />
                        <h4>Browse Salon</h4>
                        <p className="w3-text-grey">Discover a wide array of salon services at AppointMe designed to cater to your every need.</p><br />

                        <h4>Register Salon</h4>
                        <p className="w3-text-grey">Salon owners, it's your time to open your salon to universe</p><br />

                        <h4>Booking</h4>
                        <p className="w3-text-grey">Book your appointment now and treat yourself to the luxury of self-care at AppointMe.
                        </p><br />


                    </div>

                    <div className="w3-col l6 w3-padding-large">
                        <img src={barber2} className="w3-round w3-image w3-opacity-min" alt="Menu" style={{ width: '100%' }} />
                    </div>
                </div>

                <hr />

                {/* Contact Section */}
                <div className="my-5 w3-container w3-padding-64 commnBorder bg-gray-100" id="contact">
                    <h1>Contact Us</h1><br />
                    <p>
                        Feel free to reach out to us for any inquiries, technical issues, or collaboration opportunities. We value your feedback and are committed to providing you with the best possible experience. Whether you have questions about our services, need assistance with booking an appointment, or want to explore partnership opportunities, our team is here to help. Contact us today, and let's connect to make your experience with AppointMe exceptional.</p>
                    <p className="w3-text-blue-grey w3-large"><b>Technical Support </b></p>
                    <p>appointme@gmail.com</p>

                </div>

                {/* End page content */}
            </div>
            <Footer />
        </div>
    )
}

export default Index
