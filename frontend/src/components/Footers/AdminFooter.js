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
/*eslint-disable*/

// reactstrap components
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";

const Footer = () => {
	return (
		<footer className="footer">
			<Row className="align-items-center justify-content-xl-between">
				<Col xl="6">
					<div className="copyright text-center text-xl-left text-muted">
						© {new Date().getFullYear()} <span className="font-weight-bold ml-1">Farmer Helper</span>
					</div>
				</Col>

				<Col xl="6">
					<Nav className="nav-footer justify-content-center justify-content-xl-end">
						<NavItem>
							<NavLink
								href="https://github.com/gg-dev-05/beta10_Status402"
								rel="noopener noreferrer"
								target="_blank"
							>
								Created by Status402
							</NavLink>
						</NavItem>
					</Nav>
				</Col>
			</Row>
		</footer>
	);
};

export default Footer;
