import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import { useParams } from "react-router-dom";
import swal from "sweetalert2";

const Close = () => {
  const [close_desc, setClose_desc] = useState([]);
  const code = useParams();
  console.log(code);
  useEffect(() => {
    const close_task = async () => {
      const data = {
        code: code,
      };

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}TASK/close`,
          data
        );

        const newData = await response.data;
        setClose_desc(newData);
        // console.log(newData, "newdata");
        new swal({
          title: "Success",
          text: newData,
          icon: "success",
          button: "OK",
          timer: 5000,
        });
      } catch (error) {
        console.log("error while fetching", error);
      }
    };

    close_task();
  }, []);

  // console.log("close_msg", close_desc);

  return <div></div>;
};

export default Close;
