import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const {token} = useParams()
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/auth/reset-password/"+token, {
        password,
      })
      .then((res) => {
        if (res.data.status) {
          navigate("/login");
        }
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        <label htmlFor="password">New Password : </label>
        <input
          type="password"
          placeholder="******"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Reset</button>
        <p>
          Click here to<Link to="/login"> Login</Link>
        </p>
      </form>
    </div>
  );
};

export default ResetPassword;
