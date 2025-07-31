import React from 'react'
import { useParams } from 'react-router-dom';
import { useDocumentTitle } from './customhooks/useDocumentTitle';
const search = ({songs}) => {
    useDocumentTitle("Spotify - Search");
    const { searchQuery } = useParams();
  return (
    <div className="px-4 py-3 rounded d-flex flex-column gap-3" style={{backgroundColor: '#121212'}}>
    <h5>Related Matches For Search - {searchQuery}</h5>
    <div className="songs row row-gap-2">
    {songs.filter((item)=>{
      return item.name.toLowerCase().includes(searchQuery.toLowerCase());
    }).length>0?
        songs.filter((item)=>{
          return item.name.toLowerCase().includes(searchQuery.toLowerCase());
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
            <div className="duration">3:40</div>
            <button style={{backgroundColor:"#1ed760"}} className='py-2 btn rounded-circle'><i className="h3 bi bi-play-fill"></i></button>

            </div>
          </div>
        ):<h5>No Matches Found For - {searchQuery}!</h5>
      }
      </div>
      </div>
  )
}

export default search;