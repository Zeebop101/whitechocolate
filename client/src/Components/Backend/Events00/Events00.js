import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import "./Events00.scss";
import lineup1 from "./img/1.svg";
const Events00 = () => {
  const [file, setFile] = useState("");

  const [date, setDate] = useState("");

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");

  const [allEvents, setAllEvents] = useState();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    axios.get("https://whitechocolate.herokuapp.com/api/events/get-all").then((response) => {
      setAllEvents(response.data);
    });
  }, []);

  const handleAddEvent = () => {
    const formData = new FormData();
    formData.append("date", date);
    formData.append("title", title);
    formData.append("location", location);
    formData.append("file", file);
    axios
      .post("https://whitechocolate.herokuapp.com/api/events/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Event Added!");
      });
  };

  const handleAddAdmin = () => {
    axios
      .post("https://whitechocolate.herokuapp.com/api/admins/add", {
        name: name,
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.status === 201) toast.success("Admin Added!");
      });
  };

  return (
    <div className="events00">
      <Toaster />
      <div className="events00-overview">
        <div className="events00-single">
          <div className="events00-date">
            <p className="events00-month">APR</p>
            <p className="events00-day">26</p>
          </div>
        </div>

        <div className="events00-single">
          <div className="events00-date">
            <p className="events00-month">MAY</p>
            <p className="events00-day">14</p>
          </div>
        </div>

        <div className="events00-single">
          <div className="events00-date">
            <p className="events00-month">JUN</p>
            <p className="events00-day">11</p>
          </div>
        </div>

        <div className="events00-single">
          <div className="events00-date">
            <p className="events00-add">&#43;</p>
          </div>
        </div>
      </div>

      <div className="events00-data">
        <div className="events00-data-date">
          <p>Name:</p>
          <input type="text" onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="events00-data-title">
          <p>Username:</p>
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div className="events00-data-location">
          <p>Password:</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleAddAdmin}>Add Admin</button>
        <div className="events00-data-date">
          <p>Date:</p>
          <input type="date" onChange={(e) => setDate(e.target.value)} />
        </div>

        <div className="events00-data-title">
          <p>Title:</p>
          <input type="text" onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="events00-data-location">
          <p>Location:</p>
          <input type="text" onChange={(e) => setLocation(e.target.value)} />
        </div>
        <div class="mb-3">
          <label for="formFile" class="form-label">
            Image
          </label>
          <input
            class="form-control"
            type="file"
            id="formFile"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
        </div>
        <button onClick={handleAddEvent}>Add Event</button>
        {allEvents ? <img src={allEvents[3].image} /> : null}
        <div className="events00-data-comedian">
          <p>Comedian:</p>

          <div className="events00-data-single-comedian">
            <img src={lineup1} alt="" />
            <p>Comedian Name</p>
          </div>

          <div className="events00-data-single-comedian">
            <img src={lineup1} alt="" />
            <p>Comedian Name</p>
          </div>
        </div>

        <div className="events00-data-djs"></div>
      </div>
    </div>
  );
};

export default Events00;
