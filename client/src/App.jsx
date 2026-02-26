import './App.css'
import Content from './components/content'
import NavBar from './components/navBar'
import { Routes, Route } from "react-router-dom";
import SingleContent from './pages/singleContent';
import { useState } from 'react';
import Login from './pages/login';
import Favourites from './pages/favourites';

function App() {
const [search,setSearch]=useState("")
const [token, setToken] = useState(localStorage.getItem("token"));
  return (
    <>
    <NavBar search={search} setSearch={setSearch} token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<Content search={search} setSearch={setSearch} />} />
        <Route path="/content/:id" element={<SingleContent />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/login" element={<Login setToken={setToken}/>} />
      </Routes>     
    </>
  )
}

export default App
