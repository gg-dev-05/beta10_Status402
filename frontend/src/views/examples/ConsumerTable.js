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
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import data from "views/client.json";

const ConsumerTables = () => {
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
                <h3 className="mb-0">Card tables</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Item Name</th>
                    <th scope="col">Consumer Name</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {data.map((order) => {
                    return (
                      <tr key={order.id}>
                        <th scope="row">
                          <Media className="align-items-center">
                            <Media>
                              <span className="mb-0 text-sm">{order.crop}</span>
                            </Media>
                          </Media>
                        </th>
                        <td>{order.name}</td>
                        <td>
                          <Badge color="" className="badge-dot mr-4">
                            <i className="bg-warning" />
                            {item.weight}
                          </Badge>
                        </td>
                        <td>
                          <div color="" className="mr-4">
                            {order.price}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  ;
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
        {/* Dark table */}

        {/* <Row className="mt-5">
            <div className="col">
              <Card className="bg-default shadow">
                <CardHeader className="bg-transparent border-0">
                  <h3 className="text-white mb-0">Consumers</h3>
                </CardHeader>
                <Table
                  className="align-items-center table-dark table-flush"
                  responsive
                >
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Location</th>
                      <th scope="col">Crop Name</th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                    
                          <Media>
                            <span className="mb-0 text-sm">
                              Rahul Agarwal
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>5/140 Vijay Nagar, near Cineplex, Bhopal</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-warning" />
                          pending
                        </Badge>
                      </td>
                      
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">60%</span>
                          <div>
                            <Progress
                              max="100"
                              value="60"
                              barClassName="bg-warning"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
  
                              <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()} >
                              moong
                              </DropdownItem>
                              <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()} >
                              rice
                              </DropdownItem>
                              <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()} >
                              wheat
                              </DropdownItem>
                              <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()} >
                              bajra
                              </DropdownItem>
                              <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()} >
                              jowar
                              </DropdownItem>
                              <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()} >
                              maize
                              </DropdownItem>
                              <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()} >
                              urad
                              </DropdownItem>
                                  
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                    
                    
                  </tbody>
                </Table>
              </Card>
            </div>
          </Row> */}
      </Container>
    </>
  );
};

export default ConsumerTables;
