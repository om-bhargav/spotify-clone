import React, { useState } from 'react';
import { toast } from "react-toastify";
import db from "./firebase-config";
import "react-toastify/dist/ReactToastify.css";
import { collection, addDoc, getDocs, setDoc, doc, getDoc, query, where } from "firebase/firestore";
export const Authentication = (props) => {
    const [regInfo, setregInfo] = useState({ "name": "", "email": "", "pass": "", "cpass": "" });
    const [logInfo, setlogInfo] = useState({ "email": "", "pass": "" });
    const registerHandler = async () => {
        if (regInfo.name.trim() === "" || regInfo.email.trim() === "" || regInfo.pass.trim() === "" || regInfo.cpass.trim() === "") {
            toast.error("Please fill all the fields");
            return;
        } else if (regInfo.pass !== regInfo.cpass) {
            toast.error("Passwords do not match");
            return;
        }
        await setDoc(doc(db, "users", regInfo.email), {
            name: regInfo.name,
            email: regInfo.email,
            password: regInfo.pass,
        })
        setregInfo({ "name": "", "email": "", "pass": "", "cpass": "" });
        toast.success("Registration Successful! Login Now");
    }
    const loginHandler = async () => {
        if (logInfo.email.trim() === "" || logInfo.pass.trim() === "") {
            toast.error("Please fill all the fields");
            return;
        }
        let snap = await getDoc(doc(db, "users", logInfo.email));
        if (!snap.exists() || snap.data().password !== logInfo.pass) {
            toast.error("User does not exist");
            return;
        }
        props.setIsLoggedIn(true);
        props.setUser(snap.data());
        setlogInfo({ "email": "", "pass": "" });
    }
    const [selected, setSelected] = useState("login");
    return (
        <>
            <div className="container d-flex justify-content-center align-items-center flex-column" style={{"height":"100vh"}}>
                <div className="sub-container min-vh-75  border border-secondary p-4 text-center" data-bs-theme="dark" style={{"minWidth":"35%"}}>            
                    <div className="btns row border-bottom border-dark">
                        <input type="button" className={`col bg-${selected==="login"?"success":"dark"} h5 p-2 mb-0`} onClick={() => setSelected("login")} value="Login" />
                        <input type="button" className={`col bg-${selected==="signup"?"success":"dark"} h5 p-2 mb-0 border-start border-dark`} onClick={() => setSelected("signup")} value="Signup" />
                    </div>
                    <img src="logo.png" alt="" />
                    <div className="content d-grid gap-4">
                    {
                        selected==="login"?
                       (<>
                       <input type="email" value={logInfo.email} onChange={(e)=>setlogInfo({...logInfo,"email":e.target.value})} name="lemail" className='form-control' placeholder='Enter Your Email' />
                       <input type="password" value={logInfo.pass} onChange={(e)=>setlogInfo({...logInfo,"pass":e.target.value})} name="lpass" className='form-control' placeholder='Enter Your Password' />
                       <input type="button" onClick={loginHandler} name="login" className='btn btn-success' value="Login" />
                       </>):
                       (<>
                       <input type="text" value={regInfo.name} onChange={(e)=>setregInfo({...regInfo,"name":e.target.value})} name="sname" className='form-control' placeholder='Enter Your Name' />
                       <input type="email" value={regInfo.email} onChange={(e)=>setregInfo({...regInfo,"email":e.target.value})} name="semail" className='form-control' placeholder='Enter Your Email' />
                       <input type="password" value={regInfo.pass} onChange={(e)=>setregInfo({...regInfo,"pass":e.target.value})} name="spass" className='form-control' placeholder='Enter Your Password' />
                       <input type="password" value={regInfo.cpass} onChange={(e)=>setregInfo({...regInfo,"cpass":e.target.value})} name="scpass" className='form-control' placeholder='Confirm Your Password' />
                       <input type="button" onClick={registerHandler} name="signup" className='btn btn-success' value="Signup" />
                       </>)
                    }
                </div>
            </div>
        </div>
        </>
    )
}
