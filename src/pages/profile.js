import React, {useEffect, useRef, useState} from 'react';
import axios, {create} from "axios";
import {Button, Card, CardBody, Col, Container, Form, Row} from "react-bootstrap";

const Profile = () => {

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [profileImg, setProfileImg] = useState("")
    const [createdAt, setCreatedAt] = useState("")

    const [file, setFile] = useState()


    const getProfile = async () => {
        try {

            const token = await localStorage.getItem("accessToken")

            const config = {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
            const {data, status} = await axios.get("http://localhost:8000/api/auth", config)

            if (status === 200) {
                // success handling
                console.log("##############", data.data)
                setProfileImg(data.data.profileImg)
                setEmail(data.data.email)
                setName(data.data.username)
                setCreatedAt(data.data.createdAt)

            }

        } catch (err) {
            console.log(err.message)
        }


    }

    useEffect(() => {
        getProfile()
    }, []);

    return (
        <Container className={"mt-5"}>
            <h1>Profile</h1>
            <Row>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}
                            disabled
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter email"
                            value={name}
                            onChange={(e)=> setName(e.target.value)}
                        />
                    </Form.Group>
                    <Button>
                        프로필 정보 수정
                    </Button>
                </Form>


            </Row>
        </Container>
    );
};

export default Profile;