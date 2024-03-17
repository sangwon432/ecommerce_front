import React, {useEffect, useState} from 'react';
import {Button, Container, Form, Row} from "react-bootstrap";
import axios from "axios";
import {useLocation, useParams, useSearchParams} from "react-router-dom";

const ChangePw = () => {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const token = queryParams.get("token")
    console.log("++++++++++++++++", token)

    const [password, setPassword] = useState("")
    const [confirmPW, setConfirmPW] = useState("")
    const [isPasswordValid, setIsPasswordValid] = useState(false)
    // const [token, setToken] = useState("")


    const submitHandler = async (e)=> {
        e.preventDefault()
        const userInput = {
            token,
            password
        }



        if (!isPasswordValid) {
            alert("password is not valid")
        }

        if (password !== confirmPW) {
            alert("passwords do not match")
        }

        console.log(userInput)

        try {

            const {status} = await axios.post("http://localhost:8000/api/auth/change/password", userInput)
            if (status === 201) {
                alert("Your password has been changed")
            }

        } catch (err) {
            console.log(err.message)
        }


    }


    useEffect(() => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/
        setIsPasswordValid(passwordRegex.test(password))
    }, [password]);

    return (
        <div>
            <Container>
                <Row>
                    <h1>Change Password</h1>
                    <Form onSubmit={submitHandler}>
                        <Form.Group className="mb-3">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder=" New Password"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder=" Confirm Password"
                                value={confirmPW}
                                onChange={(e)=>setConfirmPW(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Row>
            </Container>

        </div>
    );
};

export default ChangePw;