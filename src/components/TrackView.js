import React from "react";

function fmtMSS(s) {
  s = Math.round(s);
  return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
}

function TrackView(props) {
  var goalSpeed = (props.fields.trackLength / props.fields.goalLaptime) * 3600;
  var bestSpeed = (props.fields.trackLength / props.fields.bestLaptime) * 3600;
  var percent = (Math.round((bestSpeed / goalSpeed) * 100) / 100) * 100;
  var percentStyle = { width: +percent + "%" };
  console.log(
    "goalSpeed: " +
      goalSpeed +
      " bestSpeed: " +
      bestSpeed +
      " percent: " +
      percent
  );
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <img
            src={props.fields.trackMap[0].thumbnails.large.url}
            alt="Track map"
            className="trackmap-detail"
          />
        </div>
        <div className="details col-md-8">
          <h3>{props.fields.trackName}</h3>
          <h6 className="trackLength">
            Distance: <span>{props.fields.trackLength} miles </span>
          </h6>
          <h6 className="bestLaptime">
            Best lap: <span>{fmtMSS(props.fields.bestLaptime)}</span>
          </h6>
          <h6 className="goalLaptime">
            Goal lap: <span>{fmtMSS(props.fields.goalLaptime)}</span>
          </h6>
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuenow={percent}
              aria-valuemin="0"
              aria-valuemax="100"
              style={percentStyle}
            >
              {percent}%
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="details col-md-8">
          <p className="trackDescription">{props.fields.description}</p>
          <div className="officialSite">
            <a href={props.fields.trackUrl} target="_new">
              Official Track Site
            </a>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="details col-md-8">
          <button
            className="btn btn-primary home"
            type="button"
            id="homeButton"
            onClick={() => {
              props.listView();
            }}
          >
            Back to Track list
          </button>
        </div>
      </div>
    </div>
  );
}
export default TrackView;
