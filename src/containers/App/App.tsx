import React from 'react';
import { useTranslation } from 'react-i18next';

import "./App.scss";
import { Container } from "react-bootstrap";

import Header from "../Header/Header";
import Menu from "../../components/Menu/Menu"

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  
  return ( 
      <Container fluid className="bosheaga-app p-0">
        <Menu />
        <Header />
        <h1>{t('Welcome to React')}</h1>
      </Container>
  );
};

export default App;
