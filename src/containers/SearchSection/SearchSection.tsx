import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axiosRequest from "../../utils/AxiosRequest";
import getXDeparturesFetchURL from "../../utils/GetXDeparturesFetchURL";

import { Destination } from "../../models/Destination";

import "./SearchSection.scss";
import { Row, Col, Dropdown, Button } from "react-bootstrap";

import Label from "../../components/Label/Label";
import DestinationDropdownToggle from "../../components/DestinationDropdownToggle/DestinationDropdownToggle";
import DestinationDropdownItem from "../../components/DestinationDropdownItem/DestinationDropdownItem";
import DepartureDatePicker from "../../components/DepartureDatePicker/DepartureDatePicker";

export interface IDestinationFull {
  destinations: Destination[];
  selectedDestination: Destination;
}

const SearchSection: React.FC = () => {
  const [departure, setDeparture] = useState<IDestinationFull>({
    destinations: Destination.getBosheagaDestinations(),
    selectedDestination: Destination.getBosheagaDestinations()[0],
  });

  const [arrival, setArrival] = useState<IDestinationFull>({
    destinations: Destination.getBosheagaArrivalDestinations(
      departure.selectedDestination
    ),
    selectedDestination: Destination.getBosheagaArrivalDestinations(
      departure.selectedDestination
    )[0],
  });

  const [departureDate, setDepartureDate] = useState<Date>(new Date());

  const { t } = useTranslation();

  function changeDepartureDestination(destination: Destination) {
    setDeparture({
      ...departure,
      selectedDestination: destination,
    });
    setArrival({
      destinations: Destination.getBosheagaArrivalDestinations(destination),
      selectedDestination: Destination.getBosheagaArrivalDestinations(
        destination
      )[0],
    });
  }

  function changeArrivalDestination(destination: Destination) {
    setArrival({
      ...arrival,
      selectedDestination: destination,
    });
  }

  function changeDepartureDate(newDate: Date) {
    setDepartureDate(newDate);
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosRequest.get(
        getXDeparturesFetchURL(
          departure.selectedDestination.geohash,
          arrival.selectedDestination.geohash,
          departureDate.toISOString().substring(0, 10)
        ),
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
        <Label translationKey={"DEPARTURE_CITY"} />
        <Dropdown>
          <DestinationDropdownToggle destinationFull={departure} />
          <Dropdown.Menu>
            {departure.destinations.map(
              (destination: Destination, index: number) => (
                <DestinationDropdownItem
                  destination={destination}
                  changeDestination={changeDepartureDestination}
                  key={index}
                />
              )
            )}
          </Dropdown.Menu>
        </Dropdown>
      </Col>

      {/* Arrival city */}
      <Col xs={12} md>
        <Label translationKey={"ARRIVAL_CITY"} />
        <Dropdown>
          <DestinationDropdownToggle destinationFull={arrival} />
          <Dropdown.Menu>
            {arrival.destinations.map(
              (destination: Destination, index: number) => (
                <DestinationDropdownItem
                  destination={destination}
                  changeDestination={changeArrivalDestination}
                  key={index}
                />
              )
            )}
          </Dropdown.Menu>
        </Dropdown>
      </Col>

      {/* Date */}
      <Col xs={12} md>
        <Label translationKey={"DATE"} />
        <DepartureDatePicker
          date={new Date(2020, 9, 9)}
          changeDate={changeDepartureDate}
        />
      </Col>

      {/* Number of passengers */}
      <Col xs={12} md>
        <Label translationKey={"NUMBER_OF_PASSENGERS"} />
      </Col>

      {/* Search */}
      <Col xs={12} md>
        <Label translationKey={"SEARCH"} />
      </Col>
    </Row>
  );
};

export default SearchSection;
