import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const AdminLoginView = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    axios
      .post("https://whitechocolate.herokuapp.com/api/admins/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        localStorage.setItem("currentUser", JSON.stringify(response.data));
        toast.success("Admin Logged in!");
        navigate("/admin-dashboard");
      })
      .catch((err) => {
        if (!err.response.data.isUsernameMatch)
          toast.error("Incorrect Username!");
        // console.log(err.response.data);
        else toast.error("Incorrect Password!");
      });
  };

  return (
    <div className="container">
      <Toaster />
      <form>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Username
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => setUsername(e.target.value)}
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" />
          <label class="form-check-label" for="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" class="btn btn-primary" onClick={handleLogin}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdminLoginView;
