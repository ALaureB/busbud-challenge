import React from "react";

import "./DepartureCard.scss";
import { Card, Row, Col } from "react-bootstrap";

interface IDepartureCardProps {
  departureLocation: string;
  departureTime: string;
  arrivalLocation: string;
  arrivalTime: string;
  price: string;
}

const DepartureCard: React.FC<IDepartureCardProps> = ({
  departureLocation,
  departureTime,
  arrivalLocation,
  arrivalTime,
  price,
}) => {
  return (
    <Card className="col-md-4 col-sm-6 col-xs-12 m-3">
      <Card.Body>
        <Card.Text>
          <Row>
            <Col>
              <div>{departureLocation}</div>
              <div>{departureTime}</div>
            </Col>
            <Col>
              {arrivalLocation}
              {arrivalTime}
            </Col>
          </Row>
          <Row>
            <Col>{price}</Col>
          </Row>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default DepartureCard;
