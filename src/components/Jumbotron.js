import React from "react";

function Jumbotron() {
  return (
    <section className="jumbotron text-center">
      <div className="container">
        <h1 className="jumbotron-heading">Lap times example</h1>
        <p className="lead text-muted">
          Below is a list of race tracks I've driven on with some basic info,
          and a button linking to the detail page for that track.
        </p>
      </div>
    </section>
  );
}

export default Jumbotron;
