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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import data from "../client.json";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "Common/Constants";
import { goodNotification } from "Common/Notification";
import { badNotification } from "Common/Notification";

const Inventory = () => {
  const [editIndex, setEditIndex] = useState(null);
  const [editOrder, setEditOrder] = useState(null);
  const [modal, setModal] = useState(false);
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    crop: "Rice",
    quantity: 0,
    units: "Kg",
    price: 0,
  });

  console.log(items);

  //   const handleFilter = (filt) => {
  //     console.log(filt);
  //     setFilter(filt);
  //   };

  const addItem = async () => {
    console.log(newItem);
    axios
      .post(BASE_URL + "farmer/inventory/add", newItem, {
        headers: { authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        if (res.data.statusCode == 200) {
          goodNotification("Add Inventory", "item successfully added");
          getInventory();
          setModal(false);
        } else {
          badNotification("Unable to add item");
        }
      })
      .catch((err) => {
        console.log(err);
        badNotification("Unable to add item");
      });
  };

  const confirmEdit = () => {
    console.log(editOrder);

    const body = {
      crop: editOrder.crop,
      quantity: editOrder.quantity,
      units: editOrder.units,
      price: editOrder.price,
      _id: editOrder._id,
      user_id: editOrder.farmerId,
    };

    axios
      .put(BASE_URL + "farmer/inventory/update", body, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.statusCode == 200) {
          goodNotification("Edit Item", "Item edited successfully");
          setEditIndex(null);
          setEditOrder(null);
          getInventory();
        } else {
          badNotification("Unable to edit Item");
        }
      })
      .catch((err) => {
        badNotification("Unable to edit Item");
      });
  };

  const handleEdit = (item) => {
    if (editIndex === item._id) {
      setEditIndex(null);
    } else {
      setEditIndex(item._id);
      setEditOrder(item);
    }
  };

  const getInventory = () => {
    axios
      .get(BASE_URL + "farmer/inventory", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.statusCode == 200) {
          setItems(res.data.result);
        } else {
          badNotification("unable to fetch inventory");
        }
      })
      .catch((error) => {
        console.log(error);
        badNotification("unable to fetch inventory");
      });
  };

  useEffect(() => {
    getInventory();
  }, []);

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
                {/* <Col
                  sm={5}
                  lg={1}
                  className="p-2 ml-auto mr-2"
                  style={{ backgroundColor: "#808080", borderRadius: "10px" }}
                >
                  <FormGroup check>
                    <Input
                      name="filter"
                      type="radio"
                      onChange={() => handleFilter(0)}
                    />{" "}
                    <Label check>All</Label>
                  </FormGroup>
                </Col>
                <Col
                  sm={5}
                  lg={2}
                  className="p-2 mr-3"
                  style={{ backgroundColor: "#FFCF33", borderRadius: "10px" }}
                >
                  <FormGroup check>
                    <Input
                      name="filter"
                      type="radio"
                      onChange={() => handleFilter(1)}
                    />{" "}
                    <Label check>Pending</Label>
                  </FormGroup>
                </Col>
                <Col
                  sm={5}
                  lg={2}
                  className="p-2 mr-3"
                  style={{ backgroundColor: "#228B22", borderRadius: "10px" }}
                >
                  <FormGroup check>
                    <Input
                      name="filter"
                      type="radio"
                      onChange={() => handleFilter(2)}
                    />{" "}
                    <Label check>Completed</Label>
                  </FormGroup>
                </Col> */}
                <Col sm={5} lg={2} className="p-2 ml-auto mr-3">
                  <Button className="" onClick={() => setModal(true)}>
                    Add Item
                  </Button>
                </Col>
                <Modal isOpen={modal} toggle={() => setModal(!modal)}>
                  <ModalHeader>Add Item</ModalHeader>
                  <ModalBody>
                    <Form>
                      <FormGroup>
                        <Label>Crop</Label>
                        <Input
                          type="select"
                          onChange={(e) =>
                            setNewItem({ ...newItem, crop: e.target.value })
                          }
                        >
                          <option value="Rice">Rice</option>
                          <option value="Wheat">Wheat</option>
                          <option value="Bajra">Bajra</option>
                          <option value="Moong">Moong</option>
                          <option value="Jowar">Jowar</option>
                          <option value="Urad">Urad</option>
                          <option value="Maize">Maize</option>
                        </Input>
                      </FormGroup>
                      <FormGroup>
                        <Label>Quantity</Label>
                        <Input
                          type="text"
                          value={newItem.quantity}
                          onChange={(e) =>
                            setNewItem({ ...newItem, quantity: e.target.value })
                          }
                        ></Input>
                      </FormGroup>
                      <FormGroup>
                        <Label>Units</Label>
                        <Input
                          type="text"
                          value={newItem.units}
                          onChange={(e) =>
                            setNewItem({ ...newItem, units: e.target.value })
                          }
                        ></Input>
                      </FormGroup>
                      <FormGroup>
                        <Label>Price</Label>
                        <Input
                          type="text"
                          value={newItem.price}
                          onChange={(e) =>
                            setNewItem({ ...newItem, price: e.target.value })
                          }
                        ></Input>
                      </FormGroup>
                    </Form>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={addItem}>
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
                    <th scope="col">Item Name</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                    {/* <th scope="col">Status</th> */}
                    <th scope="col">Edit</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => {
                    return (
                      <tr key={item._id}>
                        {/* <th scope="row">
                            <Media className="align-items-center">
                              <Media>
                                {editIndex !== Clients.id ? (
                                  <span className="mb-0 text-sm">
                                    {Clients.name}
                                  </span>
                                ) : (
                                  <Input
                                    type="text"
                                    value={editOrder.name}
                                    onChange={(e) =>
                                      setEditOrder({
                                        ...editOrder,
                                        name: e.target.value,
                                      })
                                    }
                                  ></Input>
                                )}
                              </Media>
                            </Media>
                          </th> */}
                        <td>
                          {editIndex !== item._id ? (
                            <p>{`${item.crop}`}</p>
                          ) : (
                            <Input
                              type="select"
                              onChange={(e) =>
                                setEditOrder({
                                  ...editOrder,
                                  crop: e.target.value,
                                })
                              }
                            >
                              <option value="Rice">Rice</option>
                              <option value="Wheat">Wheat</option>
                              <option value="Bajra">Bajra</option>
                              <option value="Moong">Moong</option>
                              <option value="Urad">Urad</option>
                              <option value="Jowar">Jowar</option>
                              <option value="Maize">Maize</option>
                            </Input>
                          )}
                        </td>
                        <td>
                          <Badge color="" className="badge-dot mr-4">
                            <i className="bg-warning" />
                            {editIndex !== item._id ? (
                              <p>{`${item.quantity} ${item.units}`}</p>
                            ) : (
                              <FormGroup row>
                                <Col lg={6}>
                                  <Label>Quantity</Label>
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
                                </Col>
                                <Col lg={6}>
                                  <Label>Units</Label>
                                  <Input
                                    type="text"
                                    value={editOrder.units}
                                    onChange={(e) =>
                                      setEditOrder({
                                        ...editOrder,
                                        units: e.target.value,
                                      })
                                    }
                                  ></Input>
                                </Col>
                              </FormGroup>
                            )}
                          </Badge>
                        </td>
                        <td>
                          <div color="" className="mr-4">
                            {editIndex !== item._id ? (
                              <p>{`${item.price} Rs`}</p>
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
                        {/* <td>
                            <div className="mr-4">
                              {editIndex !== Clients.id ? (
                                <p>{Clients.status}</p>
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
                                  <option value="Completed">Completed</option>
                                  <option value="Pending">Pending</option>
                                </Input>
                              )}
                            </div>
                          </td> */}
                        <td>
                          <Button className="" onClick={() => handleEdit(item)}>
                            {editIndex !== item._id ? "Edit" : "Cancel"}
                          </Button>
                        </td>
                        <td>
                          {editIndex === item._id && (
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

export default Inventory;
