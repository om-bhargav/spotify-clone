import React from 'react'
import { Link } from 'react-router-dom';
const featured = (props) => {
  const {currentPlaying,setCurrentSong} = props;
  return (
    <>
    <div className="px-4 py-3 rounded d-flex flex-column gap-3" style={{backgroundColor: '#121212'}}>
      <div className="nbar d-flex column-gap-3 align-items-center p-2">
        <button onClick={()=>props.setShowType("all")} className={props.showType==="all"?"bg-light text-dark text-decoration-none rounded-pill px-3 py-2":"bg-dark text-light text-decoration-none rounded-pill px-3 py-2"}>All</button>
        <button onClick={()=>props.setShowType("music")} className={props.showType==="music"?"bg-light text-dark text-decoration-none rounded-pill px-3 py-2":"bg-dark text-light text-decoration-none rounded-pill px-3 py-2"}>Music</button>
        <button onClick={()=>props.setShowType("podcast")} className={props.showType==="podcast"?"bg-light text-dark text-decoration-none rounded-pill px-3 py-2":"bg-dark text-light text-decoration-none rounded-pill px-3 py-2"}>Podcast</button>
      </div>
      
      <div className="songs row row-gap-2">
      {
        props.songs.filter((item)=>{
          if(props.showType==="all"){
            return true;
          }else{
            return item.type===props.showType;
          }
        }).length>0?
        props.songs.filter((item)=>{
          if(props.showType==="all"){
            return true;
          }else{
            return item.type===props.showType;
          }
        }).map((item)=>
          <div className='song rounded d-flex justify-content-between align-items-center' key={item.id}>
            <div className="d-flex column-gap-2">
            <img src={item.img} className="rounded" height="60" width="60" alt="" />
              <div>
              <h5 className="name">{item.name}</h5>
              <small>Uploaded By {item.uploadedBy}</small>
              </div>
            </div>
            <div className='d-flex align-items-center column-gap-2'>
            <button style={{backgroundColor:"#1ed760"}} onClick={()=>setCurrentSong([item])} className='py-2 btn rounded-circle'><i className="h3 bi bi-play-fill"></i></button>

            </div>
          </div>
        ):<h4 class="text-center">No Audio Available!</h4>
      }
      </div>
    <hr />
    <footer>
     <div className='d-flex justify-content-between flex-wrap p-4'>
      <div className='d-flex flex-column gap-3'>
      <h4>Company</h4>
      <Link to="/">About</Link>
      <Link to="/">Jobs</Link>
      <Link to="/">For the Record</Link>
      </div>

      <div className='d-flex flex-column gap-3'>
            <h4>Communities</h4>
            <Link to="/">For Artists</Link>
            <Link to="/">Developers</Link>
            <Link to="/">Advertising</Link>
            <Link to="/">Investors</Link>
            <Link to="/">Vendors</Link>
      </div>
      <div className='d-flex flex-column gap-3'>
            <h4>Useful links</h4>
            <Link to="/">Support</Link>
            <Link to="/">Free Mobile App</Link>
      </div>
      <div className='d-flex flex-column gap-3'>
      <h4>Spotify Plans</h4>
      <Link to="/">Premium Individual</Link>
      <Link to="/">Premium Duo</Link>
      <Link to="/">Premium Family</Link>
      <Link to="/">Premium Student</Link>
      <Link to="/">Spotify Free</Link>
      </div>
     </div>
      <div className='d-flex justify-content-between p-4'>
      <div className='d-flex flex-wrap gap-3'>
      <Link to="/">Legal</Link>
      <Link to="/">Safety & Privacy Center</Link>
      <Link to="/">Privacy Policy</Link>
      <Link to="/">Cookies</Link>
      <Link to="/">About Ads</Link>
      <Link to="/">Accessibility</Link>
      </div>
      <p>&copy; 2025 Spotify AB</p>
      </div>
          </footer>
    </div>
    </>
  )
}

export default featured;