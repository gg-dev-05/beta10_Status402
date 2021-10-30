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

const Orders = () => {
  const [filter, setFilter] = useState(0);
  const [filtClients, setFiltClients] = useState(data.clients);

  const handleFilter = (filt) => {
    console.log(filt);
    setFilter(filt);
  };

  useEffect(() => {
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
                              <span className="mb-0 text-sm">
                                {Clients.name}
                              </span>
                            </Media>
                          </Media>
                        </th>
                        <td>{Clients.crop}</td>
                        <td>
                          <Badge color="" className="badge-dot mr-4">
                            <i className="bg-warning" />
                            {Clients.weight} Kg
                          </Badge>
                        </td>
                        <td>
                          <div color="" className="mr-4">
                            {Clients.price} RS
                          </div>
                        </td>
                        <td>
                          <div className="mr-4">{Clients.status}</div>
                        </td>
                        <td>
                          <Button className="">Edit</Button>
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
