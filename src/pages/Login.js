import React, {useState} from 'react';
import {Button, Container, Form, Row} from "react-bootstrap";
import axios from "axios";

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const submitHandler = async (e) => {
        e.preventDefault()
        const userInput = {
            email, password
        }

        try {
            const {data, status} = await axios.post("http://localhost:8000/api/auth/login", userInput)
            console.log("++++++++", status)
            if (status === 200) {

                alert("login success")
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
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>


            </Row>
        </Container>
    );
};

export default Login;