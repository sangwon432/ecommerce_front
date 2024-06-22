import React, { useState } from 'react';
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import axios from 'axios';
import {useCookies} from "react-cookie";

const EducationCreate = () => {

    const [cookies, setCookies] = useCookies(["Authentication"])

    const [highschoolName, setHighschoolName] = useState("");
    const [universityName, setUniversityName] = useState("");
    const [fieldOfStudy, setFieldOfStudy] = useState([]);
    const [educationLevel, setEducationLevel] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userInput = {
            highschoolName,
            universityName,
            fieldOfStudy,
            educationLevel
        };

        const config = {
            headers: {
                Authorization: "Bearer " + cookies.Authentication
            }
        }

        try {
            const {data, status} = await axios.post('http://localhost:8000/api/education', userInput, config);
            console.log(data);
            console.log(status)
            if (status === 201) {
                console.alert("education create success")
            }
        } catch (error) {
            console.log(error.message)
        }
    };

    return (
        <Container className={"mt-5"}>
            <Row className="mb-3">
                <Col>
                    <Form onSubmit={handleSubmit}>

                        <Form.Group className="mb-3">
                            <Form.Label>High School Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={highschoolName}
                                onChange={(e) => setHighschoolName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>University Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={universityName}
                                onChange={(e) => setUniversityName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Field(s) of Study</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter field of study"
                                value={fieldOfStudy}
                                onChange={(e) => setFieldOfStudy(e.target.value.split(','))}
                            />
                            <Form.Text className="text-muted">
                                Separate multiple fields with commas (e.g., "Computer Science, Mathematics")
                            </Form.Text>
                        </Form.Group>

                        <Form.Group as={Col} md="4">
                            <Form.Label>Education Level</Form.Label>
                            <Form.Select
                                value={educationLevel}
                                onChange={(e) => setEducationLevel(e.target.value)}
                            >
                                <option>Select Education Level</option>
                                <option value="1">High School</option>
                                <option value="2">College Drop Out</option>
                                <option value="3">Associate's Degree</option>
                                <option value="4">University Drop Out</option>
                                <option value="5">Bachelor's Degree</option>
                                <option value="6">Course Completion of Master's Program</option>
                                <option value="7">Master's Degree</option>
                                <option value="8">PhD</option>
                                <option value="9">PhD ABD</option>
                            </Form.Select>
                        </Form.Group>

                        <Button variant="primary" type="submit" className={"mt-2"}>
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default EducationCreate;