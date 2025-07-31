import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import db from "./firebase-config";
import { collection, addDoc, getDocs, doc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from 'react';
import { CLOUDINARY_CONFIG } from './cloudinary';
const newplaylist = (props) => {
  const [playInfo, setPlayInfo] = useState({ "name": "", "img": null });
  const { playlists, setPlaylists } = props;
  const createPlaylist = async () => {
    if (playInfo.name.trim() === "") {
      toast.warn("Please enter a playlist name");
      return;
    }
    try {
      let img_url = "https://res.cloudinary.com/doogbpzvh/image/upload/v1750197199/default-image_smxfpw.png";
      if(playInfo.img){
        let fdata = new FormData();
        fdata.append("upload_preset", CLOUDINARY_CONFIG['upload_preset']);
        fdata.append("file", song.img);
        try {
          let resp = await fetch(CLOUDINARY_CONFIG['cloudinary_image_url'], { method: "POST", body: fdata });
          let url = await resp.json();
          img_url = url.secure_url;
        } catch (err) {
          console.log("Error Occoured!");
        }
      }
      let send_data = { name: playInfo.name, img: img_url, createdBy: props.user.email, createdAt: Date.now() };
      let res = await addDoc(collection(db, "playlists"), send_data);
      toast.success("Playlist created successfully");
      setPlayInfo({ "name": "", "img": null});
      setPlaylists({...playlists,[res.id]:{"id":res.id,...send_data}});
    } catch (error) {
      console.error("Error creating playlist: ", error);
    }
  };
  return (
    <>
      <div className="modal fade" data-bs-theme="dark" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Create New Playlist</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">Enter Playlist Name:</label>
                  <input type="text" value={playInfo.name} onChange={(e) => setPlayInfo({ ...playInfo, "name": e.target.value })} className="form-control bg-dark text-light" id="recipient-name" />
                </div>
                <div className="mb-3">
                  <label htmlFor="formFile" className="form-label">Add Cover Image:</label>
                  <input className="form-control bg-dark text-light" onChange={(e) => setPlayInfo({ ...playInfo, "img": e.target.files[0] })} type="file" accept="image/*" id="formFile" />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" onClick={createPlaylist} className="btn btn-success">Create</button>
            </div>
          </div>
        </div>
      </div>
      <div className='d-flex flex-column p-3 rounded row-gap-2 position-sticky top-0' style={{ backgroundColor: "#111111", height: "100vh" }}>
        <div className="sec d-flex column-gap-5 align-items-center justify-content-between">
          <h4 className='text-white'>Your Library</h4>
          <button className='d-behavior h6 text-center sbar rounded-circle glow' data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="bi bi-plus-lg"></i></button>
        </div>
        <div className="sec"><h5 className='text-secondary'>Create a new playlist</h5></div>
        <div className="sec">
          <div className="list-group row-gap-2">
            {
              Object.keys(playlists).length > 0 ?
              Object.keys(playlists).map((kk,ind) => {
                  const item = playlists[kk];
                  return (<Link to={`/playlist/${item.id}/`} key={item.id} className="bg-transparent border-0 p-0 list-group-item list-group-item-action text-light">
                    <div className="d-behavior p-1 listitem d-flex align-items-center gap-3 bg-transparent rounded">
                      <div className="img"><img src={item.img} className="rounded" height="50" width="50" /></div>
                      <div className="txt d-flex flex-column">
                        <h6 className="text-light">{item.name}</h6>
                        <h6 className='text-secondary'>Playlist #{ind+1}</h6>
                      </div>
                    </div>
                  </Link>)
                }) : <h3>No Playlist Created!</h3>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default newplaylist;