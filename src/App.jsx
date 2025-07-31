import Home from './components/home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Featured from './components/featured';
import Search from './components/search';
import { useState } from 'react';
import PlayListInfo from './components/playlistinfo';
import { Authentication } from './components/Authentication';
import { useEffect } from 'react';
import db from "./components/firebase-config";
import { collection, getDocs } from "firebase/firestore";
function App() {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showType, setShowType] = useState("all");
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState({});
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const [index, setIndex] = useState(0);
  const [shuffle,setShuffle] = useState(false);
  const [repeat,setRepeat] = useState(false);
  const setCurrentSong = (data) => {
    setCurrentPlaying(data);
  }
  const nextSong = () => {
    setIndex((index + 1) % currentPlaying.length);
  }
  const prevSong = () => {
    setIndex((index-1+currentPlaying.length)%currentPlaying.length);
  }
  useEffect(() => {
    let items = getDocs(collection(db, "audios"));
    items.then((res) => {
      let data = [];
      res.forEach((item) => {
        data.push({ ...item.data(), "id": item.id });
      });
      setSongs(data);
    });
    let plays = getDocs(collection(db, "playlists"));
    plays.then((res) => {
      let obj = {};
      res.forEach((item) => {
        obj[item.id] = { ...item.data(), "id": item.id };
      });
      setPlaylists(obj);
    });
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home index={index} nextSong={nextSong} prevSong={prevSong} shuffle={shuffle} setShuffle={setShuffle} setRepeat={setRepeat} repeat={repeat} currentPlaying={currentPlaying} setSong={setCurrentSong} playlists={playlists} setPlaylists={setPlaylists} user={user} setUsers={setUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> : <Authentication setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} >
            <Route index element={<Featured currentPlaying={currentPlaying} index={index} setCurrentSong={setCurrentSong} showType={showType} songs={songs} setShowType={setShowType} />} />
            <Route path="playlist/:uid/" element={<PlayListInfo index={index} setIndex={setIndex} currentPlaying={currentPlaying} setCurrentSong={setCurrentSong} playlists={playlists} setPlaylists={setPlaylists} user={user} songs={songs} setSongs={setSongs} />} />
            <Route path="search">
              <Route index element={<Featured currentPlaying={currentPlaying} index={index} setCurrentSong={setCurrentSong} showType={showType} songs={songs} setShowType={setShowType} />} />
              <Route path=":searchQuery" element={<Search currentPlaying={currentPlaying} setSong={setCurrentSong} songs={songs} />} />
            </Route>
            <Route path="filter/:category" />
          </Route>
          {/* <Route path="/home" element={<Home />} /> */}
          {/* <Route path="/login" element={<Home />} />
        <Route path="/signup" element={<Home />} />
        <Route path="/about" element={<Home />} />
        <Route path="/contact" element={<Home />} />
        <Route path="/playlist" element={<Home />} />
        <Route path="/search" element={<Home />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
