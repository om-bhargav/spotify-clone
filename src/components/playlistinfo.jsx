import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import db from "./firebase-config";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { CLOUDINARY_CONFIG } from './cloudinary';
const playlistinfo = function (props) {
  const { uid } = useParams();
  const [data, setData] = useState([]);
  const [song, setSong] = useState({ "name": "", "img": null, "song": null , "type": "music"});
  const { playlists, setPlaylists,index,setIndex } = props;
  const {currentPlaying,setCurrentSong} = props;
  const uploadSong = async () => {
    if (song.name.trim() === "" || !song.song) {
      return;
    }
    let img_url = "https://res.cloudinary.com/doogbpzvh/image/upload/v1750197199/default-image_smxfpw.png";
    if (song.img) {
      let fdata = new FormData();
      fdata.append("upload_preset", CLOUDINARY_CONFIG['upload_preset']);
      fdata.append("file", song.img);
      try {
        let res = await fetch(CLOUDINARY_CONFIG['cloudinary_image_url'], { method: "POST", body: fdata });
        let url = await res.json();
        img_url = url.secure_url;
      } catch (err) {
        console.log("Error Occoured!");
      }
    }
    let audio_url = "";
    let fmdata = new FormData();
    fmdata.append("upload_preset", CLOUDINARY_CONFIG['upload_preset']);
    fmdata.append("file", song.song);
    try {
      let res = await fetch(CLOUDINARY_CONFIG['cloudinary_audio_url'], { method: "POST", body: fmdata });
      let url = await res.json();
      audio_url = url.secure_url;
    } catch (err) {
      console.log("Error Occoured!");
    }
    let res = await addDoc(collection(db, "audios"), { "name": song.name, "img": img_url, "song": audio_url, "playlist": uid, "uploadedBy": props.user.name ,"type":song.type });
    props.setSongs([...props.songs,{ "name": song.name, "img": img_url, "song": audio_url, "playlist": uid, "uploadedBy": props.user.name ,"id":res.id ,"type":song.type}]);
    setSong({ "name": "", "img": null, "song": null ,"type":"music"});
  }
  useEffect(() => { setData(playlists[uid])}, [uid]);
  return (
    <>
      <div className="modal fade" data-bs-theme="dark" id="uploadSong" tabIndex="-1" aria-labelledby="uploadSongLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="uploadSongLabel">Create New Playlist</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">Enter Song Name:</label>
                  <input type="text" value={song.name} onChange={(e) => setSong({ ...song, "name": e.target.value })} className="form-control bg-dark text-light" />
                </div>
                <div className="mb-3">
                  <label htmlFor="formFile" className="form-label">Add Cover Image:</label>
                  <input className="form-control bg-dark text-light" value="" onChange={(e) => setSong({ ...song, "img": e.target.files[0] })} type="file" accept="image/*" />
                </div>
                <div className="mb-3">
                  <label htmlFor="formFile" className="form-label">Upload Song:</label>
                  <input className="form-control bg-dark text-light" value="" onChange={(e) => setSong({ ...song, "song": e.target.files[0] })} type="file" accept="audio/*" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Select Type Of Song:</label>
                  <div className="d-flex column-gap-2">

                    <div className="form-check">
                      <input className="form-check-input" checked={song.type === "music"} onChange={() => setSong({ ...song, "type": "music" })} type="radio" name="radioDefault" id="radioDefault1" />
                      <label className="form-check-label" htmlFor="radioDefault1">
                        Regular
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" checked={song.type === "podcast"} onChange={() => setSong({ ...song, "type": "podcast" })} type="radio" name="radioDefault" id="radioDefault2" />
                      <label className="form-check-label" htmlFor="radioDefault2">
                        Podcast
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" onClick={uploadSong} className="btn btn-success">Upload</button>
            </div>
          </div>
        </div>
      </div>
      <div className="container rounded pt-3" style={{ backgroundColor: '#121212' }}>
        <div className="header d-flex justify-content-between align-items-center">
          <h4>Playlist - {data.name}</h4>
          <div className="btns d-flex gap-4">
            <button className='d-behavior h6 text-center sbar rounded-circle glow' data-bs-toggle="modal" data-bs-target="#uploadSong"><i className="bi bi-upload"></i></button>
          </div>
        </div>
        <div className="body pt-2 d-grid row-gap-2">
          {
          props.songs.filter((item)=>item.playlist===uid).length>0?
          props.songs.filter((item)=>item.playlist===uid).map((item,ind)=><div className='song rounded d-flex justify-content-between align-items-center' key={item.id}>
            <div className="d-flex column-gap-2">
              <img src="/default-image.png" className="rounded" height="60" width="60" alt="" />
              <div>
                <h5 className="name">{item.name}</h5>
                <small>Uploaded By {item.uploadedBy}</small>
              </div>
            </div>
            <div className='d-flex align-items-center column-gap-2'>
              <button style={{ backgroundColor: "#1ed760" }} onClick={()=>setCurrentSong([item])} className='py-2 btn rounded-circle'><i className="h3 bi bi-play-fill"></i></button>
            </div>
          </div>):
          <div>No Songs Added!</div>
          }
        </div>
      </div>
    </>
  )
}

export default playlistinfo;