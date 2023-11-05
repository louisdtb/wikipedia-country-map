import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Popup,
  Marker,
  Tooltip,
} from "react-leaflet";
import countriesGeo from "./data/countriesGeo.json";
import countryHistory from "./data/historyData.json";
import { ReactComponent as WikipediaLogo } from "./static/Wikipedia-logo-v2-en.svg";

function App() {
  const [latLng, setLatLng] = useState([]);
  const [country, setCountry] = useState("");

  return (
    <div className="page">
      <div className="header">
        <a href="https://wikipedia.org/" target="_blank">
          <WikipediaLogo className="logo" />
        </a>
        <div className="heading-container">
          <h1 className="heading--primary">World history</h1>
          <h2 className="heading--secondary">by country</h2>
        </div>
      </div>
      <MapContainer
        style={{ height: "100vh" }}
        center={[40, 0]}
        zoom={2}
        scrollWheelZoom={true}
        bounds={[
          [-90, -180],
          [90, 180],
        ]}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">carto.com</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
        />
        <GeoJSON
          data={countriesGeo}
          style={{
            color: "#CEDEF2",
            weight: 1,
            opacity: 0.5,
          }}
          eventHandlers={{
            click: (e) => {
              const countryName = e.propagatedFrom.feature.properties.name;
              const url = countryHistory.find((el) =>
                el.text.includes(countryName)
              )?.url;

              url
                ? window.open(url, "_blank")
                : alert(`Wikipedia ${countryName} history page not found.`);
            },
            mouseover: (e) => {
              const lat = e.propagatedFrom.feature.properties.label_y;
              const lng = e.propagatedFrom.feature.properties.label_x;
              const countryName = e.propagatedFrom.feature.properties.name;
              setLatLng([lat, lng]);
              setCountry(countryName);
            },
          }}
        />
        {latLng[0] && <Popup position={latLng}>History of {country}</Popup>}
      </MapContainer>
    </div>
  );
}

export default App;
