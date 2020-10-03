import React from "react";
import "./App.scss";

import Container from "react-bootstrap/Container";
import Header from "../Header/Header";

const App: React.FC = () => {
  return (
    <Container fluid className="bosheaga-app p-0">
      <Header />
    </Container>
  );
};

export default App;
