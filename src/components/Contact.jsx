// React Libraries
import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom'

// Custom CSS
import '../components/css/contact.css'

// React Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Emailjs
import emailjs from '@emailjs/browser';

// Fontawesome  Libraries
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faLinkedinIn, faGithub, faInstagram, faWhatsapp, faTelegram, faTiktok } from "@fortawesome/free-brands-svg-icons"
import { faGlobe, faMessage, faPerson, faPen, faPhone, faLocation, faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {

    // Initializing Emailjs
    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_ydc6ji9', 'template_cl22dgy', form.current, 'VcEDoiD7fAsK_FS9B')
            .then((result) => {
                (result.status = 200) && toast("Message Sent Successfully!!! 😊")
                console.log(result);

            }, (error) => {
                console.log(error.text);
            });
    };

    return (


        <div className='container-xxl' id='contact'>

            <div className="heading-style" data-aos='fade-down' data-aos-duration='1000'>
                <h2>Contact us</h2>
            </div>
            <div className="contact-container">
                <div className="contact-left">
                    <div className="upper-section" data-aos='fade-up' data-aos-duration='1000'>
                        <h2>Do you want to make further enquiries???</h2>
                        <p className='email'>You can send us an email together with the attached downloaded PDF </p>
                    </div>
                    <ul className="lower-section" data-aos='fade-up' data-aos-duration='1000'>
                        <p className='contact'> Contact us via:</p>
                        <li><span> <FontAwesomeIcon icon={faGlobe}></FontAwesomeIcon></span> <a target='_blank' rel='noopener noreferrer' href="https://mohztec.com.ng">mohztec.com.ng</a></li>
                        <li><span><FontAwesomeIcon icon={faPhone}></FontAwesomeIcon></span> +234 8102 300 105</li>
                        <li><span><FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon></span> Shop 3, Iyaniwura shopping complex, Akure, Ondo State, Nigeria.</li>
                        <li><span><FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon></span> mosesokocha9@gmail.com</li>
                    </ul>
                    <div className="icon-container" data-aos='fade-up' data-aos-duration='1000'>
                        <h3 >Follow us on:</h3>
                        <div className="icon">
                            <span><FontAwesomeIcon icon={faFacebook} /></span>
                            <span><FontAwesomeIcon icon={faInstagram} /></span>
                            <span><FontAwesomeIcon icon={faTiktok} /></span>
                            <span><FontAwesomeIcon icon={faTwitter} /></span>

                        </div></div>
                </div>
                <div className="contact-right">
                    <h4 data-aos='fade-down' data-aos-duration='1000'>Send us an email</h4>
                    <form ref={form} enctype="multipart/form-data" method="post" onSubmit={sendEmail} className="email-container" data-aos='fade-up' data-aos-duration='1000'>
                        <input type="text" placeholder='Name' name='name' />
                        <input type="email" placeholder='Email' name='email' />
                        <input type="text" placeholder='Subject' name='subject' />
                        <textarea placeholder='Start typing here...' name='message' ></textarea>
                        <button type='submit'><span> <FontAwesomeIcon icon={faTelegram}></FontAwesomeIcon></span> Send</button>
                        {/* <ToastContainer
                            draggable
                            theme='dark'
                            hideProgressBar={false}
                            pauseOnHover
                            pauseOnFocusLoss /> */}
                    </form>
                </div>
            </div>
        </div >
    )

}

export default Contact