import React, { useState } from "react";
import axios from "axios";

export default function Register() {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [age, setAge] = useState();
  const [country, setCountry] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [massage, setMassage] = useState(undefined);
  const register = () =>{
    axios
      .post(`http://localhost:5000/users`, {
        firstName,
        lastName,
        age,
        country,
        email,
        password,
      })
      .then((res) => {
        if (res.data.name) {
          setMassage(<div className="error"> Error happened while register, please try again</div>)
        }else{
          setMassage(<div className="success">The user has been created successfully</div>)
        }
        console.log(res.data.name);
      })
      .catch((err) => {
        console.log(err);
        
      });
    }
  return (
    <div className="register">
      <input
        type="text"
        placeholder="FirstName Here"
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
      />
      <br />
      <input
        type="text"
        placeholder="LastName Here"
        onChange={(e) => {
          setLastName(e.target.value);
        }}
      />
      <br />
      <input
        type="text"
        placeholder="Age Here"
        onChange={(e) => {
          setAge(e.target.value);
        }}
      />
      <br />
      <input
        type="text"
        placeholder="Country Here "
        onChange={(e) => {
          setCountry(e.target.value);
        }}
      />
      <br />
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
      <button onClick={register}>Register</button>
      {massage}
    </div>
  );
}
