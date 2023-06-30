import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import swal from "sweetalert";
import Swal from "sweetalert2";
import { post } from "jquery";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import DualListBox from "react-dual-listbox";
import "react-dual-listbox/lib/react-dual-listbox.css";
import Loader from "./Loader";
import Pagination from "./Pagination";

const Tasksummary = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("name"));
  const display_name = JSON.parse(localStorage.getItem("display_name"));
  const [display_details, setdisplay_details] = useState([]);
  const [edit_details, setEdit_details] = useState([]);
  const [from_date, setFrom_date] = useState([]);
  const [to_date, setTo_date] = useState([]);
  const [add_details, setadd_details] = useState({});
  const [to_date_format, setTo_date_format] = useState([]);
  const [hod_list, setHod_list] = useState();
  const [hod_selected, setHod_selected] = useState([]);
  const [Activeclass, setActiveclass] = useState("");
  const [Activeclass_routing, setActiveclass_routing] = useState("");
  const [Activeclass_delete, setActiveclass_delete] = useState("");
  const [Activeclass_ban, setActiveclass_ban] = useState("");
  const [Activeclass_close, setActiveclass_close] = useState("");
  const [delete_reason, setdelete_reason] = useState([]);
  const [ban_reason, setban_reason] = useState([]);
  const [selected_date, setSelected_date] = useState([]);
  const [selected_date_format, setselected_date_format] = useState();
  const [desc_data, setdesc_data] = useState([]);
  const [desc_data_instring, setdesc_data_instring] = useState();
  const [val, setVal] = useState("");
  const [status, setStatus] = useState("OPEN");
  const [deleted, setDeleted] = useState(false);
  const [wp_task_id, setWp_task_id] = useState([]);
  const [open_popup, setOpen_popup] = useState(false);
  const [open_popup_routing, setOpen_popup_routing] = useState(false);
  const [open_popup_delete, setOpen_popup_delete] = useState(false);
  const [open_popup_ban, setOpen_popup_ban] = useState(false);
  const [open_popup_close, setOpen_popup_close] = useState(false);
  const [search, setSearch] = useState("");
  const [hod_selected_onedit, sethod_selected_onedit] = useState([]);
  const [order, setOrder] = useState("ASC");
  const [routing_history, setRouting_history] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const date = new Date();
  const today_date = date.getDate();
  date.setDate(today_date);
  const defaultValuetodate = date.toLocaleDateString("en-CA");

  const futureDate = date.getDate() - 30;
  date.setDate(futureDate);
  const defaultValuefromdate = date.toLocaleDateString("en-CA");

  const data = {
    fromdate: defaultValuefromdate,
    todate: defaultValuetodate,
    hod: hod_selected.toString(),
    status: status,
    userid: user,
  };

  //display data api call
  const display_data = async () => {
    const data = {
      fromdate: defaultValuefromdate,
      todate: defaultValuetodate,
      hod: hod_selected.toString(),
      status: status,
      userid: user,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}TASK/wptasksummary`,
        data
      );

      const newData = await response.data;
      const obj = JSON.parse(newData);

      setdisplay_details(obj);
    } catch (error) {
      console.log("error while fetching", error);
    }
  };

  // display on edit

  const display_data_on_edit = async () => {
    // debugger;
    const data = {
      fromdate: defaultValuefromdate,
      todate: defaultValuetodate,
      hod: hod_selected.toString(),
      status: status,
      userid: user,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}TASK/wptasksummary`,
        data
      );

      const newData = await response.data;
      const obj = JSON.parse(newData);
      setdisplay_details(obj);
    } catch (error) {
      console.log("error while fetching", error);
    }
  };

  const display_go_data = async () => {
    // debugger;
    var if_hod_field = hod_selected.toString();
    if (if_hod_field == "") {
      var if_hod_field = "N";
    }
    // console.log(from_date);
    var from_set_date = from_date;
    if (from_set_date.length == 0) {
      var from_set_date = defaultValuefromdate;
    }

    var to_set_date = to_date_format;
    if (to_set_date.length == 0) {
      var to_set_date = defaultValuetodate;
    }

    const go_data = {
      fromdate: from_set_date,
      todate: to_set_date,
      hod: if_hod_field,
      status: status,
      userid: user,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}TASK/wptasksummary`,
        go_data
      );

      const newData = await response.data;
      const obj = JSON.parse(newData);
      setdisplay_details(obj);
    } catch (error) {
      console.log("error while fetching", error);
    }
  };
  // console.log("checking data exists", display_details);
  // console.log("hod_selected after filter", hod_selected);

  useEffect(() => {
    var if_hod_field = hod_selected.toString();
    if (if_hod_field == "") {
      var if_hod_field = "N";
    }
    const display_data = async () => {
      const data = {
        fromdate: defaultValuefromdate,
        todate: defaultValuetodate,
        hod: if_hod_field,
        status: status,
        userid: user,
      };

      try {
        // debugger;
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}TASK/wptasksummary`,
          data
        );

        const newData = await response.data;
        const obj = JSON.parse(newData);
        setdisplay_details(obj);
      } catch (error) {
        console.log("error while fetching", error);
      }
    };
    display_data();

    const user_id = {
      userid: user,
    };

    const fetch_hod_data = async () => {
      // debugger;
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}TASK/wpmasterdata`,
          user_id
        );

        const newData = await response.data;
        const obj = JSON.parse(newData);
        setHod_list(obj);
      } catch (error) {
        console.log("error while fetching", error);
      }
    };

    fetch_hod_data();
  }, []);

  console.log("DETAILS", display_details);

  // console.log("hod_LIST", hod_list);

  const hod_field =
    hod_list &&
    hod_list.map((s) => ({
      label: s.HOD_NAME,
      value: s.HOD_ID,
    }));

  console.log("hod_field", hod_field, hod_selected);

  const setHandle = (e) => {
    setHod_selected(
      Array.isArray(e) ? e.map((hod_field) => hod_field.value) : []
    );
  };

  // console.log("edithod",)
  // REDIRECT TO ADD TASK

  const handleAddTask = () => {
    navigate("/profile");
  };

  // HANDLE DESCRICPTION MAX WORDS

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
    }
  };

  // console.log(desc_data_instring);

  //DELETE TASK

  const handleDeleteTask = (e) => {
    setActiveclass_delete("active");
    setOpen_popup_delete(true);
    const wp_task_id = e.currentTarget.id;
    setWp_task_id(wp_task_id);
    handleEditAPI(wp_task_id);
  };

  //API CALL FOR UPDATE AFTER EDIT
  const handleUpdate = async (wp_task_id) => {
    // debugger;

    // console.log(from_date);
    var desc_on_edi = desc_data_instring;
    if (desc_on_edi == undefined) {
      var desc_on_edi = edit_field.desc_edit;
      // console.log(desc_on_edi);
    }

    var deadline_on_edit = selected_date_format;
    if (deadline_on_edit == undefined) {
      var deadline_on_edit = edit_field.deadline_edit;
      // console.log(deadline_on_edit);
    }
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}TASK/wptaskprocedure`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          flag: "EDIT",
          wptaskid: wp_task_id,
          hod: hod_selected_onedit.toString(),
          description: desc_on_edi,
          subject: edit_field.subject_edit,
          deadlinedate: deadline_on_edit,
          userid: user,
          remark: "test123",
        }),
      }
    );
    const newData = await response.json();
    const obj = JSON.parse(newData);
    // console.log("obj", obj);
    setadd_details(obj);
  };

  // console.log(add_details);

  const handle_edit_submit = () => {
    // debugger;
    // const wp_task_id = e.currentTarget.id;
    // console.log(wp_task_id);

    handleUpdate(wp_task_id);
    display_data_on_edit(data);

    swal(" Your task has been updated!", {
      icon: "success",
    });
    {
      ClosePopUp();
    }
  };
  const handle_delete_submit = () => {
    if (delete_reason.length > 0) {
      handleDelete(wp_task_id);
      display_data(data);
      swal(" Your task has been updated!", {
        icon: "success",
      });
      {
        ClosePopUp_delete();
      }
    } else {
      Swal.fire("Please Enter a valid reason");
      // alert("Please Enter a valid reason");
    }
  };

  const handle_ban_submit = () => {
    if (ban_reason.length > 0) {
      handleban(wp_task_id);
      display_data(data);

      swal(" Your task has been updated!", {
        icon: "success",
      });
      {
        ClosePopUp_ban();
      }
    } else {
      Swal.fire("Please Enter a valid reason");
    }
  };

  // const handle_close_submit = () => {
  //   handleClose(wp_task_id);
  //   display_data(data);

  //   swal(" Your task has been updated!", {
  //     icon: "success",
  //   });
  //   {
  //     ClosePopUp_close();
  //   }
  // };
  // API CALL FOR deleting

  const handleDelete = async (wp_task_id) => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}TASK/wptaskprocedure`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          flag: "DELETE",
          wptaskid: wp_task_id,
          hod: "hod",
          description: "description",
          subject: "subject",
          deadlinedate: "2023-06-10",
          userid: user,
          remark: "test123",
        }),
      }
    );
    const newData = await response.json();
    const obj = JSON.parse(newData);
    setadd_details(obj);
  };

  // console.log("DELETED task", add_details);

  // BAN HANDLING

  const handleban = async (wp_task_id) => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}TASK/wptaskprocedure`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          flag: "INAPPROPRIATE",
          wptaskid: wp_task_id,
          hod: "hod",
          description: "description",
          subject: "subject",
          deadlinedate: "2023-06-10",
          userid: user,
          remark: "test123",
        }),
      }
    );
    const newData = await response.json();
    const obj = JSON.parse(newData);
    setadd_details(obj);
  };

  // console.log("DELETED task", add_details);

  const handleinappropriate = (e) => {
    setActiveclass_ban("active");
    setOpen_popup_ban(true);

    const wp_task_id = e.currentTarget.id;

    setWp_task_id(wp_task_id);
    handleEditAPI(wp_task_id);
  };

  // CLOSE TASK

  const handleCloseTask = (e) => {
    setActiveclass_close("active");
    setOpen_popup_close(true);
    const wp_task_id = e.currentTarget.id;
    setWp_task_id(wp_task_id);
    // handleEditAPI(wp_task_id);
    swal({
      title: "Are you sure?",
      text: "You want to close this task",
      icon: "warning",
      buttons: ["No", "Yes, I am sure"],
      dangerMode: true,
    }).then(function (isConfirm) {
      if (isConfirm) {
        swal({
          title: "Task Successfully closed",
          icon: "success",
          timer: 2000,
        }).then(function () {
          handleClose(wp_task_id);
          display_data(data);
        });
      }
    });
  };

  // API CALL FOR CLOSING

  const handleClose = async (wp_task_id) => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}TASK/wptaskprocedure`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          flag: "CLOSE",
          wptaskid: wp_task_id,
          hod: "hod",
          description: "description",
          subject: "subject",
          deadlinedate: "2023-06-10",
          userid: user,
          remark: "test123",
        }),
      }
    );
    const newData = await response.json();
    const obj = JSON.parse(newData);
    setadd_details(obj);
  };

  // API CALL FOR EDIT TASK

  const handleEditAPI = async (wp_task_id) => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}TASK/wptaskdetbyid`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wptaskid: wp_task_id,
        }),
      }
    );
    const newData = await response.json();
    var obj = JSON.parse(newData);

    setEdit_details(obj);
    const new_obj = obj[0].TASK_HODS.split(",");
    sethod_selected_onedit(new_obj);
    setWp_task_id(wp_task_id);
  };

  console.log("edit", edit_details);
  // console.log("hod_on_edit", hod_selected_onedit);
  // console.log("wp_task_id", wp_task_id);

  const edit_popup =
    edit_details &&
    edit_details.map((s) => ({
      subject_edit: s.TASK_SUBJECT,
      desc_edit: s.TASK_DESCRIPTION,
      hod_edit: s.TASK_HODS,
      hod_inarray: s.TASK_HODS.split(","),
      deadline_edit: moment(s.DEADLINE_DATE).format("YYYY-MM-DD"),
    }));

  const edit_field = edit_popup[0];
  // console.log("deadline", edit_field.deadline_edit);

  // EDIT CLOSE BUTTON FUNCTION

  const ClosePopUp = () => {
    setActiveclass("");
    setEdit_details([]);
    setselected_date_format();
    setSelected_date([]);
    // setdesc_data_instring("");
    // sethod_selected_onedit(hod_selected_onedit);
  };

  const ClosePopUp_routing = () => {
    setActiveclass_routing("");
  };

  const ClosePopUp_delete = () => {
    setActiveclass_delete("");
    setdelete_reason([]);
  };

  const ClosePopUp_ban = () => {
    setActiveclass_ban("");
    setban_reason([]);
  };
  // const ClosePopUp_close = () => {
  //   setActiveclass_close("");
  // };

  const handleEditClick = (e) => {
    setActiveclass("active");
    setOpen_popup(true);
    const wp_task_id = e.currentTarget.id;
    console.log(wp_task_id);
    setWp_task_id(wp_task_id);
    handleEditAPI(wp_task_id);
  };

  // DATE HANDLING

  const handleFromdate = (e) => {
    const from_date = e.target.value;
    setFrom_date(from_date);
  };

  const handleTodate = (e) => {
    const from_date = new Date();
    const to_date = e.target.value.split("-");

    var tFDate = to_date[2];
    var tFMonth = to_date[1];
    var tFYear = to_date[0];

    var tFD = tFMonth + "/" + tFDate + "/" + tFYear;
    tFD = new Date(tFD);

    var DiffFromDays = (tFD - from_date) / (3600 * 24 * 1000);

    if (DiffFromDays > 0) {
      Swal.fire("To Date should not be greater than today");
      // alert("To Date should not be greater than today");
      e.target.value = null;
      e.preventDefault();
      return null;
    }
    const to_date_format = e.target.value;
    setTo_date_format(to_date_format);
    setTo_date(to_date);
  };

  // console.log("From Date", from_date, "to date", to_date_format);

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
      Swal.fire("Deadline date should be greater");
      // alert("Deadline date should be greater. ");
      e.target.value = null;
      e.preventDefault();
      return null;
    }
    const selected_date_format = e.target.value;
    setselected_date_format(selected_date_format);
    setSelected_date(selected_date);
  };
  // console.log(selected_date_format, selected_date);

  // ban HANDLING
  const handleSubmit = (e) => {
    display_go_data();
  };

  const handlelogout = () => {
    navigate("/");
  };

  const handleStatus = (event) => {
    setStatus(event.target.value);
  };

  const approval_history = async (wp_task_id) => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}TASK/approval_history`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          WPTASKID: wp_task_id,
        }),
      }
    );
    const newData = await response.json();
    var obj = JSON.parse(newData);

    setRouting_history(obj);
    // console.log("obj", obj);
    const routing_display = obj[0];
    console.log("routing_display", routing_display);
    setWp_task_id(wp_task_id);
  };

  // console.log("ROUTING", routing_history[0]);

  const handlerouting = (e) => {
    setActiveclass_routing("active");
    setOpen_popup_routing(true);
    const wp_task_id = e.currentTarget.id;
    setWp_task_id(wp_task_id);
    approval_history(wp_task_id);
    handleEditAPI(wp_task_id);
  };

  // SORTING
  const sorting = (col) => {
    // console.log("entered sorting");
    if (order === "ASC") {
      var sorted = [...display_details].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      // console.log("sorted", sorted, display_details);
      setOrder("DSC");
    }

    if (order === "DSC") {
      var sorted = [...display_details].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      // console.log("sorted", sorted, display_details);
      setOrder("ASC");
    }
    display_data();
  };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = display_details.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                  <i class="fa fa-power-off log_out_ico" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class={"pop_sec " + Activeclass}>
        <button onClick={ClosePopUp}>
          <i class="fa fa-close close_pop"></i>
        </button>
        <div class="inner_pop">
          <div class="full_inn">
            <label>Subject</label>
            {edit_details.length > 0 ? (
              <input
                type="text"
                class="inputcl"
                value={edit_field.subject_edit}
                readOnly
              />
            ) : (
              <input type="text" class="inputcl" readOnly />
            )}
          </div>
          <div class="full_inn">
            <label>HOD</label>

            {edit_details.length > 0 ? (
              <DualListBox
                options={hod_field}
                selected={hod_selected_onedit}
                onChange={(value) => sethod_selected_onedit(value)}
              ></DualListBox>
            ) : (
              <Loader />
            )}
          </div>
          <div class="full_inn">
            <label>Description </label>
            {edit_details.length > 0 ? (
              <input
                type="text"
                class="inputcl"
                defaultValue={edit_field.desc_edit}
                onChange={(e) => handlewords(e)}
              />
            ) : (
              <Loader />
            )}
          </div>
          <div class="full_inn">
            <label>Deadline date </label>
            {edit_details.length > 0 ? (
              <input
                type="date"
                class="inputcl"
                defaultValue={edit_field.deadline_edit}
                onChange={onSetDate}
              />
            ) : (
              <Loader />
            )}
          </div>
          <button type="button" class="btn_go" onClick={handle_edit_submit}>
            Submit
          </button>
        </div>
      </div>
      <div class={"pop_sec_routing " + Activeclass_routing}>
        <button onClick={ClosePopUp_routing}>
          <i class="fa fa-close close_pop_routing"></i>
        </button>

        <div class="inner_pop">
          <div class="full_inn">
            <label>Subject</label>
            {edit_details.length > 0 ? (
              <input
                type="text"
                class="inputcl"
                value={edit_field.subject_edit}
                readOnly
              />
            ) : (
              <Loader />
            )}
          </div>
          <div class="row sdo">
            <div class="col-lg-12">
              <div class="scroll">
                <table class="web_tbl">
                  <thead>
                    {routing_history.length > 0 && (
                      <tr>
                        <th>Hod</th>
                        <th>Status</th>
                        <th>Processed_on</th>
                      </tr>
                    )}
                  </thead>
                  {routing_history.length > 0 ? (
                    <tbody>
                      {routing_history.map((item) => {
                        return (
                          <tr>
                            <td>{item.HOD_NAME}</td>
                            <td>{item.STATUS}</td>
                            <td>{item.PROCESSED_ON}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  ) : (
                    <Loader />
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class={"pop_sec top_50 " + Activeclass_delete}>
        <button onClick={ClosePopUp_delete}>
          <i class="fa fa-close close_pop"></i>
        </button>
        <div class="inner_pop">
          <div class="full_inn">
            <label>Subject</label>
            {edit_details.length > 0 ? (
              <input
                type="text"
                class="inputcl"
                value={edit_field.subject_edit}
                readOnly
              />
            ) : (
              <Loader />
            )}
          </div>
          <input
            type="text"
            class="inputcl"
            placeholder="Enter a valid reason"
            onChange={(e) => setdelete_reason(e.target.value)}
          />
          <button type="button" class="btn_go" onClick={handle_delete_submit}>
            Submit
          </button>
        </div>
      </div>
      <div class={"pop_sec top_50 " + Activeclass_ban}>
        <button onClick={ClosePopUp_ban}>
          <i class="fa fa-close close_pop"></i>
        </button>
        <div class="inner_pop">
          <div class="full_inn">
            <label>Subject</label>
            {edit_details.length > 0 ? (
              <input
                type="text"
                class="inputcl"
                value={edit_field.subject_edit}
                readOnly
              />
            ) : (
              <Loader />
            )}
          </div>
          <input
            type="text"
            class="inputcl"
            placeholder="Enter a valid reason"
            onChange={(e) => setban_reason(e.target.value)}
          />
          <button type="button" class="btn_go" onClick={handle_ban_submit}>
            Submit
          </button>
        </div>
      </div>

      <div class="body_inner">
        <div class="container">
          <div class="row sdo">
            <div class="col-lg-12">
              <button
                type="button"
                title="Add new task"
                class="add_task"
                onClick={handleAddTask}
              >
                <i class="fa fa-plus"></i> Add Task
              </button>
            </div>
            <div class="col-lg-2">
              <div class="label_input">
                <label id="lblfromdate">From Date</label>

                <input
                  className="rounded-md border-2 p-2 focus:border-blue-500 focus:bg-gray-200 focus:gray-200 w-full ml-2 mr-2"
                  type="date"
                  defaultValue={defaultValuefromdate}
                  onChange={handleFromdate}
                />
              </div>
            </div>
            <div class="col-lg-2">
              <div class="label_input">
                <label id="lblTodate">To Date</label>
                <input
                  className="rounded-md border-2 p-2 focus:border-blue-500 focus:bg-gray-200 focus:gray-200 w-full ml-2 mr-2"
                  type="date"
                  defaultValue={defaultValuetodate}
                  onChange={handleTodate}
                />
              </div>
            </div>

            <div class="col-lg-2">
              <div class="label_input">
                <label>HOD</label>
                <Select
                  options={hod_field}
                  onChange={setHandle}
                  isMulti
                  className="text-xl p-2  h-14"
                />
              </div>
            </div>
            <div class="col-lg-5">
              <div class="rdo_flx">
                <p>Status</p>
                <label>
                  <input
                    type="radio"
                    value="ALL"
                    name="status"
                    checked={status === "ALL"}
                    onChange={handleStatus}
                  />{" "}
                  All
                </label>
                <label>
                  <input
                    type="radio"
                    value="OPEN"
                    name="status"
                    checked={status === "OPEN"}
                    defaultChecked
                    onChange={handleStatus}
                  />{" "}
                  Open
                </label>
                <label>
                  <input
                    type="radio"
                    value="CLOSE"
                    name="status"
                    checked={status === "CLOSE"}
                    onChange={handleStatus}
                  />{" "}
                  Close
                </label>
                <label>
                  <input
                    type="radio"
                    value="INAPPROPRIATE"
                    name="status"
                    checked={status === "INAPPROPRIATE"}
                    onChange={handleStatus}
                  />{" "}
                  Inappropriate
                </label>
              </div>
            </div>
            <div class="col-lg-1">
              <div class="label_input">
                <label>
                  <br />
                </label>
                <button
                  type="button"
                  style={{ margin: "0 0 0 0" }}
                  class="go_btn"
                  onClick={handleSubmit}
                >
                  Go
                </button>
              </div>
            </div>
          </div>

          <div class="row sdo">
            <div class="col-lg-12">
              <Form>
                <InputGroup className="my-4">
                  <Form.Control
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search"
                  />
                </InputGroup>
              </Form>

              <div class="scroll">
                <table class="web_tbl">
                  <thead>
                    {display_details && (
                      <tr>
                        <th onClick={() => sorting("CREATED_ON")}>
                          Task Open Date{" "}
                        </th>
                        <th onClick={() => sorting("CREATED_BY")}>
                          Task Raised By
                        </th>
                        <th onClick={() => sorting("TASK_SUBJECT")}>Subject</th>
                        <th onClick={() => sorting("DEADLINE_DATE")}>
                          Deadline
                        </th>
                        <th
                          class="min_wid"
                          onClick={() => sorting("TASK_DESCRIPTION")}
                        >
                          Description
                        </th>
                        <th
                          class="min_wid2"
                          onClick={() => sorting("TASK_HODS")}
                        >
                          Assigned HODs
                        </th>
                        <th>Status</th>
                        <th>Pending Since(hrs)</th>
                        <th>Task Closure Date</th>
                        <th>Edit</th>
                      </tr>
                    )}
                  </thead>

                  {display_details !== [] && display_details.length > 0 ? (
                    <tbody>
                      {display_details
                        .filter((item) => {
                          return search.toLowerCase() === ""
                            ? item
                            : item.TASK_HODS.toLowerCase().includes(search) ||
                                item.TASK_SUBJECT.toLowerCase().includes(
                                  search
                                ) ||
                                item.CREATED_BY.toLowerCase().includes(
                                  search
                                ) ||
                                item.TASK_STATUS.toLowerCase().includes(
                                  search
                                ) ||
                                item.TASK_DESCRIPTION.toLowerCase().includes(
                                  search
                                ) ||
                                item.CREATED_ON.toLowerCase().includes(
                                  search
                                ) ||
                                item.PendingSince.toString()
                                  .toLowerCase()
                                  .includes(search);
                        })

                        .map((item, index) => {
                          return (
                            <tr key={item.WP_TASK_DATA_ID}>
                              <td>{item.CREATED_ON}</td>
                              <td>{item.CREATED_BY}</td>
                              <td>{item.TASK_SUBJECT}</td>
                              <td>{item.DEADLINE_DATE}</td>
                              <td>{item.TASK_DESCRIPTION}</td>
                              <td>{item.TASK_HODS}</td>
                              <td>{item.TASK_STATUS}</td>
                              <td>{item.PendingSince}</td>
                              <td>{item.Task_Closure_Date}</td>
                              <td align="center" width="100">
                                {item.ISEDIT === "N" ? (
                                  <button
                                    id={item.WP_TASK_DATA_ID}
                                    onClick={handleEditClick}
                                    hidden
                                  >
                                    <i
                                      class="fa fa-edit hovertext edit_cl click_edit"
                                      data-hover="EDIT"
                                      hidden
                                    ></i>
                                  </button>
                                ) : (
                                  <button
                                    id={item.WP_TASK_DATA_ID}
                                    onClick={handleEditClick}
                                  >
                                    <i class="fa fa-edit edit_cl click_edit"></i>
                                  </button>
                                )}

                                <button
                                  id={item.WP_TASK_DATA_ID}
                                  onClick={handlerouting}
                                >
                                  <i class="fa fa-eye routing"></i>
                                </button>

                                {item.ISEDIT === "N" ? (
                                  <button
                                    id={item.WP_TASK_DATA_ID}
                                    onClick={handleDeleteTask}
                                    hidden
                                  >
                                    <i
                                      class="fa fa-trash-o close_cl"
                                      hidden
                                    ></i>
                                  </button>
                                ) : (
                                  <button
                                    id={item.WP_TASK_DATA_ID}
                                    onClick={handleDeleteTask}
                                  >
                                    <i class="fa fa-trash-o close_cl"></i>
                                  </button>
                                )}
                                {item.ISCLOSE === "N" ? (
                                  <button
                                    id={item.WP_TASK_DATA_ID}
                                    onClick={handleinappropriate}
                                    hidden
                                  >
                                    <i class="fa fa-ban ban_cl" hidden></i>
                                  </button>
                                ) : (
                                  <button
                                    id={item.WP_TASK_DATA_ID}
                                    onClick={handleinappropriate}
                                  >
                                    <i class="fa fa-ban ban_cl"></i>
                                  </button>
                                )}
                                {item.ISCLOSE === "N" ? (
                                  <button
                                    id={item.WP_TASK_DATA_ID}
                                    onClick={(e) => handleCloseTask(e)}
                                    hidden
                                  >
                                    <i class="fa fa-edit end_task" hidden>
                                      {" "}
                                      Close task
                                    </i>
                                  </button>
                                ) : (
                                  <button
                                    id={item.WP_TASK_DATA_ID}
                                    onClick={(e) => handleCloseTask(e)}
                                  >
                                    <i class="fa fa-edit end_task">
                                      {" "}
                                      Close task
                                    </i>
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  ) : (
                    <div>
                      NO DATA FOUND
                      {/* <Loader /> */}
                    </div>
                  )}
                </table>
                {/* <Pagination
                  postsPerPage={postsPerPage}
                  totalPosts={display_details.length}
                  paginate={paginate}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasksummary;
