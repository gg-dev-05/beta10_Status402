import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "layouts/Admin";
import AuthLayout from "layouts/Auth";

import axios from "axios";
import { BASE_URL } from "Common/Constants";

import "react-notifications-component/dist/theme.css";
import ReactNotification from "react-notifications-component";

function App() {
	const [r, setR] = useState(false);
	const [userType, setUserType] = useState("guest");

	const refresh = () => {
		setR(!r);
	};

	useEffect(async () => {
		const url = BASE_URL + "checkUser";
		const res = await axios.post(url, { token: localStorage.getItem("token") });
		setUserType(res.data.user);
	}, [r]);

	return (
		<BrowserRouter>
			<ReactNotification />
			<Switch>
				{userType === "farmer" && (
					<>
						<Route path="/farmer" render={(props) => <AdminLayout {...props} refresh={refresh} />} />
						<Route>
							<Redirect to="/farmer/index" />
						</Route>
					</>
				)}
				{userType === "guest" && (
					<>
						<Route path="/auth" render={(props) => <AuthLayout {...props} refresh={refresh} />} />
						<Redirect to="/auth/login" />
					</>
				)}
			</Switch>
		</BrowserRouter>
	);
}

export default App;
