import React from 'react';
import {Navbar,Container, Nav} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {connect} from "react-redux";

// actions
import {logout} from "../../store/actions/authActions";


const AdminNavbar = props => {
    // actions
    const {logout} = props;
    // hooks
    const navigate = useNavigate();

    async function logoutUser() {
        try {
            logout();
            navigate('/');
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/admin/dashboard">deInstruct</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/admin/users">Users</Nav.Link>
                        <Nav.Link as={Link} to="/admin/courses">Courses</Nav.Link>
                    </Nav>
                    <Nav className="justify-content-end">
                        <Navbar.Text>
                            <span className='cur:p' onClick={logoutUser}>Logout</span>
                        </Navbar.Text>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

const actions = {
    logout,
}

export default connect(null, actions)(AdminNavbar);