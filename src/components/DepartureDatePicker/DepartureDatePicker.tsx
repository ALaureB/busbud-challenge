import React, { useState } from "react";
import DatePicker from "react-datepicker";
import el from "date-fns/locale/el";

import "react-datepicker/dist/react-datepicker.css";

import "./DepartureDatePicker.scss";

interface IDepartureDatePickerProps {
  date: Date;
  changeDate: ChangeDate;
}

type ChangeDate = (newDate: any) => void;

const endFestivalDate = new Date(2020, 9, 11);

const DepartureDatePicker: React.FC<IDepartureDatePickerProps> = ({
  date,
  changeDate,
}) => {
  const [currentDate, setCurrentDate] = useState<any>(date);
  return (
    <DatePicker
      selected={currentDate}
      minDate={date}
      maxDate={endFestivalDate}
      onChange={(date) => {
        setCurrentDate(date);
        changeDate(date);
      }}
    />
  );
};

export default DepartureDatePicker;
