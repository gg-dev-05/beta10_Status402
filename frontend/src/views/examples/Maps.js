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
import React, { useState } from "react";

// reactstrap components
import { Card, Container, Row } from "reactstrap";

// core components
import Header from "components/Headers/Header.js";

const MapWrapper = () => {
  function success(position) {
    return position;
  }

  function error() {
    return null;
  }

  const [lat, setLat] = useState("0.0");
  const [lng, setLng] = useState("0.0");

  React.useEffect(async () => {
    let position = navigator.geolocation.getCurrentPosition(success, error);

    if (!position) {
      return;
    }
    setLat(position.coords.latitude);
    setLng(position.coords.langitude);
  }, [lat, lng]);

  console.log(lat);
  console.log(lng);

  return (
    <>
      <div>
        <iframe
          style={{ height: `600px` }}
          className="map-canvas"
          id="map-canvas"
          src={`http://maps.google.com/maps/embed?z=12&t=m&q=loc:+${lat}+-${lng};output=embed`}
        ></iframe>
      </div>
    </>
  );
};

const Maps = () => {
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow border-0">
              <MapWrapper />
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Maps;
