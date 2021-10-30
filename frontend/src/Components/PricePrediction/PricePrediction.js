import React from 'react'
import "./PricePrediction.css"
import { Form, Col, Row, Button } from 'react-bootstrap';

function PricePrediction() {
    return (
        <div className="PricePrediction">
            <Form>
                <Row className="mb-3 mt-3">
                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Crop Name</Form.Label>
                    <Form.Select defaultValue="moong" required>
                        <option>moong</option>
                        <option>rice</option>
                        <option>wheat</option>
                        <option>bajra</option>
                        <option>jowar</option>
                        <option>maize</option>
                        <option>urad</option>
                    </Form.Select>
                    </Form.Group>
                    
                    <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Weight</Form.Label>
                    <Form.Control type="number" placeholder="in Kg" required/>
                    </Form.Group>
                </Row>

                <Row className="mb-3 mt-3">
                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Month</Form.Label>
                    <Form.Select defaultValue="january" required>
                    <option>january</option>
                    <option>february</option>
                    <option>march</option>
                    <option>april</option>
                    <option>may</option>
                    <option>june</option>
                    <option>july</option>
                    <option>august</option>
                    <option>september</option>
                    <option>october</option>
                    <option>november</option>
                    <option>december</option>

                    </Form.Select>
                    </Form.Group>


                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Year</Form.Label>
                    <Form.Select defaultValue="2021" required>
                    <option>2021</option>
                    <option>2020</option>
                    <option>2019</option>
                    </Form.Select>
                    </Form.Group>

                </Row>


                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default PricePrediction
