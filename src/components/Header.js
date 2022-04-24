import React from 'react'
import { Navbar, Container, Nav} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './Header.css'
function Header() {
    return (
        <>
            <Navbar bg="primary" variant="light">
                <Container>
                    <NavLink  className={(navData) => (navData.isActive ? 'active' : 'nav-link')} to="/">Home</NavLink>
                    <Nav className="me-auto">
                        <NavLink    className={(navData) => (navData.isActive ? 'active' : 'nav-link')} to="/add-coupon"> Add Coupon</NavLink>
                        <NavLink   className={(navData) => (navData.isActive ? 'active' : 'nav-link')} to="/redeem-coupon">Redeem Coupon</NavLink>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default Header