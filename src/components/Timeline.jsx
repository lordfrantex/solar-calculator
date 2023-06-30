import React from 'react'
import '../components/css/timeline.css'
const Timeline = () => {
    return (
        <div id='timeline' className=' py-4 container-xxl'>
            <h3 className='text-center my-4' data-aos='zoom-down' data-aos-duration='1000'>Some facts about solar power system</h3>
            <div className="timeline-container">
                <div className="line"></div>
                <div className="timeline" data-aos='fade-left' data-aos-duration='1000'>
                    Do you know that solar power system covers more than half of the money you spend on utilities?
                    Are you tired of paying electrical bills monthly, or tried of carbon polluted environment, It's important to
                    explore alternative source of energy that are eco-friendly and sustainable. That option is Solar Energy.
                </div>
                <div className="timeline" data-aos='fade-right' data-aos-duration='1000'>
                    Do you want to go completely offgrid having 24 hours light? Not relying on any utility for power supply?
                    Mohztec Technologies are the best, and are experts in solar installation and sales of any solar materials.
                    Contact us now via any of the medium in the contact section below, we have you covered.

                </div>
                <div className="timeline " data-aos='fade-left' data-aos-duration='1000'>
                    Do you know that solar power is gainnig massive popularity now because of it's unending benefits to the world, It is hope of the future and
                    The world is going green. You don't know what it takes to get started?
                    Dont worry, our online solar calculator is here to help.
                </div>
                <div className="timeline" data-aos='fade-right' data-aos-duration='1000'>
                    Our online solar calculator app is very dynamic, as you can adjust some parameters to suit your need and give you a personlalized energy quotation based on the inputs.
                </div>

                <div className="timeline" data-aos='fade-left' data-aos-duration='1000'>
                    Solar energy is clean, abundant, sustainable and scaleable which makes it an ideal option for reducing your carbon footprint and making your environment conducive
                </div>

            </div>
        </div>
    )
}

export default Timeline