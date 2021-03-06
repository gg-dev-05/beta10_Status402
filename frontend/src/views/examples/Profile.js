/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col } from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader";
import { useState, useEffect } from "react";
import axios from "axios";
import { badNotification, goodNotification } from "../../Common/Notification";
import { BASE_URL } from "Common/Constants";

const Profile = () => {
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");
	const [username, setUsername] = useState("");

	useEffect(async () => {
		const url = BASE_URL + "farmer/details";
		const res = await axios.get(url, {
			headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
		});
		if (res.data.statusCode == 200) {
			setUsername(res.data.result.username);
		}
	}, []);

	const handleChangePassword = async (e) => {
		e.preventDefault();

		console.log(oldPassword);
		console.log(newPassword);
		console.log(confirmNewPassword);

		if (newPassword !== confirmNewPassword) {
			badNotification("New passwords should match");
		} else {
			const url = BASE_URL + "farmer/changePassword";
			const res = await axios.post(
				url,
				{ oldPassword, newPassword },
				{
					headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
				}
			);
			if (res.data.statusCode == 200) {
				goodNotification("Success", "Password changed successfully");
				setOldPassword("");
				setNewPassword("");
				setConfirmNewPassword("");
			} else {
				badNotification("Old password is incorrect");
			}
		}
	};

	return (
		<>
			<UserHeader username={username} />
			{/* Page content */}
			<Container className="mt--7" fluid>
				<Row>
					{/* <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={
                          "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <Button
                    className="mr-4"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Connect
                  </Button>
                  <Button
                    className="float-right"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Message
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">

              </CardBody>
            </Card>
          </Col> */}
					<Col className="order-xl-1" xl="12">
						<Card className="bg-secondary shadow">
							<CardHeader className="bg-white border-0">
								<Row className="align-items-center">
									<Col xs="8">
										<h3 className="mb-0">My account</h3>
									</Col>
								</Row>
							</CardHeader>
							<CardBody>
								{/*<Form>
									<h6 className="heading-small text-muted mb-4">User information</h6>
									<div className="pl-lg-4">
										<Row>
											<Col lg="6">
												<FormGroup>
													<label className="form-control-label" htmlFor="input-username">
														Username
													</label>
													<Input
														className="form-control-alternative"
														id="input-username"
														placeholder="Username"
														type="text"
													/>
												</FormGroup>
											</Col>
											<Col lg="6">
												<FormGroup>
													<label className="form-control-label" htmlFor="input-email">
														Email address
													</label>
													<Input
														className="form-control-alternative"
														id="input-email"
														placeholder="jesse@example.com"
														type="email"
													/>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Col lg="6">
												<FormGroup>
													<label className="form-control-label" htmlFor="input-first-name">
														First name
													</label>
													<Input
														className="form-control-alternative"
														id="input-first-name"
														placeholder="First name"
														type="text"
													/>
												</FormGroup>
											</Col>
											<Col lg="6">
												<FormGroup>
													<label className="form-control-label" htmlFor="input-last-name">
														Last name
													</label>
													<Input
														className="form-control-alternative"
														id="input-last-name"
														placeholder="Last name"
														type="text"
													/>
												</FormGroup>
											</Col>
										</Row>
									</div>
									<hr className="my-4" />
                  
									<h6 className="heading-small text-muted mb-4">Contact information</h6>
									<div className="pl-lg-4">
										<Row>
											<Col md="12">
												<FormGroup>
													<label className="form-control-label" htmlFor="input-address">
														Address
													</label>
													<Input
														className="form-control-alternative"
														id="input-address"
														placeholder="Home Address"
														type="text"
													/>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Col lg="4">
												<FormGroup>
													<label className="form-control-label" htmlFor="input-city">
														City
													</label>
													<Input
														className="form-control-alternative"
														id="input-city"
														placeholder="City"
														type="text"
													/>
												</FormGroup>
											</Col>
											<Col lg="4">
												<FormGroup>
													<label className="form-control-label" htmlFor="input-country">
														Country
													</label>
													<Input
														className="form-control-alternative"
														id="input-country"
														placeholder="Country"
														type="text"
													/>
												</FormGroup>
											</Col>
											<Col lg="4">
												<FormGroup>
													<label className="form-control-label" htmlFor="input-country">
														Postal code
													</label>
													<Input
														className="form-control-alternative"
														id="input-postal-code"
														placeholder="Postal code"
														type="number"
													/>
												</FormGroup>
											</Col>
										</Row>
									</div>
									<hr className="my-4" />

									<h6 className="heading-small text-muted mb-4">About me</h6>
									<div className="pl-lg-4">
										<FormGroup>
											<label>About Me</label>
											<Input
												className="form-control-alternative"
												placeholder="A few words about you ..."
												rows="4"
												type="textarea"
											/>
										</FormGroup>
									</div>
									<hr className="my-4" />
                </Form>*/}

								<h6 className="heading-small text-muted mb-4">Change Password</h6>
								<div className="pl-lg-4">
									<Form
										method="POST"
										onSubmit={(e) => {
											handleChangePassword(e);
										}}
									>
										<Col lg="4">
											<FormGroup>
												<label>Old Password</label>
												<Input
													className="form-control-alternative"
													type="password"
													value={oldPassword}
													onChange={(e) => {
														setOldPassword(e.target.value);
													}}
													required
												/>
											</FormGroup>
										</Col>
										<Col lg="4">
											<FormGroup>
												<label>New Password</label>
												<Input
													className="form-control-alternative"
													type="password"
													value={newPassword}
													onChange={(e) => {
														setNewPassword(e.target.value);
													}}
													required
												/>
											</FormGroup>
										</Col>
										<Col lg="4">
											<FormGroup>
												<label>Confirm New Password</label>
												<Input
													className="form-control-alternative"
													type="password"
													value={confirmNewPassword}
													onChange={(e) => {
														setConfirmNewPassword(e.target.value);
													}}
													required
												/>
											</FormGroup>
										</Col>
										<Col lg="3">
											<Button color="info" className="btn btn-primary" type="submit">
												Change Password
											</Button>
										</Col>
									</Form>
								</div>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default Profile;
