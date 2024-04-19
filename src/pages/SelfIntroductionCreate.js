import React, {useEffect, useState} from 'react';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import { useCookies } from "react-cookie";
import {useNavigate} from "react-router-dom";

const SelfIntroductionCreate = () => {

    const navigate = useNavigate()

    const [cookies, setCookies] = useCookies(["Authentication"]);

    const [personality, setPersonality] = useState("");
    const [interests, setInterests] = useState("");
    const [socialMediaLinks, setSocialMediaLinks] = useState("");

    const [selfIntroductionAlreadyExists, setSelfIntroductionAlreadyExists] = useState(false)

    const getSelfIntroductionInfo = async () => {
        try {
            console.log("getSelfIntroductionInfo called")

            const config = {
                headers: {
                    Authorization: `Bearer ${cookies.Authentication}`
                }
            }

            const {data, status} = await axios.get("http://localhost:8000/api/self-introduction", config)
            console.log(data)
            console.log("status: ", status)

            if (status === 200) {
                console.log("#############", data.data)
                if (data.data === null) {
                    setSelfIntroductionAlreadyExists(false)
                    console.log("already exists", selfIntroductionAlreadyExists)
                }
                else {
                    setSelfIntroductionAlreadyExists(true)
                    console.log("already exists", selfIntroductionAlreadyExists)
                }

                setPersonality(data.data.personality)
                setInterests(data.data.interests)
                setSocialMediaLinks(data.data.socialMediaLinks)
            }


        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        getSelfIntroductionInfo()
    }, []);




    const handleSubmit = async (e) => {
        e.preventDefault();

        const userInput = {
            personality,
            interests,
            socialMediaLinks
        };

        const config = {
            headers: {
                Authorization: `Bearer ${cookies.Authentication}`
            }
        };

        try {
            const {data, status} = await axios.post('http://localhost:8000/api/self-introduction', userInput, config);

            if (status === 201) {
                alert("self introduction create success")
                navigate("/login")
            }
        } catch (error) {
            console.log('Error submitting form:', error.response ? error.response.data : error.message);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault()

        const userInput = {
            personality,
            interests,
            socialMediaLinks
        }

        const config = {
            headers: {
                Authorization: `Bearer ${cookies.Authentication}`
            }
        };

        try {
            const {data, status} = await axios.put("http://localhost:8000/api/self-introduction", userInput, config)

            if (status === 200) {
                alert("self introduction update success")
                navigate("/login")
            }


        } catch (err) {
            console.log(err.message)

        }
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Form>
                        <Form.Group className="mt-5">
                            <Form.Label>Personality</Form.Label>
                            <Form.Control
                                type="text"
                                value={personality}
                                onChange={(e) => setPersonality(e.target.value)}
                                as="textarea"
                                rows={3}
                            />
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>Interests</Form.Label>
                            <Form.Control
                                type="text"
                                value={interests}
                                onChange={(e) => setInterests(e.target.value)}
                                as="textarea"
                                rows={3}
                            />
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>Social Media</Form.Label>
                            <Form.Control
                                type="text"
                                value={socialMediaLinks}
                                onChange={(e) => setSocialMediaLinks(e.target.value)}
                                as="textarea"
                                rows={3}
                            />
                        </Form.Group>

                        {/*{!selfIntroductionAlreadyExists ? (*/}
                        {/*    <div> <Button type="submit" onClick={handleSubmit}> Create Self Introduction</Button></div>*/}
                        {/*) : <div> <Button type="submit" onClick={handleUpdate}> Update Self Introduction</Button></div>}*/}
                        <div>
                            <Button type="submit" onClick={!selfIntroductionAlreadyExists ? handleSubmit : handleUpdate}>
                                {!selfIntroductionAlreadyExists ? "Create Self Introduction" : "Update Self Introduction"}
                            </Button>
                        </div>

                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default SelfIntroductionCreate;