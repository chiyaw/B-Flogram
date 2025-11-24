import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [user, setUser] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3001/login', { user, password })
      .then(result => {
        console.log('✅ Success');
        if (result.data.message === "Success") {
          localStorage.setItem('userId', result.data.userId)
          navigate('/')
        } else {
          alert(result.data.message);
        }
      })
      .catch(err => {
        console.error('❌ Error:', err.response);
        alert('Login failed: ' + (err.response || err.message));
      })
  }

  return (
    <div className="flex flex-col  h-screen w-screen items-center justify-center bg-[url(./assets/login.jpeg)] bg-cover bg-center bg-no-repeat">

      <div className='h-120 w-100 gap-6 flex flex-col items-center rounded-xl backdrop-blur-md bg-orange-100/50 divide-y-3 divide-solid divide-black'>

        <div className="text-[35px] m-3 p-3">Login</div>

        <div>

          <div>
            <div className="mx-3 ">UserID</div>
            <input type="text" placeholder="Enter Your UserID" className="mx-3 mb-3 p-3 rounded-xl bg-orange-100/50 w-80" onChange={(e) => setUser(e.target.value)} />
          </div>

          <div>
            <div className="mx-3 ">Password</div>
            <input type="text" placeholder="Enter Your Password" className="mx-3 mb-3 p-3 rounded-xl bg-orange-100/50 w-80" onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="flex rounded-xl mx-auto mt-2 mb-6 p-2 bg-orange-100/50 w-30 items-center justify-center flex-col hover:bg-green-200/25 hover:scale-110 ease-in-out transition delay-75 duration-150 ">
            <button type="button" onClick={handleSubmit}>Submit</button>
          </div>

        </div>

        <div className="mb-3 mt-2 flex flex-col justify-center items-center" >
          <p>If you don't have account</p>
          <p> <a className="text-orange-600 no-underline hover:underline" href="/register"> Click Here</a> to Register</p>
        </div>


      </div>
    </div>
  );
}

export default Login;
