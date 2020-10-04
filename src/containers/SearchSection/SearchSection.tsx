import React, { useState, useEffect } from "react";
import axiosRequest from "../../utils/AxiosRequest";
import getXDeparturesFetchURL from "../../utils/GetXDeparturesFetchURL"

import "./SearchSection.scss";

const SearchSection: React.FC = () => {
  const [response, setResponse] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosRequest.get(getXDeparturesFetchURL("dr5reg", "drt2yz", "2020-10-12"), {
        params: {
          adult: 1
        }
      })
      setResponse(response.data);
      console.log(response);
    }
    
    fetchData();
  }, []);

  return (
    <div>
      
    </div>
  );
};

export default SearchSection;
