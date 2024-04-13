import axios from "axios"
import { useNavigate } from "react-router-dom"

function Home() {
  const navigate = useNavigate()
  axios.defaults.withCredentials = true;
  const handleLogout = () => {
    axios.get('http://localhost:3000/auth/logout/')
    .then(res => {
      if(res.data.status){
        navigate('/login')
      }
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <div>
      <h1 className="welcomeScreen">Welcome Khervyn</h1>
      <br/>
      <br/>
      <button onClick={handleLogout} className="logoutbtn">Logout</button>
    </div>

  )
}
export default Home