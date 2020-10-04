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

const MenuItem: React.FC<IMenuItemProps> = ({ language, changeLanguage}) => {
  const { t, i18n } = useTranslation();

  return (
    <Button
      className={language.isLanguageActive(i18n.language) ? "active" : ""}
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
