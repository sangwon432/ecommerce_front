import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Button, Container} from "react-bootstrap";

const ProductDetail = () => {

    const params = useParams();
    const navigate = useNavigate()

    // 데이터 담을 그릇 생성
    const [product, setProduct] = useState({})

    // 데이터 가져오는 함수
    const getProduct = async () => {
        try {
            const {data, status} = await axios.get(`http://localhost:8000/api/product/${params.id}`)
            setProduct(data.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getProduct()
    }, []);

    return (
        <Container>
            <Button variant="secondary" onClick={() => navigate(-1)}>Back</Button>{' '}
            <br />
            <h1>{product.name}</h1>
            <h3>{product.desc}</h3>
        </Container>
    );
};

export default ProductDetail;