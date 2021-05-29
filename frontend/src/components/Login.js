import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function Login(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [massage, setMassage] = useState(undefined);
  const history = useHistory();
  const login = () => {
    axios
      .post(`http://localhost:5000/login`, {
        email,
        password,
      })
      .then((res) => {
        props.token(res.data.token);
        history.push("/dashboard");
      })
      .catch((err) => {
        if (err == "Error: Request failed with status code 404") {
          setMassage(<div className="error"> The email doesn't exist</div>);
        } else {
          setMassage(
            <div className="success">
              The password you've entered is incorrect{" "}
            </div>
          );
        }
        console.log(err);
      });
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Email Here"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <br />
      <input
        type="password"
        placeholder="Password Here"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <br />
      <button onClick={login}>LOGIN</button>
      {massage}
    </div>
  );
}
