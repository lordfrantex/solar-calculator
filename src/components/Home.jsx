import React, { useRef, useState } from 'react'
import '../components/css/home.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { HashLink as Link } from 'react-router-hash-link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faBarsStaggered, faHamburger } from '@fortawesome/free-solid-svg-icons'
import Aos from 'aos'
import 'aos/dist/aos.css'
const Home = () => {
    /*Refs*/
    const toggle = useRef()
    const mobileNav = useRef()
    const preloader = useRef()
    const fix = useRef()

    const handleToggle = () => {
        toggle.current.classList.toggle('active')
    }

    // const [fix, setFix] = useState(false)

    const changeNav = () => {
        if (window.scrollY > 0) {
            fix.current.classList.add('navBg')
        } else {
            fix.current.classList.remove('navBg')

        }

    }
    window.addEventListener('scroll', changeNav)
    window.onload = () => {
        preloader.current.style.display = 'none'
        Aos.init();

    };



    return (
        <div id='home' className='container-xxl px-0'>

            <div className="background-cover ">
                <div className="setfix">
                    <nav ref={fix} id='nav' className='container-xxl'>
                        <div className="container-xxl nav-link ">
                            <div className="logo">
                                <div className="logo-pics" data-aos='fade-down' data-aos-duration='1000'>
                                    <a href="/">
                                        <img src="/images/logo.png" alt="" />
                                    </a>
                                </div>
                            </div>
                            <ul ref={mobileNav} data-aos='fade-up' data-aos-duration='1000' className='d-none d-md-flex mobile-nav'>
                                <li onClick={() => mobileNav.current.classList.toggle('mobile-nav-width')} ><Link smooth to="#home">Home</Link></li>
                                <li onClick={() => mobileNav.current.classList.toggle('mobile-nav-width')} ><Link smooth to="#calculator">Load calculator</Link></li>
                                <li onClick={() => mobileNav.current.classList.toggle('mobile-nav-width')} ><Link smooth to="#quotation">Quotation</Link></li>
                                <li onClick={() => mobileNav.current.classList.toggle('mobile-nav-width')} ><Link smooth to="#contact">Contact us</Link></li>
                            </ul>
                            <ul className='d-none d-md-flex nav' data-aos='fade-down' data-aos-duration='1000'>
                                <li  ><Link smooth to="#home">Home</Link></li>
                                <li  ><Link smooth to="#calculator">Load calculator</Link></li>
                                <li  ><Link smooth to="#quotation">Quotation</Link></li>
                                <li  ><Link smooth to="#contact">Contact us</Link></li>
                            </ul>
                            <span onClick={() => mobileNav.current.classList.toggle('mobile-nav-width')} className='d-block d-md-none display-2 text-light'><FontAwesomeIcon icon={faBarsStaggered} /></span>
                        </div>
                    </nav>
                </div>
                <section className="background d-block d-lg-flex ">
                    <div className="write-up">
                        <div className="smiling-sun" >
                            <h2 data-aos="fade-down" data-aos-duration='1000' >Go Solar Today</h2>
                            <img data-aos="zoom-in" data-aos-duration='1000' src="/images/smiling-sun.png" alt="" />
                        </div>
                        <p data-aos="fade-down" data-aos-duration='1000' >Harness the power of <br /><span>the great red sun!!!</span></p>
                        <p data-aos="fade-down" data-aos-duration='1000' > In order to help you get started, we have built this solar calculator to aid you in calculating your power need. </p>
                        <button data-aos="fade-down" data-aos-duration='500' ><Link to='#calculator'>Get Started</Link></button>
                        <button data-aos="fade-down" data-aos-duration='500' ><Link to='#contact'>Request Quote</Link></button>
                    </div>
                    <div className="planet-circle" data-aos="zoom-in" data-aos-duration='1000' >
                        <div ref={toggle} className='parent-circle active'>

                            <li style={{ '--i': 1 }} className='earth'></li>
                            <li style={{ '--i': 2 }} className='mars'></li>
                            <li style={{ '--i': 3 }} className='mercury'></li>
                            <li style={{ '--i': 4 }} className='venus'></li>
                            <li style={{ '--i': 5 }} className='jupiter'></li>
                            <li style={{ '--i': 6 }} className='sartun'></li>
                            <li style={{ '--i': 7 }} className='neptun'></li>
                            <li style={{ '--i': 8 }} className='pluto'></li>
                            <li style={{ '--i': 9 }} className='uranus'></li>
                            <div onClick={handleToggle} className="toggle"></div>

                        </div >
                    </div>
                    <div class="custom-shape-divider-bottom-1683646786">
                        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
                        </svg>
                    </div>
                </section >
            </div >
            <section className="intro container w-75 border my-4">
                <p>The world is experiencing a paradigm shift towards renewable energy sources, and solar energy is at the forefront of this transformation. Harnessing the power of the sun has numerous
                    advantages that make it attractive alternative to conventional energy sources.
                </p>
                <p>In order to help you maximize the advantage of the sun, we created this solar calculator to help calculate and generate all the power demands of your household or industrial equipment you wish to power using solar power system. Below are the steps to follow to use our solar online calculator.</p>

            </section>
            <h3 className='text-center container w-75  my-3'>Contact Mohztec Technologies for solar installations, sales and purchase of all your solar materials.</h3>
            <section className='working '>
                <h2>How it works</h2>
                <div className="container d-md-flex d-block">
                    <div className="step  " data-aos='fade-down' data-aos-duration='1500' >
                        <img src="/images/stairs.png" alt="" />
                        <h4>Step One</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam possimus reiciendis ipsam fugit recusandae a.</p>
                    </div>
                    <div className="step  " data-aos='fade-up' data-aos-duration='1500' data-aos-delay='200'>
                        <img src="/images/stairs.png" alt="" />
                        <h4>Step Two</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam possimus reiciendis ipsam fugit recusandae a.</p>
                    </div>
                    <div className="step  " data-aos='fade-down' data-aos-duration='1500' data-aos-delay='300'>
                        <img src="/images/stairs.png" alt="" />

                        <h4>Step Three</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam possimus reiciendis ipsam fugit recusandae a.</p>
                    </div>

                </div>
            </section>
            <div ref={preloader} className="preloader">
                <img src="/images/logo.png" alt="" />
            </div>
        </div >

    )
}

export default Home