import React, {useEffect, useState} from 'react';
import axios, {create} from "axios";
import {Card, CardBody, Col, Container, Row} from "react-bootstrap";

const Profile = () => {

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [profileImg, setProfileImg] = useState("")
    const [createdAt, setCreatedAt] = useState("")

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
        <Container fluid>
            <Row>
                <Col xl={"4"}>
                    <Card className={"overflow-hidden"}>
                        <div className={"bg-primary bg-soft"}>
                            <Row>
                                <Col xl={"7"}>
                                    <div className={"text-primary p-3"}>
                                        <h5 className={"text-primary"}>Welcome Back!!!</h5>
                                        <p>블라블라</p>
                                    </div>
                                </Col>
                                {/*<Col xs={"5"} className={"align-self-end"}>*/}
                                {/*    <img src={profileImg} alt={email} className={"img-fluid"}/>*/}

                                {/*</Col>*/}
                            </Row>
                        </div>
                        <CardBody className={"pt-0"}>
                            <Row>
                                <Col sm={"4"}>
                                    <div className={"avatar-md profile-user-wid mb-4"}>
                                        <img
                                            src={profileImg}
                                            alt={email}
                                            className={"img-thumbnail rounded-circle"}
                                        />
                                    </div>
                                    <h5 className={"font-size-15 text-truncate"}>
                                        {name}
                                    </h5>
                                    <p className={"text-muted mb-0 text-truncate"}>
                                        {email}
                                    </p>
                                    <p className={"text-muted mb-0 text-truncate"}>
                                        가입일: {createdAt.slice(0, 10)}
                                    </p>
                                </Col>
                            </Row>
                        </CardBody>

                    </Card>

                </Col>
            </Row>
        </Container>
    );
};

export default Profile;