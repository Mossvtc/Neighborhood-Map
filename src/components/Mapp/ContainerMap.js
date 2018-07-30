import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import SideBar from "../SideBar";
import axios from "axios";
import { kavane, styleMap } from "../../libs/constant";

//Gmaps API errors
document.addEventListener("DOMContentLoaded", function(e) {
  let scriptTag = document.getElementsByTagName('SCRIPT').item(1);
  scriptTag.onerror = function(e) {
    console.log('Google Maps API problem, please try later.')
    let containerMapElement = document.querySelector('#root');
    let errElement = document.createElement('div');
    errElement.innerHTML = '<div class="err-msg"><span>:(</span> Google Maps API problem, check later please! </div>'
    containerMapElement.appendChild(errElement)
  }
})

const Wrapperr = styled.div`
  font-family: "Roboto", sans-serif;
  grid-template-columns: 340px 1fr;
  color: #262626;
  display: grid;

  @media (max-width: 701px) {
    grid-template-columns: 1fr;
  }
`;

const MapDiv = styled.div`
  position: absolute;
  height: 100vh;
  width: 100%;
`;

class ContainerMap extends Component {
  state = {
    location: kavane,
    defaultMapZoom: 16,
    center: {
      lat: 45.8316463,
      lng: 17.38554290000002
    },
    iconSize: 28,
    infoWindow: "",
    mapType: "roadmap",
    markers: [],
    mapTypeControl: false,
    markerDetails: {
      name: null,
      address: null,
      img: null,
      url: null,
      phone: {
        phone: null,
        formattedPhone: null
      },
      rating: null
    }
  };

  componentDidMount() {
    this.loadingMap();
  }

  /**
   * Loads google map
   */
  loadingMap = () => {
    if (this.props && this.props.google) {
      const { google } = this.props;
      const mapps = google.maps;

      const { defaultMapZoom, center, mapType } = this.state;

      const mapRefs = this.refs.map; // looks for HTML div ref 'map'
      const node = ReactDOM.findDOMNode(mapRefs); // finds 'map' div, names it node

      const configMaps = Object.assign(
        {},
        {
          center: center,
          mapTypeId: mapType,
          styles: styleMap,
          zoom: defaultMapZoom
        }
      );

      // Create info window
      const infoWindow = new google.maps.InfoWindow({ maxWidth: 140 });

      this.setState({ infoWindow: infoWindow });

      // creates new Google map on configuration set above
      this.map = new mapps.Map(node, configMaps);

      this.markerAdd();
    }
  };

  /**
   * Adds markers to map from State
   */
  markerAdd = () => {
    const { location, iconSize } = this.state;
    const markers = [];
    const { google } = this.props;

    // Marker Icon
    const coffeIcon = {
      url: "./img/coffee-icon.png",
      scaledSize: new google.maps.Size(iconSize, iconSize),
      size: new google.maps.Size(iconSize, iconSize)
    };

    // Initialize markers
    location.forEach((location, index) => {
      const marker = new google.maps.Marker({
        map: this.map,
        position: { lat: location.location.lat, lng: location.location.lng },
        title: location.name,
        icon: coffeIcon,
        id: index,
        anchorPoint: new google.maps.Point(0, -29),
        animation: google.maps.Animation.DROP
      });

      // Push markers to array of markers
      markers.push(marker);

      marker.addListener("click", () => {
        this.infoOpenWindow(marker);
      });
    });

    // Set up the markers state
    this.setState({ markers });
  };


  infoOpenWindow = marker => {
    const { infoWindow } = this.state;
    const { map } = this;


      infoWindow.marker = marker;
      infoWindow.setContent(`Loading..`);
      infoWindow.open(this.map, marker);

      // Clear the marker
      infoWindow.addListener("closeclick", () => {
        infoWindow.setMarker = null;
      });


    this.getMarkerDetail(marker);

    // Center map to a marker position
    map.panTo(marker.getPosition());
  };

  /**
   * Gets all the details for marker from
   */
  getMarkerDetail = marker => {
    const { infoWindow } = this.state;
    const clientSecret = "EHDLJW5RB2YZORXLGH23VC1VMC25RSZNVRDNTLCI3J4XI2AW";
    const clientId = "ZWIQ2CGPMVFJ5IGJLNOC1JCNR0FWLK32ENCSW21504K1HCTF";

    // Venues Search
    axios
      .get("https://api.foursquare.com/v2/venues/search", {
        params: {
          client_secret: clientSecret,
          client_id: clientId,
          v: "20180323",
          ll: `${marker.getPosition().lat()},${marker.getPosition().lng()}`,
          limit: 1,
          query: marker.title
        }
      })
      .then(res => {
        const venudeIdd = res.data.response.venues[0].id;

        return axios.get(`https://api.foursquare.com/v2/venues/${venudeIdd}`, {
          params: {
            v: "20180323",
            client_id: clientId,
            client_secret: clientSecret
          }
        });
      })
      .then(res => {
        // Set variables and update the state
        const { venue } = res.data.response;

        const url = venue.url;
        const img = `${venue.bestPhoto.prefix}120x120${venue.bestPhoto.suffix}`;
        const name = venue.name;
        const rating = venue.rating;
        const address = venue.location.formattedAddress.join(", ");
        const phone = {
          formattedPhone: venue.contact.formattedPhone,
          phone: venue.contact.phone
        };

        this.setState({
          markerDetails: {
            name,
            address,
            url,
            img,
            phone,
            rating
          }
        });
      })
      .then(res => {
        // Retrieve details from state, create content for infoWindow
        const {
          name,
          address,
          url,
          img,
          phone,
          rating
        } = this.state.markerDetails;

        const phonePlace =
          phone.phone !== undefined
            ? `<a href="tel:${phone.phone}">${phone.formattedPhone}</a>`
            : "";
        const urlPlace =
          url !== undefined ? `<a href=${url} target="_blank">${url}</a>` : "";
        const ratings =
          rating !== undefined
            ? `<span><b>${rating}</b></span>`
            : "not available";
        const imgPlace =
          img !== undefined ? `<img src=${img} alt=${name} />` : "";

        const content = `
          <div style="width: 95%;">
            <h2>${name}</h2>
            <p>${address}</p>
            <p>${phonePlace}</p>
            <p>${urlPlace}</p>
            <p>Rating: ${ratings}</p>
            <div style='width: 95%; text-align: center'>${imgPlace}</div>
            <img style="width: 95%" src="./img/byFoursquare.png" />
          </div>
        `;

        //infoWindow content
        infoWindow.setContent(content);
      })
      .catch(err => {
        console.log("Error", err);
        infoWindow.setContent(`Foursquare error, try later please.`);
      });
  };

  /**
   * Closes the Info Window
   */
  infoCloseWindow = () => {
    this.state.infoWindow.close();
  };

  /**
   * Hides all markers from map
   */
  hideMarker = () => {
    const { markers } = this.state;

    markers.forEach(marker => {
      marker.setMap(null);
    });
  };

  /**
   * Show all markers to map
   */
  showMarker = () => {
    const { markers } = this.state;

    markers.forEach(marker => {
      marker.setMap(this.map);
    });
  };

  updateMarkers = markers => {
    this.setState({ markers });
  };

  render() {
    const { markers, location } = this.state;

    return (
      <Wrapperr>
        <SideBar
          location={location}
          markers={markers}
          showMarker={this.showMarker}
          hideMarker={this.hideMarker}
          infoOpenWindow={this.infoOpenWindow}
          infoCloseWindow={this.infoCloseWindow}
          searchLocations={this.searchLocations}
        />
        <MapDiv role="application" ref="map">
          loading..
        </MapDiv>
      </Wrapperr>
    );
  }
}

export default ContainerMap;
