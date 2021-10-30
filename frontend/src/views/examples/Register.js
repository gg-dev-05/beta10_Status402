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

import React, { useState } from "react";

// reactstrap components
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	FormGroup,
	Form,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Row,
	Col,
} from "reactstrap";

import "../../assets/css/register.css";
import { BASE_URL } from "../../Common/Constants";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { goodNotification, badNotification } from "Common/Notification";

const Register = () => {
	let history = useHistory();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		const body = {
			username,
			password,
		};

		let url = BASE_URL + "farmer/add";

		const res = await axios.post(url, body);
		if (res.data.statusCode == 200) {
			history.push("/auth/login");
			goodNotification("Registration successfull", "Please sign in to continue");
		} else {
			// cannot add user
			badNotification("This username is taken. Please use another username");
		}
	};

	return (
		<>
			<Col lg="6" md="8">
				<Card className="bg-secondary shadow border-0">
					<CardBody className="px-lg-5 py-lg-5">
						<div className="text-center text-muted mb-4">
							<small>Sign Up</small>
						</div>
						<Form
							role="form"
							method="POST"
							onSubmit={(e) => {
								handleSubmit(e);
							}}
						>
							<FormGroup>
								<InputGroup className="input-group-alternative mb-3">
									<InputGroupAddon addonType="prepend">
										<InputGroupText>
											<i className="ni ni-email-83" />
										</InputGroupText>
									</InputGroupAddon>
									<Input
										placeholder="Username"
										type="text"
										autoComplete="new-email"
										onChange={(e) => {
											setUsername(e.target.value);
										}}
									/>
								</InputGroup>
							</FormGroup>
							<FormGroup>
								<InputGroup className="input-group-alternative">
									<InputGroupAddon addonType="prepend">
										<InputGroupText>
											<i className="ni ni-lock-circle-open" />
										</InputGroupText>
									</InputGroupAddon>
									<Input
										placeholder="Password"
										type="password"
										autoComplete="new-password"
										onChange={(e) => {
											setPassword(e.target.value);
										}}
									/>
								</InputGroup>
							</FormGroup>
							<div className="text-center">
								<Button className="mt-4" color="primary" type="submit">
									Create account
								</Button>
							</div>
						</Form>
					</CardBody>
				</Card>
			</Col>
		</>
	);
};

export default Register;
