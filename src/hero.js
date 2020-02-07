import React from 'react'
import Facebook from './facebook'
import Instagram from './instagram'

const Navbar = () => (
    <div className='container'>
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="/">
                    <img src="/brand.png" alt='MG Dance Academy' />
                </a>

                <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    <a className="navbar-item">
                        <figure className="image is-64x64">
                            <img src='/classes-icon.png' />
                            <figcaption>Classes</figcaption>
                        </figure>
                    </a>
                    <a className="navbar-item">
                        <figure className="image is-64x64">
                            <img src='/events-icon.png' />
                            <figcaption>Events</figcaption>
                        </figure>
                    </a>
                    <a className="navbar-item">
                        <figure className="image is-64x64">
                            <img src='/contact-icon.png' />
                            <figcaption>Contact</figcaption>
                        </figure>
                    </a>
                    <a className="navbar-item">
                        <figure className="image is-64x64">
                            <img src='/social-icon.png' />
                            <figcaption>Social</figcaption>
                        </figure>
                    </a>
                    <a className="navbar-item">
                        <figure className="image is-64x64">
                            <img src='/policies-icon.png' />
                            <figcaption>Policies</figcaption>
                        </figure>
                    </a>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <a className='social-icon'>
                            <figure className="image is-64x64">
                            <Facebook />
                            </figure>
                        </a>
                        <a className='social-icon'>
                            <figure className="image is-64x64">
                                <Instagram />
                            </figure>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    </div>
)

export default () => (
    <section className="hero">
        <div className="hero-head">
            <Navbar />
        </div>
    </section>
)