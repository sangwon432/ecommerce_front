import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

const ProductList = () => {

    const [products, setProducts] = useState([])

    const getProducts = async () => {
        try{
            const {data, status} = await axios.get('http://localhost:8000/api/product/all')
            console.log('+++++++++++++++++++++++++++++++', data.data.data)
            setProducts(data.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    // function getProductList() {}


    // hook
    useEffect(() => {
        getProducts()
    }, []);

    return (

        <Container className={"mt-5"}>
            <Link to={'/create'}>
                <Button variant="secondary">New Product</Button>{' '}
            </Link>
            <Row>
                {products?.map(product => (
                    // <div>
                    //     <h1>{product.name}</h1>
                    //     <h3>{product.desc}</h3>
                    //     <h2>price: ${product.price}</h2>
                    // </div>
                    <Col className={"mt-3"}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" style={{height: '150px'}} src={product.img} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>
                                    {product.desc.slice(0,80)}
                                </Card.Text>
                                <Card.Text>
                                    price: ${product.price}
                                </Card.Text>
                                <Link to={`/${product.id}`}>
                                    <Button variant="primary">Detail Info</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>

                ))}
            </Row>
        </Container>
    );
};

export default ProductList;