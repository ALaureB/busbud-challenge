import React from "react";

import "./Menu.scss";
import { Navbar, Button}  from "react-bootstrap";

const Menu: React.FC = () => {
  return (
    <Navbar>
      <Navbar.Brand href="#">Bosheaga</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Button variant="link">FR</Button>
        <Button variant="link">EN</Button>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Menu;
