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
            // 토큰 등 민감 정보는 쿠키, 장바구니와 같은 임시 데이터는 local storage



            const config = {
                headers: {
                    Authorization: `Bearer ${cookies.Authentication}`
                }
            };
            // const config = {
            //     headers: {
            //         Authorization: "Bearer " + cookies.Authentication
            //     }
            // }
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
                        프로필 정보 수정
                    </Button>
                    <>  </>
                    <Button variant="secondary" onClick={handleShow}> 회원 탈퇴</Button>
                </Form>

                {//회원 탈퇴 버튼 만들고 버튼을 눌렀을 때 안내표시가 나와야함. 정말로 삭제를 원하는지를 물어봄.
                    // Ok를 눌렀을 때 회원 탈퇴가 되었다는 표시가 나오고 30일의 유예 기간을 둔다. 중간에라도 재접속 시 회원 탈퇴 취소 가능}
                }
            </Row>

            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>정말로 탈퇴하시겠습니까? 30일간 접속이 없을 시 삭제됩니다. </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={confirmDeletion}>
                            회원 탈퇴
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>

        </Container>




    );
};

export default Profile;