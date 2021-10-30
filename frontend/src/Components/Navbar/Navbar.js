import React from 'react'
import "./Navbar.css"
import {Navbar} from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
function Navbars() {
    return (
        <div className="Navbars">
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#">Farmer Helper</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="#action1">Weather Prediction</Nav.Link>
                        {/* connected to middleware */}
                        <Nav.Link href="#action2">Market Prices</Nav.Link>
                        <Nav.Link href="#action3">Login</Nav.Link>
                        {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
                        <NavDropdown.Item href="#action4">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action5">Another action</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action6">
                            Something else here
                        </NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                    <Form className="d-flex">
                        <FormControl
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                    </Navbar.Collapse>
                </Container>
                </Navbar>
             
        </div>
    )
}

export default Navbars;