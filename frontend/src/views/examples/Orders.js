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

const Orders = () => {
  const [filter, setFilter] = useState(0);
  const [filtClients, setFiltClients] = useState(data.clients);
  const [editIndex, setEditIndex] = useState(null);
  const [editOrder, setEditOrder] = useState(null);

  const handleFilter = (filt) => {
    console.log(filt);
    setFilter(filt);
  };

  const confirmEdit = () => {
    console.log(editOrder);
  };

  const handleEdit = (client) => {
    if (editIndex === client.id) {
      setEditIndex(null);
    } else {
      setEditIndex(client.id);
      setEditOrder(client);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);

    axios
      .get(BASE_URL + "farmer/order", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
      });

    if (filter === 1) {
      setFiltClients(
        data.clients.filter((client) => client.status === "pending")
      );
    } else if (filter == 2) {
      setFiltClients(
        data.clients.filter((client) => client.status === "completed")
      );
    } else {
      setFiltClients(data.clients);
    }
  }, [filter]);
  console.log(filtClients, data.clients);
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
                </Col>
                <Col sm={5} lg={2} className="p-2 mr-3">
                  <Button className="">Add Order</Button>
                </Col>
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
                  {filtClients.map((Clients, index) => {
                    return (
                      <tr>
                        <th scope="row">
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
                        </th>
                        <td>
                          {editIndex !== Clients.id ? (
                            <p>{`${Clients.crop}`}</p>
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
                            {editIndex !== Clients.id ? (
                              <p>{`${Clients.weight} Kg`}</p>
                            ) : (
                              <Input
                                type="text"
                                value={editOrder.weight}
                                onChange={(e) =>
                                  setEditOrder({
                                    ...editOrder,
                                    weight: e.target.value,
                                  })
                                }
                              ></Input>
                            )}
                          </Badge>
                        </td>
                        <td>
                          <div color="" className="mr-4">
                            {editIndex !== Clients.id ? (
                              <p>{`${Clients.price} Rs`}</p>
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
                        </td>
                        <td>
                          <Button
                            className=""
                            onClick={() => handleEdit(Clients)}
                          >
                            {editIndex !== Clients.id ? "Edit" : "Cancel"}
                          </Button>
                        </td>
                        <td>
                          {editIndex === Clients.id && (
                            <Button onChange={confirmEdit}>Confirm</Button>
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
