import React, {useEffect, useRef, useState} from 'react';
import axios, {create} from "axios";
import {Button, Modal, Card, CardBody, Col, Container, Form, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";

const Profile = () => {
    const navigate = useNavigate()

    const [cookies, setCookies] = useCookies(["Authentication"])
    console.log("Bearer " + cookies.Authentication);

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [profileImg, setProfileImg] = useState("")
    const [createdAt, setCreatedAt] = useState("")
    const [show, setShow] = useState(false)


    // const queryParams = new URLSearchParams(location.search)
    // const token = queryParams.get("token")

    const [file, setFile] = useState()

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)


    const getProfile = async () => {
        try {
            console.log("get profile called")


             // const token = await localStorage.getItem("accessToken")
            // store tokens in cookies, temporary data in local storage



            const config = {
                headers: {
                    Authorization: `Bearer ${cookies.Authentication}`
                }
            };

            const {data, status} = await axios.get("http://localhost:8000/api/auth", config)
            console.log("status: ", status)

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

    const confirmDeletion = async (e) => {
        e.preventDefault()
        try {
            console.log("CD called")
            const token = await localStorage.getItem("accessToken")
            console.log("token:", token)

            const config = {
                headers: {
                    Authorization: "Bearer " + token
                }
            }

            console.log("config: ", config )

            const {data, status} = await axios.post("http://localhost:8000/api/user/delete", {}, config)
            console.log(status)
            if (status === 201) {
                console.log("###################", data.data)
                navigate("/login")
            }
        } catch (err) {
            console.log("error message:", err.message)
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
                            onChange={(e) => setEmail(e.target.value)}
                            disabled
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter email"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Button>
                        Edit Profile
                    </Button>
                    <>  </>
                    <Button variant="secondary" onClick={handleShow}> Delete Account</Button>
                </Form>

                }
            </Row>

            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete your account? If you do not access it for 30 days, it will be permanently deleted. </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={confirmDeletion}>
                            Delete Account
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>

        </Container>




    );
};

export default Profile;