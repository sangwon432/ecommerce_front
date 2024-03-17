import React, {useState} from 'react';
import {Button, Container, Form, Row} from "react-bootstrap";
import axios from "axios";

const ForgotPw = () => {

    const [email, setEmail] = useState("")
    const [isEmailSent, setIsEmailSent] = useState(false)

    const submitHandler = async (e) => {
        e.preventDefault()
        const userInput = {
            email
        }

        try {
            console.log(userInput)
            const {status} = await axios.post("http://localhost:8000/api/auth/forgot/password", userInput)
            if (status === 200) {
                setIsEmailSent(true)
                alert("success")
            }

        } catch (err) {
            alert("email wasn't sent. please check your email")
            console.log(err.message)
        }
    }
    return (
        <Container className={"mt-5"}>
            <h1>Forgot Password</h1>
            <Row>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={submitHandler}>
                        Submit
                    </Button>
                </Form>
                {isEmailSent ? (
                    <div className={"mb-5"}>
                        Please check your inbox.
                    </div>
                ) : null}
            </Row>
        </Container>
    );
};

export default ForgotPw;