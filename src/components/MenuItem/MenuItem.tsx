import React from "react";
import { useTranslation } from "react-i18next";

import { Language } from "../../models/Languages";

import "./MenuItem.scss";
import { Button } from "react-bootstrap";

interface IMenuItemProps {
  language: Language;
  changeLanguage: ChangeLanguage;
}

type ChangeLanguage = (language: Language) => void;

const MenuItem: React.FC<IMenuItemProps> = ({ language, changeLanguage }) => {
  const { t } = useTranslation();

  return (
    <Button
      variant="link"
      onClick={() => {
        changeLanguage(language);
      }}
    >
      {t(language.keyTranslation)}
    </Button>
  );
};

export default MenuItem;
