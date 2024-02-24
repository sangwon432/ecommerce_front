import React, {useState} from 'react';
import axios from "axios";

const App = () => {

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

    return (

        <div>
            <button onClick={() => getProducts()}>제품 데이터 가져오기</button>
            <br/>
            {products?.map(product => (
                <div>
                    <h1>{product.name}</h1>
                    <h3>{product.desc}</h3>
                    <h2>price: ${product.price}</h2>
                </div>

            ))}
        </div>
    );
};

export default App;