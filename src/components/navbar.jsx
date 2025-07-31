import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const navbar = (props) => {
  
  const navigate = useNavigate();
  return (
    <>
    <div className="d-flex justify-content-between align-items-center px-4 py-2">
      <Link className="navbar-brand" to="/" title="Spotify">
        <img src={props.mlogo} width="35" height="35"/>
      </Link>
        <div className="subsec1 d-flex align-items-center gap-3">
          <Link title="Home" to="/" className='d-behavior sbar rounded-circle'><i className="bi bi-house-door text-light h4"></i></Link>
          <div className="input-group d-behavior rounded-pill d-flex">
            <button title="Search" className='bg-transparent' style={{padding:"10px 16px"}}><i className="bi bi-search h5"></i></button>
            <input className='bg-transparent sbar' onChange={(e)=>{props.sqm(e.target.value);navigate(`/search/${e.target.value}`)}} value={props.sq} style={{minWidth:"350px"}} placeholder='What do you want to play?' type="text" aria-label="Amount (to the nearest dollar)"/>
            <button title="Browse" className='bg-transparent' style={{padding:"10px 16px"}}><i className="bi bi-archive h5"></i></button>
          </div>
        </div>
        <div className="subsec2 d-flex gap-3 align-items-center">
        {props.isLoggedIn &&
        <>
        <button className="d-behavior h5 text-center sbar rounded-circle glow"><i className="bi bi-bell"></i></button>
         <div className="dropdown">
        <button className="text-center h5 rounded-circle glow" style={{backgroundColor:"lightpink",padding:"9px 13px"}} data-bs-toggle="dropdown" aria-expanded="false"><span className="text-light">{props.user.name[0]}</span></button>
           <ul className="dropdown-menu dropdown-menu-dark">
            <li><button className="dropdown-item" onClick={()=>{props.setIsLoggedIn(false);navigate("/");}}>Logout</button></li>
          </ul>
        </div>
        </>
        }
        </div>
      </div>
      </>
  )
}


export default navbar;