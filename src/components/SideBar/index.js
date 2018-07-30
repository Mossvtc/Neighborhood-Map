import React, { Component } from "react";
import styled from "styled-components";
import { SearchBox } from "./SearchBox";
import { Toggle } from "./Toggle";
import { Lists, ListItem } from "./Lists";
import { Buttons } from "./Buttons";

const Wrapperr = styled.aside`
    height: 100vh;
    background: #d9d9d9;
    left: 0;
    top: 0;
    bottom: 0;
    box-shadow: 0px 0px 3px 0px #1a1a1a;
    position: absolute;
    overflow-y: auto;
    transition: all ease .5s;
    width: 15vw;
    padding: 9px;
    z-index: 3;
`;

class SideBar extends Component {
  state = {
    active: false,
    locations: []
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.markers !== this.props.markers) {
      this.setState({ locations: nextProps.markers });
    }
  }



  /**
   * Performs search markers
   */
  searchesLocation = e => {
    const { value } = e.target;
    const { markers, infoCloseWindow } = this.props;

    // Close info window before start searching
    infoCloseWindow();

    const filteredLocations = markers.filter(location => {
      // Regular expression to match value
      const stringToMatch = new RegExp(value, "gi");
      if (location.title.match(stringToMatch)) {
        location.setVisible(true);
      } else {
        location.setVisible(false);
      }

      return location.title.match(stringToMatch);
    });

    // Update locations state
    this.setState({ locations: filteredLocations });
  };

    /**
   * Toggle of SideBar
   */

   toggledClass() {

    let sidetoggle = document.getElementsByTagName("aside")[0];

    sidetoggle.classList.toggle("toggled");

  };

  render() {
    const { infoOpenWindow } = this.props;
    const { locations } = this.state;

    return (
      <Wrapperr>
        <h4 tabIndex="1">Coffee shops in Virovitica, Croatia</h4>

        <Toggle
          tabIndex="1"
          onClick={this.toggledClass}
          aria-label="Toggle"
        >

        </Toggle>

        <Buttons
          onClick={this.props.hideMarker}
          tabIndex="1"
          aria-label="Markers hide"
        >
          Hide
        </Buttons>
        <Buttons
          onClick={this.props.showMarker}
          tabIndex="1"
          aria-label="Markers show"
        >
          Show
        </Buttons>
        <SearchBox
          placeholder="Search"
          type="text"
          tabIndex="1"
          onChange={this.searchesLocation}
          aria-label="Search for places"
        />
        <Lists role="list" aria-label="Coffe shops" tabIndex="1">
          {locations.map((marker, index) => (
            <ListItem
              role="listitem"
              tabIndex="1"
              onClick={() => infoOpenWindow(marker)}
              key={index}
            >
              {marker.title}
            </ListItem>
          ))}
        </Lists>
      </Wrapperr>
    );
  }
}

export default SideBar;
