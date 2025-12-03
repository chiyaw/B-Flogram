import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

    const [user, setUser] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Sending:', {user});
        axios.post('http://localhost:3001/api/register', {user, password})
        .then(result => {
            console.log('✅ Success');
            navigate('/login')
            alert('Registration successful!');
        })
        .catch(err => {
            console.error('❌ Error:', err.response);
            alert('Registration failed: ' + (err.response || err.message));
        })
    }

    return (
        <div className="flex flex-col  h-screen w-screen items-center justify-center bg-[url(./assets/register.jpeg)] bg-cover bg-center bg-no-repeat">

            <div className='h-120 w-100 gap-6 flex flex-col items-center rounded-xl backdrop-blur-md bg-orange-100/50 divide-y-3 divide-solid divide-black'>

                <div className="text-[35px] m-3 p-3">Register</div>

                <div>

                    <div>
                        <div className="mx-3 ">UserID</div>
                        <input type="text" placeholder="Enter UserID" className="mx-3 mb-3 p-3 rounded-xl bg-orange-100/50 w-80"  onChange={(e)=> setUser(e.target.value)}/>
                    </div>

                    <div>
                        <div className="mx-3 ">Password</div>
                        <input type="text" placeholder="Enter Password" className="mx-3 mb-3 p-3 rounded-xl bg-orange-100/50 w-80" onChange={(e)=> setPassword(e.target.value)} />
                    </div>

                    {/* <div>
                        <div className="mx-3 ">Confirm Password</div>
                        <input type="text" placeholder="Re-Enter Password" className="mx-3 mb-3 p-3 rounded-xl bg-orange-100/50 w-80" />
                    </div> */}

                    <div className="flex rounded-xl mx-auto mt-2 mb-6 p-2 bg-orange-100/50 w-30 items-center justify-center flex-col hover:bg-green-200/25 hover:scale-110 ease-in-out transition delay-75 duration-150 ">
                        <button type="button" onClick={handleSubmit}>Submit</button>
                    </div>

                </div>

                <div className="mb-3 mt-2 flex flex-col justify-center items-center" >
                    <p>If you have account</p>
                    <p> <a className="text-orange-600 no-underline hover:underline" href="/login"> Click Here</a> to Login</p>
                </div>


            </div>
        </div>
    );
}

export default Register;
