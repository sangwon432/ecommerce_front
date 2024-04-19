import React, {useEffect, useState} from 'react';
import {Button, Container, Form, Row} from "react-bootstrap";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Signup = () => {

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPW, setConfirmPW] = useState("")

    const [isVerificationEmailSent, setIsVerificationEmailSent] = useState(false)

    const [isEmailValid, setIsEmailValid] = useState(false)
    const [isCodeView, setIsCodeView] = useState(false)
    const [code, setCode] = useState("")

    const [over14, setOver14] = useState(false)
    const [agreeOfTerms, setAgreeOfTerms] = useState(false)
    const [agreeOfPersonalInfo, setAgreeOfPersonalInfo] = useState(false)
    const [agreeOfMarketing, setAgreeOfMarketing] = useState(false)
    const [agreeOfEvent, setAgreeOfEvent] = useState(false)

    console.log(over14)

    const [isVerified, setIsVerified] = useState(false)

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
                setIsVerificationEmailSent(true)
            }

        } catch (err) {
            console.log(err)
        }
    }

    const verifyEmail = async (e) => {
        e.preventDefault()
        const userInput = {
            email, code
        }


        try {
            console.log(userInput)
            const {status} = await axios.post("http://localhost:8000/api/auth/email/check", userInput)

            if (status === 201) {

                setIsCodeView(false)
                setIsVerified(true)
                alert("email verification success")

            }

        } catch (err) {
            console.log(err.message)
        }
    }



    const submitHandler = async (e) => {
        e.preventDefault()
        const userInput = {
            username, email, password,
            terms: {
                fourteenOver: over14,
                agreeOfTerms,
                personalInfo: agreeOfPersonalInfo,
                marketingAgree: agreeOfMarketing,
                etc: agreeOfEvent
            }
        }

        console.log(userInput)

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
                navigate("/login")
            }
        } catch (err) {
            console.log(err.message)
        }


    }


    // const handleCheckAllTerms = () => {
    //     const newValue = !agreeOfTerms;
    //     setAgreeOfTerms(newValue);
    //     setAgreeOfPersonalInfo(newValue);
    //     setAgreeOfMarketing(newValue);
    //     setAgreeOfEvent(newValue);
    //
    //     console.log("agree of terms" ,agreeOfTerms)
    //     console.log("agree of personal info", agreeOfPersonalInfo)
    //     console.log("agree of marketing", agreeOfMarketing)
    //     console.log("agree of event", agreeOfEvent)
    // };

    const handleCheckAllTerms = () => {
        const newValue = !agreeOfTerms;
        setAgreeOfTerms(newValue);
        setAgreeOfPersonalInfo(newValue);
        setAgreeOfMarketing(newValue);
        setAgreeOfEvent(newValue);
        setOver14(newValue);
    };


    return (
        <Container className={"mt-5"}>
            <h1>Signup Page</h1>
            <Row>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e)=> setUsername(e.target.value)}
                        />
                        {/*<Form.Text className="text-muted">*/}
                        {/*    your username is already taken*/}
                        {/*</Form.Text>*/}
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
                        <Button variant="primary" size="lg" disabled={!isEmailValid || isVerificationEmailSent} onClick={sendEmailCode}>
                            Verify Email
                        </Button>
                    </div>

                    {isCodeView ? (
                        <div className={"mb-5"}>
                            <Form.Group className="mb-3">
                                <Form.Label>code</Form.Label>
                                <Form.Control type="text"
                                              placeholder="code"
                                              value={code}
                                              onChange={(e)=> setCode(e.target.value)}/>
                            </Form.Group>
                            <div className="d-grid gap-2 mb-3">
                                <Button variant="primary" size="lg" disabled={!isEmailValid} onClick={verifyEmail}>
                                    Verify
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
                            Your password must contain at least 8 characters with at least one special character.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-5">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPW}
                            onChange={(e)=> setConfirmPW(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Check
                            type="checkbox"
                            label="Agree to all terms"
                            className={"mb-3"}
                            onChange={handleCheckAllTerms}
                            checked={agreeOfTerms && agreeOfPersonalInfo && agreeOfMarketing && agreeOfEvent && over14}
                        />

                        <Form.Check
                            type="checkbox"
                            label="I am over 14 years old. (Required)"
                            className={"mb-3"}
                            checked={over14}
                            onChange={() => setOver14(!over14)}
                        />
                        <Form.Check
                            type="checkbox"
                            label="I agree to the Terms of Service. (Required)"
                            className={"mb-3"}
                            checked={agreeOfTerms}
                            onChange={() => setAgreeOfTerms(!agreeOfTerms)}
                        />
                        <Form.Check
                            type="checkbox"
                            label="I consent to the collection and use of my personal information. (Required)"
                            className={"mb-3"}
                            checked={agreeOfPersonalInfo}
                            onChange={() => setAgreeOfPersonalInfo(!agreeOfPersonalInfo)}
                        />
                        <Form.Check
                            type="checkbox"
                            label="I agree to the use of my personal information for marketing purposes. (Optional)"
                            className={"mb-3"}
                            checked={agreeOfMarketing}
                            onChange={() => setAgreeOfMarketing(!agreeOfMarketing)}
                        />
                        <Form.Check
                            type="checkbox"
                            label="I would like to receive promotional emails and SMS messages regarding events, coupons, and special offers. (Optional)"
                            className={"mb-3"}
                            checked={agreeOfEvent}
                            onChange={() => setAgreeOfEvent(!agreeOfEvent)}
                        />

                        {/*    <Form.Check*/}
                    {/*        type="checkbox"*/}
                    {/*        label="Agree to all terms"*/}
                    {/*        className={"mb-3"}*/}
                    {/*        onChange={handleCheckAllTerms}*/}
                    {/*        checked={agreeOfTerms && agreeOfPersonalInfo && agreeOfMarketing && agreeOfEvent}*/}
                    {/*    />*/}
                    {/*</Form.Group>*/}

                    {/*<Form.Group className="mb-5">*/}
                    {/*    <Form.Check type="checkbox"*/}
                    {/*                label="I am over 14 years old. (Required)"*/}
                    {/*                className={"mb-3"}*/}
                    {/*                value={over14}*/}
                    {/*                onChange={() => setOver14(!over14)}*/}
                    {/*    />*/}
                    {/*    <Form.Check*/}
                    {/*        type="checkbox"*/}
                    {/*        label="I agree to the Terms of Service. (Required)"*/}
                    {/*        className={"mb-3"}*/}
                    {/*        value={agreeOfTerms}*/}
                    {/*        onChange={()=> setAgreeOfTerms(!agreeOfTerms)}*/}
                    {/*    />*/}
                    {/*    <Form.Check*/}
                    {/*        type="checkbox"*/}
                    {/*        label="I consent to the collection and use of my personal information. (Required)"*/}
                    {/*        className={"mb-3"}*/}
                    {/*        value={agreeOfPersonalInfo}*/}
                    {/*        onChange={()=> setAgreeOfPersonalInfo(!agreeOfPersonalInfo)}*/}
                    {/*    />*/}
                    {/*    <Form.Check*/}
                    {/*        type="checkbox"*/}
                    {/*        label="I agree to the use of my personal information for marketing purposes. (Optional)"*/}
                    {/*        className={"mb-3"}*/}
                    {/*        value={agreeOfMarketing}*/}
                    {/*        onChange={()=> setAgreeOfMarketing(!agreeOfMarketing)}*/}
                    {/*    />*/}
                    {/*    <Form.Check*/}
                    {/*        type="checkbox"*/}
                    {/*        label="I would like to receive promotional emails and SMS messages regarding events, coupons, and special offers. (Optional)"*/}
                    {/*        className={"mb-3"}*/}
                    {/*        value={agreeOfEvent}*/}
                    {/*        onChange={()=> setAgreeOfEvent(!agreeOfEvent)}*/}
                    {/*    />*/}
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={!isVerified}>
                        Submit
                    </Button>
                    <>  </>
                    <Button variant="secondary" onClick={() => navigate("/login")}>
                        Log In
                    </Button>
                </Form>



            </Row>
        </Container>
    );
};

export default Signup;