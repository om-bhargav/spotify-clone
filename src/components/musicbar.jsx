import * as React from "react";
const playMusic = () => {
  let audio = document.getElementById("audio");
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
};
const mousedown = () => {
  let audio = document.getElementById("audio");
  audio.pause();
};
const mouseup = () => {
  let audio = document.getElementById("audio");
  audio.play();
};
const changeHandler = (e) => {
  let audio = document.getElementById("audio");
  audio.currentTime = (e.target.value * audio.duration) / 100;
};
const musicbar = (props) => {
  const {currentPlaying,index} = props;
  return (
    <>
      <div
        className="modal fade"
        id="exampleModal1"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content bg-dark text-light">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel1">
               {currentPlaying===null?"-----":currentPlaying[index].name}
              </h1>
              <button
                type="button"
                className="btn-close text-light bg-light"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body d-flex justify-content-center align-items-center">
              <img src={currentPlaying===null?"/default.png":currentPlaying[index].img} className="rounded" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="position-fixed bottom-0 d-flex py-2 px-3 w-100 justify-content-between align-items-center bg-dark" style={{zIndex:9999}}>
        <div className="songinfo d-flex align-items-center gap-3">
          <button
            className="bg-transparent"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal1"
          >
            <img
              src="/default-image.png"
              className="rounded"
              height="50"
              width="50"
            />
          </button>
          <div className="moreinfo row">
            <div className="name">{currentPlaying===null?"-----":currentPlaying[index].name}</div>
            <div className="playlist">
              <small>{currentPlaying===null?"-----":currentPlaying[index].playlist}</small>
            </div>
          </div>
        </div>
        <div className="audiocontrols d-flex justify-content-center align-items-center flex-column gap-1">
          <div className="fcol d-flex gap-2">
            <button className={currentPlaying===null?"bg-transparent sbar":"bg-transparent sbar glow"} disabled={currentPlaying===null}>
              <i className="h5 bi bi-shuffle"></i>
            </button>
            <button className={currentPlaying===null?"bg-transparent sbar":"bg-transparent sbar glow"} disabled={currentPlaying===null}>
              <i className="h4 bi bi-skip-start-fill"></i>
            </button>
            <button 
              disabled={currentPlaying===null}
              className="bg-light rounded-circle sbar"
              title={props.play ? "Play" : "Pause"}
              onClick={() => {
                props.playm(!props.play);
                playMusic();
              }}
            >
              {props.play ? (
                <i className="h4 bi bi-play-fill text-dark"></i>
              ) : (
                <i className="h4 bi bi-pause-fill text-dark"></i>
              )}
            </button>
            <button className={currentPlaying===null?"bg-transparent sbar":"bg-transparent sbar glow"} disabled={currentPlaying===null}>
              <i className="h4 bi bi-skip-end-fill"></i>
            </button>
            <button className={currentPlaying===null?"bg-transparent sbar":"bg-transparent sbar glow"} onClick={()=>props.setRepeat(!props.repeat)} disabled={currentPlaying===null}>
              <i className="h5 bi bi-repeat"></i>
            </button>
          </div>
          <div className="scol d-flex gap-3 justify-content-center align-items-center">
            <div className="stime">
              {currentPlaying?Math.round(props.tm / 60).toString().length === 1
                ? "0" + Math.round(props.tm / 60)
                : Math.round(props.tm / 60):"--"}
              :
              {currentPlaying?Math.round(props.tm % 60).toString().length === 1
                ? "0" + Math.round(props.tm % 60)
                : Math.round(props.tm % 60):"--"}
            </div>
            <input
              type="range"
              onMouseDown={() => {
                mousedown();
                props.playm(true);
              }}
              disabled={currentPlaying===null}
              onChange={changeHandler}
              onMouseUp={() => {
                mouseup();
                props.playm(false);
              }}
              style={{ minWidth: "350px", accentColor: "green" }}
              value={(props.tm / props.dura) * 100}
              min="0"
              max="100"
              step="0.01"
            />
            <div className="entime">
              {currentPlaying?Math.round(props.dura / 60):"--"}:{currentPlaying?Math.round(props.dura % 60):"--"}
            </div>
          </div>
        </div>
        <div className="othercontrol d-flex align-items-center">
          <button className={currentPlaying===null?"bg-transparent sbar":"bg-transparent sbar glow"} disabled={currentPlaying===null}>
            {props.vol === 0 ? (
              <i className="bi bi-volume-mute-fill h4"></i>
            ) : (
              <i className="bi bi-volume-down-fill h4"></i>
            )}
          </button>
          <input
            type="range"
            disabled={currentPlaying===null}
            style={{ accentColor: "green" }}
            onChange={(e) => {
              props.volmethod(parseInt(e.target.value));
            }}
            min="0"
            max="100"
            defaultValue={props.vol}
            step="1"
          />
        </div>
      </div>
    </>
  );
};
export default musicbar;
