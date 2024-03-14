import React, {useEffect, useState} from 'react';
import {Button, Container, Form, Row} from "react-bootstrap";
import axios from "axios";

const Signup = () => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPW, setConfirmPW] = useState("")

    const [isEmailValid, setIsEmailValid] = useState(false)
    const [isCodeView, setIsCodeView] = useState(false)

    const [over14, setOver14] = useState(false)
    const [agreeOfTerms, setAgreeOfTerms] = useState(false)
    const [agreeOfPersonalInfo, setAgreeOfPersonalInfo] = useState(false)
    const [agreeOfMarketing, setAgreeOfMarketing] = useState(false)
    const [agreeOfEvent, setAgreeOfEvent] = useState(false)

    console.log(isCodeView)

    // useEffect(() => {
    //     const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    //     setIsEmailValid(emailRegex.test(email))
    // }, [email]);
    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(emailRegex.test(email))
    }, [email]);

    const sendEmailCode = async (e) => {
        e.preventDefault()

        try {
            const {status} = await axios.post("http://localhost:8000/api/auth/email/send", {email})
            if (status === 200) {
                setIsCodeView(true)
            }

        } catch (err) {
            console.log(err)
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        const userInput = {
            username, email, password
        }

        if (password !== confirmPW) {
            alert("password do not match")
            return;
        }

        if (over14 === false || agreeOfTerms === false || agreeOfPersonalInfo === false) {
            alert("please check agree")
            return
        }



        try {
            const {data, status} = await axios.post("http://localhost:8000/api/auth/signup", userInput)

            if (status === 201) {
                alert("signup success")
            }
        } catch (err) {
            console.log(err.message)
        }


    }



    return (
        <Container className={"mt-5"}>
            <h1>Signup Page</h1>
            <Row>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3">
                        <Form.Label>username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e)=> setUsername(e.target.value)}
                        />
                        <Form.Text className="text-muted">
                            your username is already taken
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email"
                                      placeholder="Enter email"
                                      value={email}
                                      onChange={(e)=> setEmail(e.target.value)}
                                      isValid={isEmailValid}
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <div className="d-grid gap-2 mb-3">
                        <Button variant="primary" size="lg" disabled={!isEmailValid} onClick={sendEmailCode}>
                            이메일 인증하기
                        </Button>
                    </div>

                    {isCodeView ? (
                        <div className={"mb-5"}>
                            <Form.Group className="mb-3">
                                <Form.Label>code</Form.Label>
                                <Form.Control type="text"
                                              placeholder="code"/>
                            </Form.Group>
                            <div className="d-grid gap-2 mb-3">
                                <Button variant="primary" size="lg" disabled={!isEmailValid} onClick={sendEmailCode}>
                                    코드 인증하기
                                </Button>
                            </div>
                        </div>

                    ) : null}

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"
                                      placeholder="Password"
                                      value={password}
                                      onChange={(e)=> setPassword(e.target.value)}/>
                        <Form.Text className={"text-muted"}>
                            Your password must be comprised of at least 8 characters long and include a number...
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-5">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={confirmPW}
                            onChange={(e)=> setConfirmPW(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-5">
                        <Form.Check type="checkbox"
                                    label="만 14세 이상입니다(필수)"
                                    className={"mb-3"}
                                    value={over14}
                                    onChange={(e)=> setOver14(e.target.value)}
                        />
                        <Form.Check
                            type="checkbox"
                            label="이용약관(필수)"
                            className={"mb-3"}
                            value={agreeOfTerms}
                            onChange={(e)=> setAgreeOfTerms(e.target.value)}
                        />
                        <Form.Check
                            type="checkbox"
                            label="개인정보수집 및 이용동의(필수)"
                            className={"mb-3"}
                            value={agreeOfPersonalInfo}
                            onChange={(e)=> setAgreeOfPersonalInfo(e.target.value)}
                        />
                        <Form.Check
                            type="checkbox"
                            label="개인정보 마케팅 활용 동의(선택)"
                            className={"mb-3"}
                            value={agreeOfMarketing}
                            onChange={(e)=> setAgreeOfMarketing(e.target.value)}
                        />
                        <Form.Check
                            type="checkbox"
                            label="이벤트, 쿠폰, 특가 알림 메일 및 SMS 등 수신(선택)"
                            className={"mb-3"}
                            value={agreeOfEvent}
                            onChange={(e)=> setAgreeOfEvent(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>

            </Row>
        </Container>
    );
};

export default Signup;