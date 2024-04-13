import {useState } from "react";
import "../App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/auth/login", {
        email,
        password,
      })
      .then(res => {
        if(res.data.status){
          navigate('/')
        }        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
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
        <button type="submit">Login</button>
        <Link to={'/forgotPassword'} className="other-btn">Forgot Password</Link>
        <p>New User ?<Link to='/signup' className="other-btn"> Sign Up</Link></p>
      </form>
    </div>
  );
};