import { useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON, Popup, useMap } from "react-leaflet";

import countriesGeo from "./data/countriesGeo.json";
import masterData from "./data/masterData.json";
import { ReactComponent as WikipediaLogo } from "./static/Wikipedia-logo-v2-en.svg";
import { ReactComponent as PencilIcon } from "./static/pencil-icon.svg";
import { useTopic } from "./contexts";

function App() {
  const [latLng, setLatLng] = useState([]);
  const [country, setCountry] = useState("");
  const { topic, setTopic } = useTopic();

  return (
    <div className="page">
      <div className="header">
        <a href="https://wikipedia.org/" target="_blank">
          <WikipediaLogo className="logo" />
        </a>
        <div className="heading-container">
          <h1 className="heading--primary">
            World{" "}
            <span
              className="topic-heading"
              onClick={() => {
                topic === "history" && setTopic("geography");
                topic === "geography" && setTopic("politics");
                topic === "politics" && setTopic("history");
              }}
            >
              {topic}
              <PencilIcon className="pencil-icon" />
            </span>
          </h1>
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
          noWrap="true"
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
              const url = masterData.find((el) => el.text === countryName)?.[
                `${topic}Url`
              ];

              url
                ? window.open(url, "_blank")
                : alert(`Wikipedia ${countryName} ${topic} page not found.`);
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
        {latLng[0] && (
          <Popup position={latLng}>
            {topic[0].toUpperCase() + topic.slice(1)} of {country}
          </Popup>
        )}
      </MapContainer>
    </div>
  );
}

export default App;
