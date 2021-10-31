
import React from 'react'
import { Row, Col, CardHeader, Table, Card } from 'reactstrap'
const Temperature = () => {
	return (
		<Col className="mb-xl-0" xl="">
			<Card className="shadow">
				<CardHeader className="border-0">
					<Row className="align-items-center">
						<div className="col">
							<h3 className="mb-0 text-center"> </h3>
						</div>
					</Row>
				</CardHeader>
				<Table className="align-items-center table-flush table-striped" responsive>
					<tbody>
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
	)
}

export default Temperature
