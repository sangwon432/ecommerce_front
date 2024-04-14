import React, {useState} from 'react';
import {Button, Container, Form, Row} from "react-bootstrap";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Login = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const submitHandler = async (e) => {
        e.preventDefault()
        const userInput = {
            email, password
        }

        try {
            const {data, status} = await axios.post("http://localhost:8000/api/auth/login", userInput, {baseURL: "http:localhost:8000/auth/login", withCredentials: true})
            if (status === 200) {


                // localStorage.setItem("accessToken", data.data.accessToken)
                // accessToken이라는 키값 생성후 value는 accessToken을 store
                navigate("/profile")
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <Container className={"mt-5"}>
            <h1>Login Page</h1>
            <Row>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>

                    <>
                        <Button variant="primary" size="lg" type="submit">
                            Log In
                        </Button>
                        {" "}
                        <Button variant="secondary" size="lg" active onClick={() => navigate("/forgot/password")}>
                            Forgot Password
                        </Button>
                    </>
                </Form>
            </Row>
        </Container>
    );
};

export default Login;