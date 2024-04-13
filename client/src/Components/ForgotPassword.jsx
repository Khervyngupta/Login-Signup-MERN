import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/auth/forgot-password", {
        email,
      })
      .then((res) => {
        if (res.data.status) {
          alert("Password reset link sent to registered email.");
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        <label htmlFor="email">Email : </label>
        <input
          type="email"
          autoComplete="off"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Send</button>
        <p>
          Click here to<Link to="/login" className="other-btn"> Login</Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
