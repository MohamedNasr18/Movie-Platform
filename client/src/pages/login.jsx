import { useState } from "react";
import '../index.css'
import axios from "axios";
import { useRef } from "react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
const Login = ({setToken})=>{
    const navigate = useNavigate();
    const inputRef = useRef(null)
    useEffect(()=>{ 
            inputRef.current.focus()
    },[])
  const [activeTab, setActiveTab] = useState("login");
  const [form, setForm] = useState({email:"",password:""});
  const [registerForm, setRegisterForm] = useState({name:"",email:"",password:"",poster:""});

  const handleLogin=async()=>{
 try{
     const res= await axios.post(`${import.meta.env.VITE_API_URL}/users/login`,form)
     const token = res.data.token;
     setToken(token)
     localStorage.setItem("token",token)
     alert(res.data.message)
     navigate('/')
 }catch(err){
 console.log(err);
       alert(err.response?.data?.message || "Login failed");

 }
  }
 const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setRegisterForm({
      ...registerForm,
      poster: file
    });
  }
};
  const handleSignUp = async () => {
  const formData = new FormData();

  formData.append("name", registerForm.name);
  formData.append("email", registerForm.email);
  formData.append("password", registerForm.password);

  if (registerForm.poster) {
    formData.append("poster", registerForm.poster);
  }

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/users/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
         const token = res.data.token;
    setToken(token)
    localStorage.setItem("token",token)
    alert("signed up successfully");
    navigate('/')
  } catch (err) {
    console.log(err.response?.data || err.message);
    alert(err.response?.data?.message || "Signup failed");
  }
};
    return(
        <>
         <div className="auth-container flex flex-col md:flex-row justify-center items-stretch mt-10 mb-5">
              <div className="auth-left bg-[#1e1e1e] w-full md:w-[600px] p-6 text-white">
      
      {/* Tabs */}
      <div className="relative">
        <div className="flex justify-between text-center text-lg font-semibold">
          <button
            onClick={() => setActiveTab("login")}
            className="w-1/2 py-2"
          >
            Login
          </button>

          <button
            onClick={() => setActiveTab("signup")}
            className="w-1/2 py-2"
          >
            Sign Up
          </button>
        </div>

        {/* Line */}
        <div className="h-[2px] bg-gray-700 w-full mt-2 relative">
          <div
            className={`absolute top-0 h-[2px] active-line transition-all duration-300 ${
              activeTab === "login" ? "left-0 w-1/2" : "left-1/2 w-1/2"
            }`}
          ></div>
        </div>
      </div>

      {/* Form */}
      <form className="mt-8 space-y-5" onSubmit={(e)=>{e.preventDefault();

    if (activeTab === "login") {
      handleLogin();
    } else if(activeTab === "signup"){
        handleSignUp();
    }
  }} on>
        
        {/* Full Name (Only Sign Up) */}
        {activeTab === "signup" && (
          <div>
            <label className="block text-base font-semibold text-white mb-2 text-left">
              Full Name
            </label>
            <input
              type="text"
              value={registerForm.name}
              onChange={(e)=>{setRegisterForm({...registerForm,name:e.target.value})}}
              className="w-full bg-[#2a2a2a] border border-gray-700 rounded-lg px-3 py-2 outline-none focus:border-red-500"
            />
          </div>
        )}

        {/* Email */}
        <div>
          <label className="block text-base font-semibold text-white mb-2 text-left">
            Email
          </label>
          <input
            type="email"
            ref={inputRef}
            value={activeTab === "login"
      ? form.email
      : registerForm.email}
            onChange={activeTab==="login"?(e)=>{setForm({...form, email: e.target.value})}:
            (e)=>{setRegisterForm({...registerForm, email: e.target.value})}}
            className="w-full bg-[#2a2a2a] border border-gray-700 rounded-lg px-3 py-2 outline-none focus:border-red-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-base font-semibold text-white mb-2 text-left">
            Password
          </label>
          <input
            type="password"
            value={activeTab==="login"?form.password:registerForm.password}
            onChange={activeTab==="login"?(e)=>{setForm({...form, password: e.target.value})}:
        (e)=>{setRegisterForm({...registerForm, password: e.target.value})}}
            className="w-full bg-[#2a2a2a] border border-gray-700 rounded-lg px-3 py-2 outline-none focus:border-red-500"
          />
        </div>

        {/* Profile Picture (Only Sign Up) */}
        {activeTab === "signup" && (
          <div>
            <label className="block text-base font-semibold text-white mb-2 text-left">
              Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="  w-full text-sm text-white
         file:mr-4 file:py-2 file:px-4
         file:rounded-full file:border-0
         file:text-sm file:font-semibold
         file:bg-gradient-to-br file:from-[#e60023] file:to-[#ff416c] file:text-white
         hover:file:from-[#ff1a3b] hover:file:to-[#ff5f82]
         transition-all duration-300"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className=" cursor-pointer submit-btn w-full bg-red-600 hover:bg-red-700 transition py-2 rounded-lg font-semibold mt-4"
        >
          {activeTab == "login" ? "Login" : "Create Account"}
        </button>

      </form>
    </div>


             <div className="auth-right bg-gradient-to-br from-gray-800 to-gray-900 w-full md:w-[600px] p-8 text-white flex flex-col justify-center">
    
    <h2 className="text-3xl font-bold mb-4">
      Join Our World of Cinema 🎬
    </h2>

    <p className="text-white/60 mb-6">
      Discover unlimited entertainment and experience movies like never before.
    </p>

    <ul className="space-y-4 text-white/80">
      <li className="flex items-center gap-3">
        <span className="text-red-500 text-lg">✔</span>
        Unlimited Movies & Series
      </li>

      <li className="flex items-center gap-3">
        <span className="text-red-500 text-lg">✔</span>
        HD & 4K Streaming Quality
      </li>

      <li className="flex items-center gap-3">
        <span className="text-red-500 text-lg">✔</span>
        Personalized Recommendations
      </li>

      <li className="flex items-center gap-3">
        <span className="text-red-500 text-lg">✔</span>
        Watch Anywhere, Anytime
      </li>
    </ul>

  </div>
        </div>
        </>
    )
}
export default Login;