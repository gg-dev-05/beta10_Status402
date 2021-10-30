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
import { useState, useEffect } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	NavItem,
	NavLink,
	Nav,
	Progress,
	Table,
	Container,
	Row,
	Col,
} from "reactstrap";

// core components
import { chartOptions, parseOptions, chartExample1, chartExample2, chartExample3, chartExample4 } from "variables/charts.js";

import Header from "components/Headers/Header.js";

import axios from "axios";
import { API_URL } from "Common/Constants";
require('dotenv').config()

function returnForecast(param, forecastData) {
	if (forecastData === {}) return;
	if (!("forecast" in forecastData)) return;
	if (!("forecastday" in forecastData.forecast)) return;
	const days = []
	days.push(forecastData.current)
	for (var i = 0; i < 3; i++) {
		days.push(forecastData.forecast.forecastday[i].hour[5])
		days.push(forecastData.forecast.forecastday[i].hour[17])
	}

	if (param === 1) {
		const labels = []
		const data = []
		labels.push("Today")
		data.push(days[0].humidity)
		for (var i = 1; i < 7; i++) {
			labels.push(new Date(days[i].time).toLocaleString())
			data.push(days[i].humidity)
		}
		return {
			labels: labels,
			datasets: [
				{
					data: data,
				},
			],
		};
	}
	else {
		const labels = []
		const data = []
		labels.push("Today")
		data.push(days[0].temp_c)
		for (var i = 1; i < 7; i++) {
			labels.push(new Date(days[i].time).toLocaleString())
			data.push(days[i].temp_c)
		}
		return {
			labels: labels,
			datasets: [
				{
					data: data,
				},
			],
		};

	}
}

const Index = (props) => {
	const [activeNav, setActiveNav] = useState(1); // 0 => Rain, 1 => Temp
	const [typeOfForecast, setTypeOfForecast] = useState("0"); // 0 => Rainfall, 1 => Temperature
	const [forecastData, setForecastData] = useState({})


	if (window.Chart) {
		parseOptions(Chart, chartOptions());
	}


	const toggleNavs = (e, index) => {
		e.preventDefault();
		setActiveNav(index);
		setTypeOfForecast(index);
	};

	const [crop, setCrop] = useState("bajra");
	const [chartLoading, setChartLoading] = useState(true);

	const [chart2Data, setChart2Data] = useState({
		labels: ["Nov 2021", "Dec 2021", "Jan 2021", "Feb 2021", "Mar 2021", "Apr 2021"],
		datasets: [
			{
				label: "Sales",
				data: [0, 0, 0, 0, 0, 0],
				maxBarThickness: 10,
			},
		],
	});

	const getPrice = async (date1) => {
		const res = await axios.get(
			"https://price-predictor-api3.herokuapp.com/?item=" + crop + "&year=" + date1.year + "&month=" + date1.month
		);
		return res;
	};

	const getForecast = async () => {
		// TODO: Error checking for if IP address is not available 
		const ip = await axios.get('https://geolocation-db.com/json/')
		const res = await axios.get(
			`http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${ip.data.IPv4}&days=4`
		);
		return res;
	};

	useEffect(async () => {
		const data = await getForecast()
		setForecastData(data.data)
	}, [])

	useEffect(async () => {
		setChartLoading(true);
		let dates = [];
		let labels = [];

		let currYear = new Date().getFullYear();
		let currMonth = new Date().getMonth() + 1;

		const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

		for (let i = 0; i < 6; i++) {
			let dateObj = {};
			dateObj.year = currYear;
			dateObj.month = currMonth;

			labels.push(months[currMonth - 1] + " " + currYear);
			dates.push(dateObj);

			if (currMonth == 12) currYear++;
			currMonth++;
			if (currMonth > 12) currMonth = 1;
		}

		let prices = [];

		for (let i = 0; i < dates.length; i++) {
			let date1 = dates[i];
			let price = await getPrice(date1);
			// console.log(price);
			prices.push(Math.round(price.data.price * 100) / 100);
		}

		let newChartData = {
			labels,
			datasets: [
				{
					label: "Sales",
					data: [25, 20, 30, 22, 17, 29],
					maxBarThickness: 10,
				},
			],
		};

		newChartData.datasets[0].data = prices;
		setChart2Data(newChartData);
		setChartLoading(false);
	}, [crop]);

	return (
		<>
			<Header />
			{/* Page content */}
			<Container className="mt--7" fluid>
				<Row>
					<Col className="mb-5 mb-xl-0" xl="8">
						<Card className="bg-gradient-default shadow">
							<CardHeader className="bg-transparent">
								<Row className="align-items-center">
									<div className="col">
										<h6 className="text-uppercase text-light ls-1 mb-1">Overview</h6>
										<h2 className="text-white mb-0">Expected {activeNav === 1 ? "Humidity" : "Temperature"}</h2>
									</div>
									<div className="col">
										<Nav className="justify-content-end" pills>
											<NavItem>
												<NavLink
													className={classnames("py-2 px-3", {
														active: activeNav === 1,
													})}
													href="#pablo"
													onClick={(e) => toggleNavs(e, 1)}
												>
													<span className="d-none d-md-block">Humidity</span>
													<span className="d-md-none">H</span>
												</NavLink>
											</NavItem>
											<NavItem>
												<NavLink
													className={classnames("py-2 px-3", {
														active: activeNav === 2,
													})}
													data-toggle="tab"
													href="#pablo"
													onClick={(e) => toggleNavs(e, 2)}
												>
													<span className="d-none d-md-block">Temperature</span>
													<span className="d-md-none">T</span>
												</NavLink>
											</NavItem>
										</Nav>
									</div>
								</Row>
							</CardHeader>
							<CardBody>
								{/* Chart */}
								<div className="chart">
									<Line
										data={returnForecast(activeNav, forecastData)}
										options={activeNav === 1 ? chartExample3.options : chartExample4.options}
										getDatasetAtEvent={(e) => console.log(e)}
									/>
								</div>
							</CardBody>
						</Card>
					</Col>
					<Col xl="4">
						<Card className="shadow">
							<CardHeader className="bg-transparent">
								<Row className="align-items-center">
									<div className="col">
										<h6 className="text-uppercase text-muted ls-1 mb-1">Profits</h6>
										<div className="d-flex" style={{ justifyContent: "space-between" }}>
											<h2 className="mb-0">Predicted Prices</h2>
											<select
												name="crops"
												id="crops"
												onChange={(e) => {
													setCrop(e.target.value);
												}}
												style={{
													backgroundColor: "#fff",
													border: "1px solid #32325d",
													borderRadius: "5px",
													padding: "5px",
													fontWeight: "600",
													color: "#32325d",
												}}
											>
												<option value="rice">Rice</option>
												<option value="wheat">Wheat</option>
												<option value="bajra">Bajra</option>
												<option value="moong">Moong</option>
												<option value="jowar">Jowar</option>
												<option value="urad">Urad</option>
												<option value="maize">Maize</option>
											</select>
										</div>
									</div>
								</Row>
							</CardHeader>
							<CardBody>
								{/* Chart */}
								<div className="chart">
									{chartLoading && <p>Loading...</p>}
									{!chartLoading && <Bar data={chart2Data} options={chartExample2.options} />}
								</div>
							</CardBody>
						</Card>
					</Col>
				</Row>
				<Row className="mt-5">
					<Col className="mb-5 mb-xl-0" xl="8">
						<Card className="shadow">
							<CardHeader className="border-0">
								<Row className="align-items-center">
									<div className="col">
										<h3 className="mb-0">Page visits</h3>
									</div>
									<div className="col text-right">
										<Button
											color="primary"
											href="#pablo"
											onClick={(e) => e.preventDefault()}
											size="sm"
										>
											See all
										</Button>
									</div>
								</Row>
							</CardHeader>
							<Table className="align-items-center table-flush" responsive>
								<thead className="thead-light">
									<tr>
										<th scope="col">Page name</th>
										<th scope="col">Visitors</th>
										<th scope="col">Unique users</th>
										<th scope="col">Bounce rate</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<th scope="row">/argon/</th>
										<td>4,569</td>
										<td>340</td>
										<td>
											<i className="fas fa-arrow-up text-success mr-3" /> 46,53%
										</td>
									</tr>
									<tr>
										<th scope="row">/argon/index.html</th>
										<td>3,985</td>
										<td>319</td>
										<td>
											<i className="fas fa-arrow-down text-warning mr-3" /> 46,53%
										</td>
									</tr>
									<tr>
										<th scope="row">/argon/charts.html</th>
										<td>3,513</td>
										<td>294</td>
										<td>
											<i className="fas fa-arrow-down text-warning mr-3" /> 36,49%
										</td>
									</tr>
									<tr>
										<th scope="row">/argon/tables.html</th>
										<td>2,050</td>
										<td>147</td>
										<td>
											<i className="fas fa-arrow-up text-success mr-3" /> 50,87%
										</td>
									</tr>
									<tr>
										<th scope="row">/argon/profile.html</th>
										<td>1,795</td>
										<td>190</td>
										<td>
											<i className="fas fa-arrow-down text-danger mr-3" /> 46,53%
										</td>
									</tr>
								</tbody>
							</Table>
						</Card>
					</Col>
					<Col xl="4">
						<Card className="shadow">
							<CardHeader className="border-0">
								<Row className="align-items-center">
									<div className="col">
										<h3 className="mb-0">Social traffic</h3>
									</div>
									<div className="col text-right">
										<Button
											color="primary"
											href="#pablo"
											onClick={(e) => e.preventDefault()}
											size="sm"
										>
											See all
										</Button>
									</div>
								</Row>
							</CardHeader>
							<Table className="align-items-center table-flush" responsive>
								<thead className="thead-light">
									<tr>
										<th scope="col">Referral</th>
										<th scope="col">Visitors</th>
										<th scope="col" />
									</tr>
								</thead>
								<tbody>
									<tr>
										<th scope="row">Facebook</th>
										<td>1,480</td>
										<td>
											<div className="d-flex align-items-center">
												<span className="mr-2">60%</span>
												<div>
													<Progress max="100" value="60" barClassName="bg-gradient-danger" />
												</div>
											</div>
										</td>
									</tr>
									<tr>
										<th scope="row">Facebook</th>
										<td>5,480</td>
										<td>
											<div className="d-flex align-items-center">
												<span className="mr-2">70%</span>
												<div>
													<Progress max="100" value="70" barClassName="bg-gradient-success" />
												</div>
											</div>
										</td>
									</tr>
									<tr>
										<th scope="row">Google</th>
										<td>4,807</td>
										<td>
											<div className="d-flex align-items-center">
												<span className="mr-2">80%</span>
												<div>
													<Progress max="100" value="80" />
												</div>
											</div>
										</td>
									</tr>
									<tr>
										<th scope="row">Instagram</th>
										<td>3,678</td>
										<td>
											<div className="d-flex align-items-center">
												<span className="mr-2">75%</span>
												<div>
													<Progress max="100" value="75" barClassName="bg-gradient-info" />
												</div>
											</div>
										</td>
									</tr>
									<tr>
										<th scope="row">twitter</th>
										<td>2,645</td>
										<td>
											<div className="d-flex align-items-center">
												<span className="mr-2">30%</span>
												<div>
													<Progress max="100" value="30" barClassName="bg-gradient-warning" />
												</div>
											</div>
										</td>
									</tr>
								</tbody>
							</Table>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};


export default Index;
