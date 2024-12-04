import React from "react";
import { Col, Container, Form, Nav, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLinkedin,
    faTwitterSquare,
    faYoutube,
    faFacebookSquare,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import PropTypes from "prop-types";
import '../styles/hospitalfooter.css'; // Link to the CSS file for the footer

// Define the sections of the footer
const quickLinks = [
    { value: "Departments", href: "#departments" },
    { value: "Contact Us", href: "#contact" },
    { value: "Privacy Policy", href: "#privacy" },
    { value: "Terms & Conditions", href: "#terms" },
];

const socialMedia = [
    { icon: faFacebookSquare, href: "#!" },
    { icon: faInstagram, href: "#!" },
    { icon: faLinkedin, href: "#!" },
    { icon: faTwitterSquare, href: "#!" },
    { icon: faYoutube, href: "#!" },
];

const departments = [
    { value: "Cardiology", href: "#cardiology" },
    { value: "Neurology", href: "#neurology" },
    { value: "Orthopedics", href: "#orthopedics" },
    { value: "Pediatrics", href: "#pediatrics" },
];

// Components for rendering footer items
const FooterLink = ({ link }) => (
    <li>
        <a href={link.href}>{link.value}</a>
    </li>
);

FooterLink.propTypes = {
    link: PropTypes.object.isRequired,
};

const SocialIcon = ({ social }) => (
    <li>
        <a href={social.href}>
            <FontAwesomeIcon icon={social.icon} />
        </a>
    </li>
);

SocialIcon.propTypes = {
    social: PropTypes.object.isRequired,
};

const HospitalFooter = () => {
    return (
        <footer className="hospital-footer">
            <Container>
                <Row>
                    <Col sm={6} lg={3} className="footer-column">
                        <h5>Quick Links</h5>
                        <Nav className="footer-nav">
                            {quickLinks.map((link, index) => (
                                <FooterLink link={link} key={index} />
                            ))}
                        </Nav>
                    </Col>
                    <Col sm={6} lg={3} className="footer-column">
                        <h5>Departments</h5>
                        <Nav className="footer-nav">
                            {departments.map((dept, index) => (
                                <FooterLink link={dept} key={index} />
                            ))}
                        </Nav>
                    </Col>
                    <Col sm={6} lg={3} className="footer-column">
                        <h5>Follow Us</h5>
                        <Nav className="social-icons">
                            {socialMedia.map((social, index) => (
                                <SocialIcon social={social} key={index} />
                            ))}
                        </Nav>
                    </Col>
                    <Col sm={6} lg={3} className="footer-column">
                        <h5>Get in Touch</h5>
                        <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            className="footer-email"
                        />
                        <button className="footer-submit">Subscribe</button>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center mt-4">
                        <span className="footer-copyright">
                            © 2024 Hospital Name. All Rights Reserved.
                        </span>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default HospitalFooter;
