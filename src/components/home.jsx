import Navbar from "./navbar";
import Musicbar from "./musicbar";
import { useEffect, useState } from "react";
import Maincontent from "./maincontent";
import logo from "/mlogo.svg";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useDocumentTitle } from "./customhooks/useDocumentTitle";
import { Authentication } from "./Authentication";
const home = (props) => {
  const [vol, setVolume] = useState(100);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(1);
  const [onPause, setOnPause] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { currentPlaying, setCurrentSong,index } = props;
  useDocumentTitle("Spotify - Web Player: Music for everyone");
  const changeVol = (val) => {
    let audio = document.getElementById("audio");
    setVolume(val);
    audio.volume = val / 100;
  };
  const updateTime = () => {
    let audio = document.getElementById("audio");
    setTime(audio.currentTime);
    if (audio.ended) {
      setOnPause(true);
      setTime(0);
    }
  };
  const closeBtn = ({ closeToast }) => {
    return (
      <i
        className="bi bi-x h4 text-black text-end ms-auto mb-0"
        onClick={closeToast}
      ></i>
    );
  };
  useEffect(()=>{
    
    setOnPause(true);
    document.getElementById("audio").load();
  },[currentPlaying])
  return (
    <>
      <ToastContainer closeButton={closeBtn} autoClose={3000} />
      <audio
        className="text-light"
        onCanPlay={(e) => setDuration(e.target.duration)}
        onTimeUpdate={() => updateTime()}
        id="audio"
      >
        <source src={currentPlaying === null ? "none" : currentPlaying[props.index].song} type="audio/mpeg" />
      </audio>
      <Navbar
        sq={searchQuery}
        sqm={setSearchQuery}
        mlogo={logo}
        user={props.user}
        setUser={props.setUser}
        isLoggedIn={props.isLoggedIn}
        setIsLoggedIn={props.setIsLoggedIn}
      />
      <Maincontent
        playlists={props.playlists}
        setPlaylists={props.setPlaylists}
        user={props.user}
        setUser={props.setUser}
        isLoggedIn={props.isLoggedIn}
        setIsLoggedIn={props.setIsLoggedIn}
        currentPlaying={currentPlaying}
        setCurrentSong={setCurrentSong}
      />
      <Musicbar
        nextSong={props.nextSong} prevSong={props.prevSong} shuffle={props.shuffle} setShuffle={props.setShuffle} setRepeat={props.setRepeat} repeat={props.repeat}
        index={props.index}
        currentPlaying={currentPlaying}
        vol={vol}
        volmethod={changeVol}
        play={onPause}
        playm={setOnPause}
        tm={time}
        sttm={setTime}
        dura={duration}
        playlists={props.playlists}
      />
    </>
  );
};

export default home;
