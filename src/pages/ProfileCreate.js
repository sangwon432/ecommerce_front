import React, {useState} from 'react';
import {Button, Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const ProfileCreate = () => {

    const navigate = useNavigate()

    const [cookies, setCookies] = useCookies(["Authentication"])

    const [gender, setGender] = useState(0)
    const [birth, setBirth] = useState(new Date())
    const [religion, setReligion] = useState(0)
    const [homeAddress, setHomeAddress] = useState("")
    const [bloodType, setBloodType] = useState(0)
    const [MBTI, setMBTI] = useState("")
    const [isMarried, setIsMarried] = useState(false)
    const [haveChildren, setHaveChildren] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault()

        const formattedBirth = birth.toISOString().split('T')[0];

        const userInput = {
            gender,
            birth: formattedBirth,
            religion,
            homeAddress,
            bloodType,
            mbti: MBTI,
            isMarried,
            hasChildren: haveChildren
        }


        const config = {
            headers: {
                Authorization: "Bearer " + cookies.Authentication
            }
        }

        try {
            const {data, status} = await axios.post("http://localhost:8000/api/profile", userInput, config)
            console.log(status)
            if (status === 201) {
                alert("profile create success")
                navigate("/self-introduction/create")
            }

        } catch (err) {
            console.log(err.message)
        }

        console.log(userInput)

    }

    return (
        <Container className={"mt-5"}>
            <Row>
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                            <Form.Label>Gender</Form.Label>
                            <Form.Select value={gender} onChange={e=> setGender(e.target.value)} aria-label="Default select example">
                                <option>Gender</option>
                                <option value="1">Man</option>
                                <option value="2">Woman</option>
                                <option value="3">Others</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                            <Form.Label>Birth</Form.Label>
                            <DatePicker
                                selected={birth}
                                onChange={(date) => setBirth(date)}
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                            <Form.Label>Religion</Form.Label>
                            <Form.Select value = {religion} onChange={e => setReligion(e.target.value)} aria-label="Default select example">
                                <option>Religion</option>
                                <option value="1">Protestant</option>
                                <option value="2">Catholic</option>
                                <option value="3">Buddhism</option>
                                <option value="4">Islam</option>
                                <option value="5">Others</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Home Address</Form.Label>
                            <Form.Control value={homeAddress} onChange={e => setHomeAddress(e.target.value)} size="lg" type="text" placeholder="insert your home address" />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label>Blood Type</Form.Label>
                            <Form.Select value={bloodType} onChange={e => setBloodType(e.target.value)} aria-label="Default select example">
                                <option>Select Blood Type</option>
                                <option value="1">A</option>
                                <option value="2">B</option>
                                <option value="3">AB</option>
                                <option value="3">O</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} md="6" controlId="validationCustomUsername">
                            <Form.Label>MBTI</Form.Label>
                            <Form.Select value={MBTI} onChange={e => setMBTI(e.target.value)} aria-label="Default select example">
                                <option>MBTI</option>
                                <option value="INTJ">INTJ</option>
                                <option value="INTP">INTP</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Check
                            value={isMarried}
                            onChange={e => setIsMarried(e.target.value)}
                            required
                            label="Are you Married?"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">

                        <Form.Check
                            value={haveChildren}
                            onChange={e => setHaveChildren(e.target.value)}
                            required
                            label="Do you have children?"
                        />
                    </Form.Group>




                    <Button type="submit">Submit form</Button>
                </Form>
            </Row>
        </Container>
    );
};

export default ProfileCreate;