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
import {
	Form,
	Modal,
	ModalHeader,
	ModalFooter,
	ModalBody,
	Badge,
	Card,
	CardHeader,
	Label,
	Media,
	Table,
	Container,
	Row,
	FormGroup,
	Input,
	Col,
	Button,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import data from "../client.json";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "Common/Constants";
import { badNotification } from "Common/Notification";
import { goodNotification } from "Common/Notification";

const Orders = () => {
	const [filter, setFilter] = useState(0);
	const [filtOrders, setFiltOrders] = useState([]);
	const [orders, setOrders] = useState([]);
	const [modal, setModal] = useState(false);
	const [editIndex, setEditIndex] = useState(null);
	const [editOrder, setEditOrder] = useState(null);
	const [newOrder, setNewOrder] = useState({
		itemId: null,
		quantity: 0,
		units: "Kg",
		price: 0,
		consumerName: "",
		consumerEmail: "",
		consumerPhone: "",
	});
	const [inventory, setInventory] = useState([]);

	const handleFilter = (filt) => {
		console.log(filt);
		setFilter(filt);
	};
	console.log(editOrder);
	const confirmEdit = () => {
		console.log(editOrder);

		axios
			.put(BASE_URL + "farmer/order/" + editOrder._id, editOrder, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((res) => {
				console.log(res);
				if (res.data.statusCode == 200) {
					goodNotification("Success", "Order updated successfully");
					fetchOrders();
					// setEditOrder(null);
					setEditIndex(null);
				} else {
					badNotification("Unable to edit order");
				}
			})
			.catch((err) => {
				console.log(err);
				badNotification("Unable to edit order");
			});
	};

	const addOrder = () => {
		console.log(newOrder);

		if (newOrder.itemId == null) {
			badNotification("Please add an item to the inventory");
		} else {
			axios
				.post(BASE_URL + "farmer/order", newOrder, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("token"),
					},
				})
				.then((res) => {
					console.log(res);
					if (res.data.statusCode == 200) {
						goodNotification("Added Order", "Order added successfully");
						fetchOrders();
						setModal(false);
					} else {
						badNotification("Unable to add order");
					}
				})
				.catch((err) => {
					console.log(err);
					badNotification("Unable to add Order");
				});
		}
	};

	const handleEdit = (order) => {
		if (editIndex === order._id) {
			setEditIndex(null);
		} else {
			setEditIndex(order._id);
			setEditOrder({
				_id: order._id,
				itemId: order.itemId._id,
				quantity: order.quantity,
				units: order.units,
				price: order.price,
				consumerName: order.consumerName,
				consumerEmail: order.consumerEmail,
				consumerPhone: order.consumerPhone,
				status: order.status,
			});
		}
	};

	const fetchOrders = () => {
		axios
			.get(BASE_URL + "farmer/order", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((res) => {
				if (res.data.statusCode == 200) {
					setOrders(res.data.result);
					if (filter === 1) {
						setFiltOrders(res.data.result.filter((client) => client.status == 0));
					} else if (filter == 2) {
						setFiltOrders(res.data.result.filter((client) => client.status === 1));
					} else {
						setFiltOrders(res.data.result);
					}
				} else {
					badNotification("Unable to fetch orders");
				}
			})
			.catch((err) => {
				badNotification("Unable to fetch orders");
			});
	};

	useEffect(() => {
		const token = localStorage.getItem("token");
		console.log(token);

		axios
			.get(BASE_URL + "farmer/inventory", {
				headers: {
					Authorization: "Bearer " + token,
				},
			})
			.then((res) => {
				console.log("inve", res.data);
				if (res.data.statusCode == 200) {
					setInventory(res.data.result);
					if (res.data.result.length > 0) setNewOrder({ ...newOrder, itemId: res.data.result[0]._id });
					else badNotification("Please add an item to the inventory");
				} else {
					badNotification("unable to fetch inventory");
				}
			})
			.catch((error) => {
				badNotification("unable to fetch inventory");
			});

		fetchOrders();

		if (filter === 1) {
			setFiltOrders(orders.filter((client) => client.status == 0));
		} else if (filter == 2) {
			setFiltOrders(orders.filter((client) => client.status === 1));
		} else {
			setFiltOrders(orders);
		}
	}, [filter]);

	console.log(orders, inventory);

	return (
		<>
			<Header />
			{/* Page content */}
			<Container className="mt--7" fluid>
				{/* Table */}
				<Row>
					<div className="col">
						<Card className="shadow">
							<CardHeader className="border-0">
								<h3 className="mb-0"></h3>
							</CardHeader>
							<div className="row pb-5">
								<Col
									sm={5}
									lg={1}
									className="p-2 ml-auto mr-2 d-flex justify-content-center align-items-center"
									style={{
										backgroundColor: "rgb(69, 69, 69)",
										borderRadius: "10px",
										cursor: "pointer",
										opacity: filter === 0 ? 1 : 0.5,
									}}
									onClick={() => handleFilter(0)}
								>
									<Label check style={{ color: "#fff", cursor: "pointer" }}>
										All
									</Label>
								</Col>
								<Col
									sm={5}
									lg={1}
									className="p-2 mr-3 d-flex justify-content-center align-items-center"
									style={{
										backgroundColor: "rgb(246, 185, 0)",
										borderRadius: "10px",
										cursor: "pointer",
										opacity: filter === 1 ? 1 : 0.5,
									}}
									onClick={() => handleFilter(1)}
								>
									<Label check style={{ color: "#fff", cursor: "pointer" }}>
										Pending
									</Label>
								</Col>
								<Col
									sm={5}
									lg={1}
									className="p-2 mr-3 d-flex justify-content-center align-items-center"
									style={{
										backgroundColor: "#228B22",
										borderRadius: "10px",
										cursor: "pointer",
										opacity: filter === 2 ? 1 : 0.5,
									}}
									onClick={() => handleFilter(2)}
								>
									<Label check style={{ color: "#fff", cursor: "pointer" }}>
										Completed
									</Label>
								</Col>
								<Col sm={5} lg={2} className="p-2 mr-3">
									<Button className="" onClick={() => setModal(true)}>
										Add Order
									</Button>
								</Col>
								<Modal isOpen={modal} toggle={() => setModal(!modal)}>
									<ModalHeader>Add Order</ModalHeader>
									<ModalBody>
										<Form>
											<FormGroup>
												<Label>Crop</Label>
												<Input
													type="select"
													onChange={(e) =>
														setNewOrder({ ...newOrder, itemId: e.target.value })
													}
												>
													{inventory.map((crop) => (
														<option value={crop._id}>{crop.crop}</option>
													))}
												</Input>
											</FormGroup>
											<FormGroup>
												<Label>Quantity</Label>
												<Input
													type="text"
													value={newOrder.quantity}
													onChange={(e) =>
														setNewOrder({
															...newOrder,
															quantity: e.target.value,
														})
													}
												></Input>
											</FormGroup>
											<FormGroup>
												<Label>Units</Label>
												<Input
													type="text"
													value={newOrder.units}
													onChange={(e) =>
														setNewOrder({ ...newOrder, units: e.target.value })
													}
												></Input>
											</FormGroup>
											<FormGroup>
												<Label>Price</Label>
												<Input
													type="text"
													value={newOrder.price}
													onChange={(e) =>
														setNewOrder({ ...newOrder, price: e.target.value })
													}
												></Input>
											</FormGroup>
											<FormGroup>
												<Label>Consumer Name</Label>
												<Input
													type="text"
													value={newOrder.consumerName}
													onChange={(e) =>
														setNewOrder({
															...newOrder,
															consumerName: e.target.value,
														})
													}
												></Input>
											</FormGroup>
											<FormGroup>
												<Label>Consumer Email</Label>
												<Input
													type="text"
													value={newOrder.consumerEmail}
													onChange={(e) =>
														setNewOrder({
															...newOrder,
															consumerEmail: e.target.value,
														})
													}
												></Input>
											</FormGroup>
											<FormGroup>
												<Label>Consumer Phone</Label>
												<Input
													type="text"
													value={newOrder.consumerPhone}
													onChange={(e) =>
														setNewOrder({
															...newOrder,
															consumerPhone: e.target.value,
														})
													}
												></Input>
											</FormGroup>
										</Form>
									</ModalBody>
									<ModalFooter>
										<Button color="primary" onClick={addOrder}>
											Add
										</Button>{" "}
										<Button color="secondary" onClick={() => setModal(false)}>
											Cancel
										</Button>
									</ModalFooter>
								</Modal>
							</div>
							<Table className="align-items-center table-flush" responsive>
								<thead className="thead-light">
									<tr>
										<th scope="col">Consumer Name</th>
										<th scope="col">Item Name</th>
										<th scope="col">Quantity</th>
										<th scope="col">Price</th>
										<th scope="col">Status</th>
										<th scope="col">Edit</th>
										<th scope="col" />
									</tr>
								</thead>
								<tbody>
									{filtOrders.map((order, index) => {
										return (
											<tr key={order._id}>
												<th scope="row">
													<Media className="align-items-center">
														<Media>
															{editIndex !== order._id ? (
																<span className="mb-0 text-sm">
																	{order.consumerName}
																</span>
															) : (
																<Input
																	type="text"
																	value={editOrder.consumerName}
																	onChange={(e) =>
																		setEditOrder({
																			...editOrder,
																			consumerName: e.target.value,
																		})
																	}
																></Input>
															)}
														</Media>
													</Media>
												</th>
												<td>
													{editIndex !== order._id ? (
														<p>{`${order.itemId.crop}`}</p>
													) : (
														<Input
															type="select"
															onChange={(e) =>
																setEditOrder({
																	...editOrder,
																	itemId: e.target.value,
																})
															}
														>
															{inventory.map((crop) => (
																<option value={crop._id}>{crop.crop}</option>
															))}
														</Input>
													)}
												</td>
												<td>
													<Badge color="" className="badge-dot mr-4">
														{editIndex !== order._id ? (
															<p>{`${order.quantity} Kg`}</p>
														) : (
															<Input
																type="text"
																value={editOrder.quantity}
																onChange={(e) =>
																	setEditOrder({
																		...editOrder,
																		quantity: e.target.value,
																	})
																}
															></Input>
														)}
													</Badge>
												</td>
												<td>
													<div color="" className="mr-4">
														{editIndex !== order._id ? (
															<p>{`${order.price} Rs`}</p>
														) : (
															<Input
																type="text"
																value={editOrder.price}
																onChange={(e) =>
																	setEditOrder({
																		...editOrder,
																		price: e.target.value,
																	})
																}
															></Input>
														)}
													</div>
												</td>
												<td>
													<div className="mr-4">
														{editIndex !== order._id ? (
															<p>{order.status == 0 ? "Pending" : "Completed"}</p>
														) : (
															<Input
																type="select"
																onChange={(e) =>
																	setEditOrder({
																		...editOrder,
																		status: e.target.value,
																	})
																}
															>
																<option value={0}>Pending</option>
																<option value={1}>Completed</option>
															</Input>
														)}
													</div>
												</td>
												<td>
													<Button className="" onClick={() => handleEdit(order)}>
														{editIndex !== order._id ? "Edit" : "Cancel"}
													</Button>
												</td>
												<td>
													{editIndex === order._id && (
														<Button onClick={confirmEdit}>Confirm</Button>
													)}
												</td>
											</tr>
										);
									})}
								</tbody>
							</Table>
						</Card>
					</div>
				</Row>
			</Container>
		</>
	);
};

export default Orders;
