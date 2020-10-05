import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { axiosRequest } from "../../utils/AxiosUtils";
import { departuresQueryBuilder } from "../../utils/AxiosUtils";

import { Destination } from "../../models/Destination";

import "./SearchSection.scss";
import { Row, Col, Dropdown, Button } from "react-bootstrap";

import Label from "../../components/Label/Label";
import DestinationDropdownToggle from "../../components/DestinationDropdownToggle/DestinationDropdownToggle";
import DestinationDropdownItem from "../../components/DestinationDropdownItem/DestinationDropdownItem";
import DepartureDatePicker from "../../components/DepartureDatePicker/DepartureDatePicker";
import PassengerCounter from "../../components/PassengerCounter/PassengerCounter";

export interface IDestinationFull {
  destinations: Destination[];
  selectedDestination: Destination;
}

export interface INumberOfPassengers {
  adults: number;
  children: number;
  seniors: number;
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

  const [departureDate, setDepartureDate] = useState<Date>(
    new Date(2020, 9, 9)
  );

  const [numberOfPassengers, setNumberOfPassengers] = useState<
    INumberOfPassengers
  >({
    adults: 0,
    children: 0,
    seniors: 0,
  });

  const [url, setUrl] = useState("");

  const { t, i18n } = useTranslation();

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

  function changeNumberOfAdults(count: number) {
    setNumberOfPassengers({
      ...numberOfPassengers,
      adults: count
    });
  }

  function changeNumberOfChildren(count: number) {
    setNumberOfPassengers({
      ...numberOfPassengers,
      children: count,
    });
  }

  function changeNumberOfSeniors(count: number) {
    setNumberOfPassengers({
      ...numberOfPassengers,
      seniors: count,
    });
  }

  useEffect(() => {
    async function fetchData() {
      const response = await axiosRequest.get(url);
      console.log(response);
      setUrl("");
    }

    fetchData();
  }, [url]);

  return (
    <Row className="search-section">
      {/* Departure city */}
      <Col xs={12} md>
        <Label translationKey={"DEPARTURE_CITY"} />
        <Dropdown className="destination-dropdown">
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
        <Dropdown className="destination-dropdown">
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
          date={departureDate}
          changeDate={changeDepartureDate}
        />
      </Col>

      {/* Number of passengers */}
      <Col xs={12} md>
        <Label translationKey={"PASSENGERS"} />
        <PassengerCounter
          label={numberOfPassengers.adults > 1 ? "ADULTS" : "ADULT"}
          updateCounter={changeNumberOfAdults}
        />
        <PassengerCounter
          label={numberOfPassengers.children > 1 ? "CHILDREN" : "CHILD"}
          updateCounter={changeNumberOfChildren}
        />
        <PassengerCounter
          label={numberOfPassengers.seniors > 1 ? "SENIORS" : "SENIOR"}
          updateCounter={changeNumberOfSeniors}
        />
      </Col>

      {/* Search */}
      <Col xs={12} md>
        <Button
          variant="primary"
          onClick={() => {
            setUrl(
              departuresQueryBuilder(
                departure.selectedDestination.geohash,
                arrival.selectedDestination.geohash,
                departureDate.toISOString().substring(0, 10),
                numberOfPassengers,
                i18n.language
              )
            );
          }}
        >
          {t("SEARCH")}
        </Button>
      </Col>
    </Row>
  );
};

export default SearchSection;
