import React from "react";
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from "react-leaflet";
import { getLatLonArr } from "../_functions/measurementFuncs"

const Map = (props) => {

  const { workout } = props;
  let route, routeArr = [];
  const firstTrkPt = workout.data[0] || [];
  const firstTrkPtLat = +firstTrkPt.lat || 0;
  const firstTrkPtLon = +firstTrkPt.lon || 0;

  //<------------------------------ map logic ------------------------------>//

  //Map route setup, if a lat point in trk exists
  if(firstTrkPtLat) {
    routeArr = workout.data || [];
    route = getLatLonArr(routeArr);
  }
  
  //set zoom boundry via Mapcontainer child component
  function MapBoundry() {
    const map = useMap();
    map.fitBounds(route);
  } 


  return(
    <MapContainer
      center={[firstTrkPtLat, firstTrkPtLon]}
      scrollWheelZoom={false}
      style={{height: "300px", width: "40em", zIndex: 0}}
    >
      <MapBoundry/>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline
          pathOptions={{fillColor: 'blue', color: 'orange'}}
          positions={[route]}
      />
    </MapContainer>
  );

}

export default Map;