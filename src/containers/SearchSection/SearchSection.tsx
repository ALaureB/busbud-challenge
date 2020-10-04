import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axiosRequest from "../../utils/AxiosRequest";
import getXDeparturesFetchURL from "../../utils/GetXDeparturesFetchURL";

import { Destination } from "../../models/Destination";

import "./SearchSection.scss";
import { Row, Col, Dropdown, Button } from "react-bootstrap";

interface IDeparture {
  destinations: Destination[];
  selectedDestination: Destination;
}

interface IArrival {
  destinations: Destination[];
  selectedDestination: Destination;
}

const SearchSection: React.FC = () => {
  const [departure, setDeparture] = useState<IDeparture>({
    destinations: Destination.getBosheagaDestinations(),
    selectedDestination: Destination.getBosheagaDestinations()[0],
  });
  const [arrival, setArrival] = useState<IArrival>({
    destinations: Destination.getBosheagaArrivalDestinations(
      departure.selectedDestination
    ),
    selectedDestination: Destination.getBosheagaArrivalDestinations(
      departure.selectedDestination
    )[0],
  });

  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosRequest.get(
        getXDeparturesFetchURL("dr5reg", "drt2yz", "2020-10-12"),
        {
          params: {
            adult: 1,
          },
        }
      );
      console.log(response);
    };

    fetchData();
  }, []);

  return (
    <Row className="search-section">
      {/* Departure city */}
      <Col xs={12} md>
        <label>{t("DEPARTURE_CITY")}</label>
        <Dropdown>
          <Dropdown.Toggle>
            {departure.selectedDestination
              ? departure.selectedDestination.value
              : t("SELECT_CITY")}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {departure.destinations.map((destination: Destination) => (
              <Dropdown.Item
                onClick={() => {
                  setDeparture({
                    ...departure,
                    selectedDestination: destination,
                  });
                  setArrival({
                    destinations: Destination.getBosheagaArrivalDestinations(
                      destination
                    ),
                    selectedDestination: Destination.getBosheagaArrivalDestinations(
                      destination
                    )[0],
                  });
                }}
              >
                {destination.value}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Col>

      {/* Arrival city */}
      <Col xs={12} md>
        <label>{t("ARRIVAL_CITY")}</label>
        <Dropdown>
          <Dropdown.Toggle>
            {arrival.selectedDestination
              ? arrival.selectedDestination.value
              : t("SELECT_CITY")}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {arrival.destinations.map((destination: Destination) => (
              <Dropdown.Item
                onClick={() => {
                  setArrival({
                    ...departure,
                    selectedDestination: destination,
                  });
                }}
              >
                {destination.value}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Col>

      <Col xs={12} md>
        <label>{t("DATE")}</label>
      </Col>
      <Col xs={12} md>
        <label>{t("NUMBER_OF_PASSENGERS")}</label>
      </Col>
      <Col xs={12} md>
        <label>{t("SEARCH")}</label>
      </Col>
    </Row>
  );
};

export default SearchSection;
