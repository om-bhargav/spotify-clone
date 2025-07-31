import React,{useState} from 'react'
import Newplaylist from './newplaylist';
import Currentplaying from './currentplaying';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
const maincontent = (props) => { 
  return (
    <div className='text-white p-3 column-gap-3 mb-5' style={{display: "grid",gridTemplateColumns: "25% 74%"}}>
    <Newplaylist user={props.user} playlists={props.playlists} setPlaylists={props.setPlaylists}/>
    <Outlet user={props.user}/>
    {/* <Currentplaying/> */}
    </div>
  )
}

export default maincontent;