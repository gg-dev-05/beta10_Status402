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
import { BASE_URL } from "../../Common/Constants";
import axios from "axios";

const Login = ({ refresh }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		const body = {
			username,
			password,
		};

		console.log(body);

		const url = BASE_URL + "farmer/login";

		const res = await axios.post(url, body);
		if (res.data.statusCode == 200) {
			localStorage.setItem("token", res.data.token);
			refresh();
		} else {
			// cannot add user
		}
	};

	return (
		<>
			<Col lg="5" md="7">
				<Card className="bg-secondary shadow border-0">
					<CardBody className="px-lg-5 py-lg-5">
						<div className="text-center text-muted mb-4">
							<small>Sign in</small>
						</div>
						<Form
							role="form"
							method="POST"
							onSubmit={(e) => {
								handleSubmit(e);
							}}
						>
							<FormGroup className="mb-3">
								<InputGroup className="input-group-alternative">
									<InputGroupAddon addonType="prepend">
										<InputGroupText>
											<i className="ni ni-email-83" />
										</InputGroupText>
									</InputGroupAddon>
									<Input
										placeholder="Username"
										type="text"
										onChange={(e) => {
											setUsername(e.target.value);
										}}
										value={username}
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
										onChange={(e) => {
											setPassword(e.target.value);
										}}
										value={password}
									/>
								</InputGroup>
							</FormGroup>
							<div className="text-center">
								<Button className="my-4" color="primary" type="submit">
									Sign in
								</Button>
							</div>
						</Form>
					</CardBody>
				</Card>
				<Row className="mt-3">
					<Col xs="6">
						<a className="text-light" href="#pablo" onClick={(e) => e.preventDefault()}>
							<small>Forgot password?</small>
						</a>
					</Col>
					<Col className="text-right" xs="6">
						<a className="text-light" href="#pablo" onClick={(e) => e.preventDefault()}>
							<small>Create new account</small>
						</a>
					</Col>
				</Row>
			</Col>
		</>
	);
};

export default Login;
