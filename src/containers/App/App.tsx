import React from 'react';

import "./App.scss";
import { Container } from "react-bootstrap";

import Header from "../Header/Header";
import Presentation from "../../components/Presentation/Presentation";

const App: React.FC = () => {
  return ( 
      <Container fluid className="bosheaga-app p-0">
        <Header />
        <Presentation />
      </Container>
  );
};

export default App;
