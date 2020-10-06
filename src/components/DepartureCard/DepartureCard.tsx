import React from "react";

import moment from 'moment';

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
              <div>{moment.utc(departureTime).format("LT")}</div>
            </Col>
            <Col>
              <div>{arrivalLocation}</div>
              <div>{moment.utc(arrivalTime).format("LT")}</div>
              
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
