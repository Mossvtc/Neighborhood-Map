import React, { Component } from "react";
import ContainerMap from "./ContainerMap";
import { GoogleApiWrapper } from "google-maps-react";

class Map extends Component {
  render() {
    return (
      <ContainerMap
      	locations={this.props.locations}
        google={this.props.google}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDjmyaxv1xjOBG1mDmy8vU33oH5wQsZtMc"
})(Map);
