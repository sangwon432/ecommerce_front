import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Card, Col, Container, Row} from "react-bootstrap";

const ProductList = () => {

    // 데이터를 담을 그릇을 만든다.
    const [products, setProducts] = useState([])

    // 2. axios를 설치한 후에 실행할 함수를 만든다
    // 외부 api 사용시 async
    const getProducts = async () => {
        try{
            const {data, status} = await axios.get('http://localhost:8000/api/product/all')
            setProducts(data.data)
        } catch (err) {
            console.log(err)
        }
    }

    // function getProductList() {}


    // 무조건 실행이 되는 훅(hook)
    useEffect(() => {
        getProducts()
    }, []);

    return (

        <Container className={"mt-5"}>
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
                                <Button variant="primary">Detail Info</Button>
                            </Card.Body>
                        </Card>
                    </Col>

                ))}
            </Row>
        </Container>
    );
};

export default ProductList;