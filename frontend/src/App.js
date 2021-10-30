import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "layouts/Admin";
import AuthLayout from "layouts/Auth";

import axios from "axios";
import { BASE_URL } from "Common/Constants";

function App() {
	const [r, setR] = useState(false);
	const [userType, setUserType] = useState("guest");

	const refresh = () => {
		setR(!r);
	};

	useEffect(async () => {
		console.log("G");
		const url = BASE_URL + "checkUser";
		const res = await axios.post(url, { token: localStorage.getItem("token") });
		setUserType(res.data.user);
	}, [r]);

	return (
		<BrowserRouter>
			<Switch>
				{userType === "farmer" && (
					<>
						<Route path="/farmer" render={(props) => <AdminLayout {...props} refresh={refresh} />} />
						<Redirect from="/" to="/farmer/index" />
					</>
				)}
				{userType === "guest" && (
					<>
						<Route path="/auth" render={(props) => <AuthLayout {...props} refresh={refresh} />} />
						<Redirect from="/" to="/auth/register" />
					</>
				)}
				{userType === "consumer" &&
					{
						/* some component */
					}}
			</Switch>
		</BrowserRouter>
	);
}

export default App;
