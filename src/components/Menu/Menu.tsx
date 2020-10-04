import React from "react";
import { useTranslation } from "react-i18next";

import { Language } from "../../models/Languages";

import "./Menu.scss";
import { Navbar } from "react-bootstrap";

import MenuItem from "../MenuItem/MenuItem";

const languages: Language[] = Language.getLanguages();

const Menu: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language: Language) => {
    i18n.changeLanguage(language.value);
  };

  return (
    <Navbar>
      <Navbar.Brand href="#">Bosheaga</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        {languages.map((language: Language, index: number) => (
          <MenuItem
            language={language}
            changeLanguage={changeLanguage}
            key={index}
          />
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Menu;
