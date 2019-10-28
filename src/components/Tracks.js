import React from "react";

function trackMarkup(fields, trackView) {
  return (
    <div key={fields.trackId} className="col-md-4">
      <div className="card mb-4 shadow-sm">
        <img
          className="card-img-top"
          src={fields.trackMap[0].url}
          alt="Trackmap"
        />
        <div className="card-body">
          <h5 className="card-title">{fields.trackName}</h5>
          <p className="card-text">{fields.description}</p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary trackView"
                onClick={() => {
                  trackView(fields.trackId);
                }}
              >
                View
              </button>
            </div>
            <small className="text-muted">{fields.trackLength} miles</small>
          </div>
        </div>
      </div>
    </div>
  );
}
function Tracks(props) {
  var tracksList = [];
  for (var trackId in props.trackData) {
    tracksList.push(trackMarkup(props.trackData[trackId], props.trackView));
  }
  return (
    <div className="album py-5 bg-light">
      <div className="container">
        <div className="row" id="tracks">
          {tracksList}
        </div>
      </div>
    </div>
  );
}

export default Tracks;
