import React from 'react';
import {Button, Container, Form, Row} from "react-bootstrap";

const ProductCreate = () => {
    // name, desc, price, category, img, company
    return (
        <Container className={"mt-5"}>
            <Row>
                <Form className={"mt-4"}>
                    <Form.Group className="mb-3">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control size="lg" type="text" placeholder="Product Name" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control size="lg" type="number" placeholder="0" />
                    </Form.Group>

                    {/*<Form.Group className="mb-3">*/}
                    {/*    <Form.Label>Category</Form.Label>*/}
                    {/*    <Form.Control size="lg" type="text" placeholder="Category" />*/}
                    {/*</Form.Group>*/}
                    <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Select size={"lg"} aria-label="Default select example">
                            <option>Open this select category</option>
                            <option value="Mobile">Mobile</option>
                            <option value="Laptop">Laptop</option>
                            <option value="Tablet">Tablet</option>
                            <option value="Game">Game</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Product Image</Form.Label>
                        <Form.Control size="lg" type="text" placeholder="Image" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Company</Form.Label>
                        <Form.Control size="lg" type="text" placeholder="Company" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Product Description</Form.Label>
                        <Form.Control size="lg" as="textarea" rows={3} />
                    </Form.Group>

                    <Button variant="primary" size="lg">
                        Submit
                    </Button>

                </Form>


            </Row>
        </Container>
    );
};

export default ProductCreate;