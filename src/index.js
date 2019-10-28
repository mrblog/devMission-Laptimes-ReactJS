import React from "react";
import ReactDOM from "react-dom";

import Jumbotron from "./components/Jumbotron.js";
import Tracks from "./components/Tracks.js";
import TrackView from "./components/TrackView.js";

import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingStatus: "init",
      listView: true,
      trackData: []
    };
  }

  listView = () => {
    this.setState({
      listView: true
    });
  };

  trackView = trackId => {
    console.log("trackView: " + trackId);
    this.setState({
      listView: false,
      trackId: trackId
    });
  };

  download = () => {
    this.setState({
      loadingStatus: "loading"
    });
    let headers = {
      "Content-Type": "application/json"
    };
    let url =
      "https://api.airtable.com/v0/appeCYM4x8QCX1A4M/Laptimes?api_key=keyv4QDuZMfORAFjN";
    fetch(url, {
      method: "GET",
      headers: headers,
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache" // *default, no-cache, reload, force-cache, only-if-cached
    })
      .then(res => res.json())
      .then(data => {
        var trackData = this.state.trackData;
        for (var i = 0; i < data.records.length; i++) {
          var row = data.records[i];
          console.log(i + ": id: " + row.fields.trackId);
          if (row.fields.trackId) {
            trackData[row.fields.trackId] = row.fields;
          }
        }
        const newState = {
          loadingStatus: "succeeded",
          trackData: trackData
        };
        this.setState(newState);
      })
      .catch(err => {
        console.log(err);
        const newState = {
          loadingStatus: "failed"
        };
        this.setState(newState);
      });
  };

  componentDidMount() {
    this.download();
  }
  render() {
    if (this.state.loadingStatus === "succeeded") {
      if (this.state.listView) {
        return (
          <div className="App">
            <Jumbotron />
            <Tracks
              trackData={this.state.trackData}
              trackView={this.trackView}
            />
          </div>
        );
      } else {
        return (
          <div className="App">
            <TrackView
              fields={this.state.trackData[this.state.trackId]}
              listView={this.listView}
            />
          </div>
        );
      }
    } else {
      return (
        <div className="App">
          <Jumbotron />
        </div>
      );
    }
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
