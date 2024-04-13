import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../App.css";

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/auth/signup", {
        username,
        email,
        password,
      })
      .then(res => {
        if(res.data.status){
          navigate('/login')
        }        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <label htmlFor="username">Username : </label>
        <input
          type="text"
          placeholder="User Name"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="email">Email : </label>
        <input
          type="email"
          autoComplete="off"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password : </label>
        <input
          type="password"
          placeholder="******"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Sign Up</button>
        <p>Existing User ?<Link to='/login' className="other-btn"> Login</Link></p>
      </form>
    </div>
  );
};
