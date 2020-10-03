import React from 'react';

import "./App.scss";
import { Container } from "react-bootstrap";

import Header from "../Header/Header";
import Menu from "../../components/Menu/Menu";

const App: React.FC = () => {
  return ( 
      <Container fluid className="bosheaga-app p-0">
        <Menu />
        <Header />
      </Container>
  );
};

export default App;
