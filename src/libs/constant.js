export const kavane = [
  {
    name: "Mount Everest",
    location: { lat: 45.831583, lng: 17.387415 }
  },
  {
    name: "Principessa Caffe",
    location: { lat: 45.831897, lng: 17.387413 }
  },
  {
    name: "Medena",
    location: { lat: 45.833819, lng: 17.38713 }
  }
,
  {
    name: "Bolero",
    location: { lat: 45.831454, lng: 17.386797}
  },

  {
    name: "Kod Bernija",
    location: { lat: 45.830454, lng: 17.386358}
  }


];

export const styleMap = [
    {
        "elementType": "geometry.fill",
        "featureType": "landscape.natural",
        "stylers": [
            {
                "color": "#e0efef"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "elementType": "geometry.fill",
        "featureType": "poi",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "color": "#c0e8e8"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "elementType": "labels",
        "featureType": "poi",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "featureType": "poi",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "featureType": "poi",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "elementType": "geometry",
        "featureType": "road",
        "stylers": [
            {
                "lightness": 100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "elementType": "labels",
        "featureType": "road",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "elementType": "geometry",
        "featureType": "transit.line",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": 600
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "elementType": "all",
        "featureType": "water",
        "stylers": [
            {
                "color": "#5abfbf"
            }
        ]
    }
];
