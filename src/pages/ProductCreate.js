import React, {useEffect, useState} from 'react';
import {Button, Container, Form, Row} from "react-bootstrap";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

const ProductCreate = () => {

    const params = useParams();
    const navigate = useNavigate()
    // name, desc, price, category, img, company

    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [category, setCategory] = useState("")
    const [img, setImg] = useState("")
    const [company, setCompany] = useState("")
    const [desc, setDesc] = useState("")
    const [isSales, setIsSales] = useState()

    const getProductInfo = async () => {
        try {

            const {data, status} = await axios.get(`http://localhost:8000/api/product/${params.id}`)
            console.log("#############", data.data.isSales)

            if (status === 200) {
                setName(data.data.name)
                setDesc(data.data.desc)
                setPrice(data.data.price)
                setCompany(data.data.company)
                setCategory(data.data.category)
                setImg(data.data.img)
                setIsSales(data.data.isSales)
            }

        } catch (err) {
            console.log(err.message)
        }

    }

    const submitHandler = async (e) => {
        e.preventDefault()
        console.log("create")

        // 유저가 서버에 전달해 줄 데이터 (body)
        const userInput = {
            name, price, category, img, company, desc
        }
        // console.log(typeof Number(price))

        try {
            const {data, status} = await axios.post("http://localhost:8000/api/product/create", userInput)
            console.log("++++++++++++++++++++", data)

            if (status === 201){
                navigate(-1)

            }


        } catch (err) {
            console.log(err.message)
        }

    }


    const updateProduct = async (e) => {
        e.preventDefault()
        console.log("update")
        const userInput = {
            name, price, category, img, company, desc
        }
        //console.log(isSales)
        try {
            const {data, status} = await axios.patch(`http://localhost:8000/api/product/${params.id}`, userInput)
            console.log("++++++++++++++++++++", data)

            if (status === 200){
                navigate(-1)
            }
        } catch (err) {
            console.log(err.message)
        }


    }


    const deleteProduct = async (e) => {
        e.preventDefault()
        const {data, status} = await axios.delete(`http://localhost:8000/api/product/${params.id}`)

        if (status === 200){
            navigate(-1)
        }

    }

    useEffect(() => {
        getProductInfo()
    }, []);

    return (
        <Container className={"mt-5"}>

            <Button variant="primary" onClick={() => navigate(-1)}>
                Back
            </Button>

            <Row className={"mt-4"}>
                {/*id가 있으면 updateproduct, 없으면 섭밋*/}
                <Form className={"mt-4"}>

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

                    {/*<Form.Group className="mb-3">*/}
                    {/*    <Form.Label>Category</Form.Label>*/}
                    {/*    <Form.Control size="lg" type="text" placeholder="Category" />*/}
                    {/*</Form.Group>*/}
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
                                label={`isSales`}
                                type={"checkbox"}
                                value={isSales}
                                onChange={e => setIsSales(!isSales)}
                            />
                        </Form.Group>

                    ) : null}




                    {/*<Button variant="primary" size="lg" type={"submit"}>*/}
                    {/*    {params.id ? "Delete Product" : null}*/}
                    {/*</Button>*/}

                    {/*{params.id ? <Button onClick={deleteProduct} variant="secondary" size="md" type={"submit"}>*/}
                    {/*        Delete Product*/}
                    {/*    </Button>*/}
                    {/*    : null}*/}

                    {params.id ? (
                        <>
                            <Button variant="primary" size="lg" onClick={updateProduct}>
                                Update
                            </Button>{' '}
                            <Button variant="secondary" size="lg" onClick={deleteProduct}>
                                Delete
                            </Button>
                        </>
                    ) : (
                        <Button variant="primary" size="lg" type={"submit"}>
                            Create
                        </Button>
                    )}
                </Form>


            </Row>
        </Container>
    );
};

export default ProductCreate;