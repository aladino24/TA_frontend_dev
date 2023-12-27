import React, { useState } from "react";
import './landingpage.css';
import MainJS from "../../../utils/main";


const LandingPage = () => {
    return (
        <>
            <header className="header" id="header">
                <nav className="nav container">
                    <a href="#" className="nav__logo">MedLink</a>

                    <div className="nav__menu" id="nav-menu">
                        <ul className="nav__list">
                            <li className="nav__item">
                                <a href="#home" className="nav__link active-link">Home</a>
                            </li>
                            <li className="nav__item">
                                <a href="#about" className="nav__link">About us</a>
                            </li>
                            <li className="nav__item">
                                <a href="#services" className="nav__link">Services</a>
                            </li>
                            <li className="nav__item">
                                <a href="#contact" className="nav__link">Contact us</a>
                            </li>
                            <i className='bx bx-toggle-left change-theme' id="theme-button"></i>
                        </ul>
                    </div>

                    <div className="nav__toggle" id="nav-toggle">
                        <i className='bx bx-grid-alt'></i>
                    </div>

                    <a href="/login" className="button button__header">Login</a>
                </nav>
            </header>
            <main className="main">
                {/* HOME */}
                <section className="home section" id="home">
                    <div className="home__container container grid">

                        <div className="home__data">
                            <h1 className="home__title">Order Products <br/> Faster Easier</h1>
                            <p className="home__description">Order your favorite foods at any time and we will deliver them right to where you are.</p>

                            <a href="#" className="button">Get Started</a>

                        </div>
                        <img src={`${process.env.PUBLIC_URL}/img/colorkit1.png`} alt="Gambar 1" />

                    </div>
                </section>

                {/* ABOUT */}
                <section className="about section container" id="about">
                    <div className="about__container grid">
                        <img src={`${process.env.PUBLIC_URL}/img/colorkit2.png`} alt="Gambar 2" />
                        <div className="about__data">
                            <h2 className="section__title-center">Find Out A Little More <br/> About Us</h2>
                            <p className="about__description">We are a company dedicated to the distribution of products by delivery 
                                to your home or to the place where you are, with the best quality of delivery.
                            </p>
                        </div>

            
                    </div>
                </section>

                {/* SECURITY */}
                <section className="security section container">
                    <div className="security__container grid">
                        <div className="security__data">
                            <h2 className="section__title-center">Your Safety Is <br/> Important</h2>
                            <p className="security__description">When your order reaches you, we have the health safety protocols, 
                                so that you are protected from any disease. Watch the video of how the delivery is made.
                            </p>
                        </div>

                        <img src={`${process.env.PUBLIC_URL}/img/colorkit1.png`} alt="Gambar 3" />
                    </div>
                </section>

                {/* SERVICES */}
                <section className="services section container" id="services">
                      <h2 className="section__title">Some Services We <br /> Offer</h2>
                        <div className="services__container grid">
                            <div className="services__data">
                                <h3 className="services__subtitle">Payment Done</h3>
                                <svg className="svg__color services__img" viewBox="0 0 135 94" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0)">
                                     {/* Gambar keempat  */}
                                    </g>
                                    <defs>
                                    <clipPath id="clip0">
                                    <rect width="135" height="94" fill="white"/>
                                    </clipPath>
                                    </defs>
                                </svg>
                                <p className="services__description">Pay with a Visa or PayPal card and without much ado.</p>
                                <div>
                                    <a href="#" className="button button-link">Learn More</a>
                                </div>
                            </div>

                            <div className="services__data">
                                <h3 className="services__subtitle">Find Your Product</h3>
                                <svg className="svg__color services__img" viewBox="0 0 129 94" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0)">
                                     {/* Gambar kelima  */}
                                    </g>
                                    <defs>
                                    <clipPath id="clip0">
                                    <rect width="129" height="94" fill="white"/>
                                    </clipPath>
                                    </defs>
                                </svg>
                                <p className="services__description">We offer sale of products through the Internet.</p>
                                <div>
                                    <a href="#" className="button button-link">Learn More</a>
                                </div>
                            </div>

                            <div className="services__data">
                                <h3 className="services__subtitle">Product Received</h3>
                                <svg className="svg__color services__img" viewBox="0 0 121 94" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0)">
                                     {/* Gambar keenam  */}
                                    </g>
                                    <defs>
                                    <clipPath id="clip0">
                                    <rect width="121" height="94" fill="white"/>
                                    </clipPath>
                                    </defs>
                                </svg>
                                <p className="services__description">In our app you can see the delay time of your order.</p>
                                <div>
                                    <a href="#" className="button button-link">Learn More</a>
                                </div>
                            </div>
                        </div>
                </section>

                {/* APP */}
                <section className="app section container">
                <div className="app__container grid">
                    <div className="app__data">
                        <h2 className="section__title-center">Watch Your Delivery <br/> At Any Time</h2>
                        <p className="app__description">With our app you can view the route of your order, from our local headquarters to the 
                            place where you are. Look for the app now!</p>
                        <div className="app__buttons">
                            <a href="#" className="button button-flex">
                                <i className='bx bxl-apple button__icon'></i> App Store
                            </a>
                            <a href="#" className="button button-flex">
                                <i className='bx bxl-play-store button__icon' ></i> Google Play
                            </a>
                        </div>
                    </div>

                    <svg className="svg__img svg__color app__img" viewBox="0 0 312 256" xmlns="http://www.w3.org/2000/svg">
                        {/* <!-- Gambar ketujuh --> */}
                    </svg>
                </div>
                </section>

                {/* CONTACT US */}
                <section className="contact section container" id="contact">
                <div className="contact__container grid">
                    <div className="contact__content">
                        <h2 className="section__title-center">Contact Us From <br/> Here</h2>
                        <p className="contact__description">You can contact us from here, you can write to us, 
                            call us or visit our service center, we will gladly assist you.</p>
                    </div>

                    <ul className="contact__content grid">
                        <li className="contact__address">Telephone: <span className="contact__information">999 - 888 - 777</span></li>
                        <li className="contact__address">Email:  <span className="contact__information">delivery@email.com</span></li>
                        <li className="contact__address">Location: <span className="contact__information">Lima - Peru</span></li>
                    </ul>

                    <div className="contact__content">
                        <a href="#" className="button">Contact Us</a>
                    </div>
                </div>
                </section>
            </main>

            {/* =============== FOOTER =============== */}
            <footer className="footer section">
                <div className="footer__container container grid">
                    <div className="footer__content">
                        <a href="#" className="footer__logo">Delivery</a>
                        <p className="footer__description">Order Products Faster <br/> Easier</p>
                    </div>

                    <div className="footer__content">
                        <h3 className="footer__title">Our Services</h3>
                        <ul className="footer__links">
                            <li><a href="#" className="footer__link">Pricing </a></li>
                            <li><a href="#" className="footer__link">Discounts</a></li>
                            <li><a href="#" className="footer__link">Report a bug</a></li>
                            <li><a href="#" className="footer__link">Terms of Service</a></li>
                        </ul>
                    </div>

                    <div className="footer__content">
                        <h3 className="footer__title">Our Company</h3>
                        <ul className="footer__links">
                            <li><a href="#" className="footer__link">Blog</a></li>
                            <li><a href="#" className="footer__link">Our mision</a></li>
                            <li><a href="#" className="footer__link">Get in touch</a></li>
                        </ul>
                    </div>

                    <div className="footer__content">
                        <h3 className="footer__title">Community</h3>
                        <ul className="footer__links">
                            <li><a href="#" className="footer__link">Support</a></li>
                            <li><a href="#" className="footer__link">Questions</a></li>
                            <li><a href="#" className="footer__link">Customer help</a></li>
                        </ul>
                    </div>

                    <div className="footer__social">
                        <a href="#" className="footer__social-link"><i className='bx bxl-facebook-circle '></i></a>
                        <a href="#" className="footer__social-link"><i className='bx bxl-twitter'></i></a>
                        <a href="#" className="footer__social-link"><i className='bx bxl-instagram-alt'></i></a>
                    </div>
                </div>

                <p className="footer__copy">&#169; MedLink. All right reserved</p>
            </footer>

            {/* =============== SCROLL UP =============== */}
            <a href="#" className="scrollup" id="scroll-up">
                <i className='bx bx-up-arrow-alt scrollup__icon'></i>
            </a>

            <MainJS />
        </>
    )
}

export default LandingPage;