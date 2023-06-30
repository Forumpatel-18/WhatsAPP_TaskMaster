import React, { useEffect, useState } from "react";
import Select from "react-select";
// import { Redirect } from "react-router-dom";
import { Routes, Route, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import axios from "axios";
import swal from "sweetalert2";
import Loader from "./Loader";
import Swal from "sweetalert2";

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("name"));
  const display_name = JSON.parse(localStorage.getItem("display_name"));
  const [isOpen, setIsOpen] = useState(false);
  const [hod_list, setHod_list] = useState([]);
  const [selected_options, setSelected_options] = useState([]);
  const [selected_date, setSelected_date] = useState([]);
  const [status, setStatus] = useState({ open: false, close: false });
  const [val, setVal] = useState("");
  const [subject, setSubject] = useState();
  const [desc_data, setdesc_data] = useState([]);
  const [desc_data_instring, setdesc_data_instring] = useState();
  const [selectedUser, setSelectedUser] = useState("");
  const [add_details, setadd_details] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [selected_date_format, setselected_date_format] = useState();

  const add_data = async () => {
    // debugger;
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}TASK/wptaskprocedure`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          flag: "ADD",
          wptaskid: "0",
          hod: selected_options.toString(),
          description: desc_data_instring,
          subject: subject,
          deadlinedate: selected_date_format,
          userid: user,
          remark: "test123",
        }),
      }
    );
    const newData = await response.json();
    var obj = JSON.parse(newData);
    setadd_details(obj);
    const result = obj[0];
    console.log(result);
    new swal({
      title: "Success",
      text: result.RESULT,
      icon: "success",
      button: "OK",
      timer: 2000,
    }).then((value) => {
      navigate("/tasksummary");
    });
  };

  console.log("add_detials", add_details);

  // fetch hod data

  useEffect(() => {
    const fetch_hod_data = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}TASK/wpmasterdata`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userid: user }),
          }
        );

        const newData = await response.json();
        const obj = JSON.parse(newData);
        // console.log(obj);
        setHod_list(obj);
      } catch (error) {
        console.log("error while fetching", error);
      }
    };

    fetch_hod_data();
  }, []);

  const handlewords = (e) => {
    const desc_data_instring = e.target.value;
    const desc_data = e.target.value.split(" ");

    setVal(e.target.value);

    if (desc_data.length <= 100) {
      setVal(e.target.value);
      setdesc_data(desc_data);

      setdesc_data_instring(desc_data_instring);
      if (e.target.value === "") {
        setdesc_data([]);
        setdesc_data_instring("");
      }
    } else {
      Swal.fire("Maximum 100 words allowed");
      // alert("Maximum 50 words allowed");
    }
  };

  // console.log("desc_data", desc_data, desc_data_instring);

  const hod_field = hod_list.map((s) => ({
    label: s.HOD_NAME,
    value: s.HOD_ID,
  }));

  // console.log("hod_LIST", hod_list);

  const setHandle = (e) => {
    setSelected_options(
      Array.isArray(e) ? e.map((hod_field) => hod_field.value) : []
    );
  };

  // const setHandle = (e) => {
  //   setSelected_options(e);
  // };

  // console.log("selected_options", selected_options);

  const onSetDate = (e) => {
    const today_date = new Date();

    const selected_date = e.target.value.split("-");

    var tFDate = selected_date[2];
    var tFMonth = selected_date[1];
    var tFYear = selected_date[0];

    var tFD = tFMonth + "/" + tFDate + "/" + tFYear;
    tFD = new Date(tFD);

    var DiffFromDays = (tFD - today_date) / (3600 * 24 * 1000);

    if (DiffFromDays <= 0) {
      Swal.fire("Deadline date should be greater.");
      // alert();
      e.target.value = null;
      e.preventDefault();
      return null;
    }
    const selected_date_format = e.target.value;
    setselected_date_format(selected_date_format);
    setSelected_date(selected_date);
    // console.log(selected_date_format);
  };

  // console.log("date", selected_date);

  const handleSubject = (e) => {
    setSubject(e.target.value);
  };

  const handlelogout = () => {
    navigate("/");
  };

  const handleBack = () => {
    navigate("/tasksummary");
  };

  const navigatetotasksummary = () => {
    // debugger;
    if (
      selected_options.length !== 0 &&
      selected_date.length !== 0 &&
      desc_data.length !== 0 &&
      subject.length !== 0
    ) {
      console.log(selected_date, desc_data, subject);
      add_data();
    } else {
      Swal.fire("Please provide all the details");
      //   alert("please provide all the details");
    }
  };

  return (
    <div>
      <div class="header">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div class="logo">
                <a>
                  <img src={logo} alt="logo" />
                </a>
              </div>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div class="log_out">
                <span>{display_name}</span>
                <button onClick={handlelogout}>
                  {/* <a href="/login"> */}
                  <i class="fa fa-power-off log_out_ico" aria-hidden="true"></i>
                  {/* </a> */}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="body_inner">
        <div class="container">
          <div class="row sdo">
            <div class="col-lg-12">
              <div class="label_input">
                <label className="required">Select HOD</label>
                <Select
                  options={hod_field}
                  onChange={setHandle}
                  isMulti
                  className="text-xl p-2  h-14"
                />
              </div>
            </div>
            <div class="col-lg-12">
              <div class="label_input">
                <label className="required">Subject </label>
                <textarea
                  placeholder="Subject"
                  class="tx_area"
                  onChange={handleSubject}
                ></textarea>
              </div>
            </div>
            <div class="col-lg-12">
              <div class="label_input">
                <label className="required">Description </label>
                <textarea
                  placeholder="Description"
                  class="tx_area"
                  onChange={(e) => handlewords(e)}
                ></textarea>
              </div>
            </div>
            <div class="col-lg-12">
              <div class="label_input">
                <label id="lblfromdate" className="required">
                  Dead Line
                </label>
                <input
                  className="rounded-md border-2 mt-2 p-2 focus:border-blue-500 focus:bg-gray-200 focus:gray-200 w-full ml-2 mr-2"
                  type="date"
                  onChange={onSetDate}
                />
              </div>
            </div>
            <div class="col-lg-12">
              <div class="label_input">
                <button
                  type="button"
                  class="back_btn"
                  onClick={() => handleBack()}
                >
                  Back
                </button>

                <button
                  type="button"
                  class="go_btn"
                  onClick={navigatetotasksummary}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="w-full h-full">
    //   {/* NAVBAR START */}
    //   <div className="md:flex justify-between items-center py-8 md:px-10 px-10 bg-slate-500">
    //     <p className="font-bold text-3xl">Welcome {user}</p>
    //   </div>
    //   {/* NAVBAR END */}
    //   <div>
    //     <div className="flex flex-col gap-4">
    //       {/* MULTIPLE DROPDOWN SECTION START */}
    //       <div class="flex gap-2">
    //         <div class="flex-none w-56 h-14 bg-blue-300">
    //           <h1 className="text-xl p-3">Select HODs</h1>
    //         </div>
    //         <div class="grow h-14">
    //           <div className="flex flex-wrap items-center lg:justify-between justify-center w-full">
    //             <div className=" w-full	">
    // <Select
    //   options={hod_field}
    //   // options={suggestions}
    //   onChange={setHandle}
    //   isMulti
    //   className="text-xl p-2  h-14"
    // />
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       {/* MULTIPLE DROPDOWN SECTION START */}
    //       {/* SUBJECT LINE SECTION START */}
    //       <div class="flex gap-2">
    //         <div class="flex-none w-56 h-14 bg-blue-300">
    //           <h1 className="text-xl p-3">Subject Line</h1>
    //         </div>
    //         <div class="grow h-14">
    //           <div className="flex flex-wrap items-center lg:justify-between justify-center w-full">
    //             <input
    //               className="rounded-lg bg-gray-400 mt-2 p-2 focus:border-blue-500 focus:bg-gray-200 focus:outline-none w-full ml-2 mr-2"
    //               type="text"
    //             />
    //           </div>
    //         </div>
    //       </div>
    //       {/* SUBJECT LINE SECTION END */}
    //       {/* DEADLINE SECTION START */}
    //       <div class="flex gap-2">
    //         <div class="flex-none w-56 h-14 bg-blue-300">
    //           <h1 className="text-xl p-3">Deadline </h1>
    //         </div>
    //         <div class="grow h-14">
    //           <div className="flex flex-wrap items-center lg:justify-between justify-center w-full">
    //             <input
    //               className="rounded-lg bg-gray-400 mt-2 p-2 focus:border-blue-500 focus:bg-gray-200 focus:outline-none w-full ml-2 mr-2"
    //               type="date"
    //               // element.value = "2011-09-29"
    //               onChange={onSetDate}
    //             />
    //           </div>
    //         </div>
    //       </div>
    //       {/* DEADLINE SECTION END */}
    //       {/* SUBJECT LINE WITH MAX LIMIT */}
    //       <div class="flex gap-2">
    //         <div class="flex-none w-56 h-14 bg-blue-300">
    //           <h1 className="text-xl p-3">Description</h1>
    //         </div>
    //         <div class="grow h-14">
    //           <div className="flex flex-wrap items-center lg:justify-between justify-center w-full">
    //             <input
    //               className="rounded-lg text-black bg-gray-400 mt-2 p-2 focus:border-blue-500 focus:bg-gray-200 focus:outline-none w-full ml-2 mr-2"
    //               type="text"
    //               placeholder="Max 50 words"
    //               onChange={(e) => handlewords(e)}
    //               value={val}
    //             />
    //           </div>
    //         </div>
    //       </div>
    //       <div className="flex flex-col justify-center items-center align-middle">
    //         <button
    //           className=" flex flex-col justify-center items-center w-40 my-5 py-2 bg-gray-500 shadow-sm text-white font-semibold rounded-lg align-middle"
    //           type="button"
    //           onClick={navigatetotasksummary}
    //         >
    //           Submit
    //         </button>
    //       </div>
    //       {/* STATUS */}
    //       {/* <div class="flex gap-2">
    //         <div class="flex-none w-56 h-14 bg-blue-300">
    //           <h1 className="text-xl p-3">Status </h1>
    //         </div>
    //         <div className="grow h-14 rounded-lg bg-gray-400 focus:border-blue-500 focus:bg-gray-200 focus:outline-none w-full">
    //           <div className="flex flex-wrap items-center justify-content-start w-full m-3">
    //             <div className="p-1 text-xl mr-6 pl-2 flex flex-row justify-items-start gap-5">
    //               <RadioButton
    //                 name="open"
    //                 value="open"
    //                 text="Open"
    //                 onChange={onChange}
    //                 checked={status.open}
    //                 className="p-2"
    //               />
    //               <RadioButton
    //                 name="close"
    //                 value="close"
    //                 text="Close"
    //                 onChange={onChange}
    //                 checked={status.close}
    //               />
    //             </div>
    //           </div>
    //         </div>
    //       </div> */}
    //       {/* STATUS END */}
    //     </div>
    //   </div>
    // </div>
  );
};

export default Profile;
