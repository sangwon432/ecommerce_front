import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isVerificationEmailSent, setIsVerificationEmailSent] = useState(false);

    const [isEmailValid, setIsEmailValid] = useState(false);
    const [showCodeInput, setShowCodeInput] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");

    const [isOver14, setIsOver14] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [agreeToPersonalInfo, setAgreeToPersonalInfo] = useState(false);
    const [agreeToMarketing, setAgreeToMarketing] = useState(false);
    const [agreeToEvents, setAgreeToEvents] = useState(false);

    const [isEmailVerified, setIsEmailVerified] = useState(false);

    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(emailRegex.test(email));
    }, [email]);

    const sendVerificationEmail = async (e) => {
        e.preventDefault();

        try {
            const { status } = await axios.post("http://localhost:8000/api/auth/email/send", { email });
            if (status === 200) {
                setShowCodeInput(true);
                setIsVerificationEmailSent(true);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const verifyEmail = async (e) => {
        e.preventDefault();
        const userInput = { email, code: verificationCode };

        try {
            const { status } = await axios.post("http://localhost:8000/api/auth/email/check", userInput);
            if (status === 201) {
                setShowCodeInput(false);
                setIsEmailVerified(true);
                alert("Email verification successful");
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const userInput = {
            username,
            email,
            password,
            terms: {
                isOver14,
                agreeToTerms,
                agreeToPersonalInfo,
                agreeToMarketing,
                agreeToEvents
            }
        };

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        if (!isOver14 || !agreeToTerms || !agreeToPersonalInfo) {
            alert("Please agree to the required terms");
            return;
        }

        try {
            const { status } = await axios.post("http://localhost:8000/api/auth/signup", userInput);
            if (status === 201) {
                alert("Signup successful");
                navigate("/login");
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    const handleCheckAllTerms = () => {
        const newValue = !agreeToTerms;
        setAgreeToTerms(newValue);
        setAgreeToPersonalInfo(newValue);
        setAgreeToMarketing(newValue);
        setAgreeToEvents(newValue);
        setIsOver14(newValue);
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
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            isValid={isEmailValid}
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <div className="d-grid gap-2 mb-3">
                        <Button variant="primary" size="lg" disabled={!isEmailValid || isVerificationEmailSent} onClick={sendVerificationEmail}>
                            Send Verification Code
                        </Button>
                    </div>

                    {showCodeInput && (
                        <div className="mb-5">
                            <Form.Group className="mb-3">
                                <Form.Label>Verification Code</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter verification code"
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                />
                            </Form.Group>
                            <div className="d-grid gap-2 mb-3">
                                <Button variant="primary" size="lg" disabled={!isEmailValid} onClick={verifyEmail}>
                                    Verify Code
                                </Button>
                            </div>
                        </div>
                    )}

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Form.Text className="text-muted">
                            Your password must be at least 8 characters long and contain at least one special character.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-5">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Check
                            type="checkbox"
                            label="Agree to all terms"
                            className="mb-3"
                            onChange={handleCheckAllTerms}
                            checked={agreeToTerms && agreeToPersonalInfo && agreeToMarketing && agreeToEvents && isOver14}
                        />

                        <Form.Check
                            type="checkbox"
                            label="I am over 14 years old. (Required)"
                            className="mb-3"
                            checked={isOver14}
                            onChange={() => setIsOver14(!isOver14)}
                        />
                        <Form.Check
                            type="checkbox"
                            label="I agree to the Terms of Service. (Required)"
                            className="mb-3"
                            checked={agreeToTerms}
                            onChange={() => setAgreeToTerms(!agreeToTerms)}
                        />
                        <Form.Check
                            type="checkbox"
                            label="I consent to the collection and use of my personal information. (Required)"
                            className="mb-3"
                            checked={agreeToPersonalInfo}
                            onChange={() => setAgreeToPersonalInfo(!agreeToPersonalInfo)}
                        />
                        <Form.Check
                            type="checkbox"
                            label="I agree to receive marketing communications. (Optional)"
                            className="mb-3"
                            checked={agreeToMarketing}
                            onChange={() => setAgreeToMarketing(!agreeToMarketing)}
                        />
                        <Form.Check
                            type="checkbox"
                            label="I agree to receive promotional emails and social media messages. (Optional)"
                            className="mb-3"
                            checked={agreeToEvents}
                            onChange={() => setAgreeToEvents(!agreeToEvents)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" disabled={!isEmailVerified}>
                        Sign Up
                    </Button>
                    {' '}
                    <Button variant="secondary" onClick={() => navigate("/login")}>
                        Log In
                    </Button>
                </Form>
            </Row>
        </Container>
    );
};

export default Signup;
