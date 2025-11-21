
import './App.css'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import AddPost from './Pages/AddPost'
import AllUser from './Pages/AllUser'
import Profile from './Pages/Profile'
import { BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/addpost" element={<AddPost/>}/>
        <Route path="/alluser" element={<AllUser/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
