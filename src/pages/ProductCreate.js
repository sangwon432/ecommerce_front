import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ProductCreate = () => {

    const params = useParams();
    const navigate = useNavigate();
    // name, desc, price, category, img, company

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [img, setImg] = useState("");
    const [company, setCompany] = useState("");
    const [desc, setDesc] = useState("");
    const [onSale, setOnSale] = useState(false);

    const getProductInfo = async () => {
        try {
            const { data, status } = await axios.get(`http://localhost:8000/api/product/${params.id}`);
            console.log("#############", data.data.onSale);

            if (status === 200) {
                setName(data.data.name);
                setDesc(data.data.desc);
                setPrice(data.data.price);
                setCompany(data.data.company);
                setCategory(data.data.category);
                setImg(data.data.img);
                setOnSale(data.data.onSale);
            }

        } catch (err) {
            console.log(err.message);
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log("create");

        const userInput = {
            name, price, category, img, company, desc
        };

        try {
            const { data, status } = await axios.post("http://localhost:8000/api/product/create", userInput);
            console.log("++++++++++++++++++++", data);

            if (status === 201) {
                navigate(-1);
            }

        } catch (err) {
            console.log(err.message);
        }
    }

    const updateProduct = async (e) => {
        e.preventDefault();
        console.log("update");
        const userInput = {
            name, price, category, img, company, desc
        };

        try {
            const { data, status } = await axios.patch(`http://localhost:8000/api/product/${params.id}`, userInput);
            console.log("++++++++++++++++++++", data);

            if (status === 200) {
                navigate(-1);
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    const deleteProduct = async (e) => {
        e.preventDefault();
        const { data, status } = await axios.delete(`http://localhost:8000/api/product/${params.id}`);

        if (status === 200) {
            navigate(-1);
        }
    }

    useEffect(() => {
        getProductInfo();
    }, []);

    return (
        <Container className={"mt-5"}>

            <Button variant="primary" onClick={() => navigate(-1)}>
                Back
            </Button>

            <Row className={"mt-4"}>
                {/* if there is id, updateProduct, submit otherwise */}
                <Form className={"mt-4"} onSubmit={params.id ? updateProduct : submitHandler}>

                    <Form.Group className="mb-3">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            size="lg"
                            type="text"
                            placeholder="Product Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            size="lg"
                            type="number"
                            placeholder="0"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                            size={"lg"}
                            aria-label="Default select example"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option>Open this select category</option>
                            <option value="Mobile">Mobile</option>
                            <option value="Laptop">Laptop</option>
                            <option value="Tablet">Tablet</option>
                            <option value="Game">Game</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Product Image</Form.Label>
                        <Form.Control
                            size="lg"
                            type="text"
                            placeholder="Image"
                            value={img}
                            onChange={(e) => setImg(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Company</Form.Label>
                        <Form.Control
                            size="lg"
                            type="text"
                            placeholder="Company"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Product Description</Form.Label>
                        <Form.Control
                            size="lg"
                            as="textarea"
                            rows={3}
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </Form.Group>

                    {params.id ? (
                        <Form.Group className={"mb-3"}>
                            <Form.Check
                                label={`On Sale`}
                                type={"checkbox"}
                                checked={onSale}
                                onChange={e => setOnSale(!onSale)}
                            />
                        </Form.Group>
                    ) : null}

                    {params.id ? (
                        <>
                            <Button variant="primary" size="lg" type="submit">
                                Update
                            </Button>{' '}
                            <Button variant="secondary" size="lg" onClick={deleteProduct}>
                                Delete
                            </Button>
                        </>
                    ) : (
                        <Button variant="primary" size="lg" type="submit">
                            Create
                        </Button>
                    )}
                </Form>
            </Row>
        </Container>
    );
};

export default ProductCreate;
