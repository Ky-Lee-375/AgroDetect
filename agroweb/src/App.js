import React, { useState, useEffect } from "react";
import './App.css';
import Banner from './Banner';
import {
  MapContainer,
  TileLayer,
  Polygon
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { statesData } from './data';
import './App.css';

import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications-component/dist/theme.css';
import 'animate.css/animate.min.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const center = [40.63463151377654, -97.89969605983609];

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [corn, setCorn] = useState(false);
  const [soybean, setSoybean] = useState(false);
  const [prediction, setPrediction] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(null);
  const [count, setdbCount] = useState(null);

  const requestLocationPermission = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(position.coords);
          toast.success("Location shared successfully!");

          const locationData = {
            "Latitude": location.latitude,
            "Longitude": location.longitude
          }
      
          fetch('http://127.0.0.1:5000/location', {
            method: 'POST',
            body: JSON.stringify(locationData),
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(data => {
              console.log(data); // Verify that the response contains the prediction property
              setdbCount(data.count); // Set the prediction state
            })
        },
        (error) => {
          // handle error while getting location
          if (error.code === error.PERMISSION_DENIED) {
            // display permission request notification
            toast('Please allow location access to use this feature.', {
              autoClose: 5000,
            });
          }
        }
      );
    } else {
      // handle geolocation not supported by browser
    }
  };

  useEffect(()=> {
    fetch('http://127.0.0.1:5000/get',{
      'method': 'GET'
    })
    .then(response => {
      console.log(response);
    })
    .then(response => setSelectedFile(response))

  },[])

  const fileSelectedHandler = event => {
    setSelectedFile(event.target.files[0]);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (name === 'corn' && checked) {
      setCorn(true);
      setSoybean(false);
    } else if (name === 'soybean' && checked) {
      setCorn(false);
      setSoybean(true);
    } else {
      setCorn(false);
      setSoybean(false);
    }
  };

  const fileUploadHandler = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    const cropData = {
      corn: corn,
      soybean: soybean
    }

    fetch('http://127.0.0.1:5000/upload', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        console.log(response);
        return response.json(); 
      })
      .then(data => {
        console.log(data); // Verify that the response contains the prediction property
        setPrediction(data.prediction); // Set the prediction state
        setDescription(data.description)
      })
      .catch(error => {
        console.error(error);    
      });

    fetch('http://127.0.0.1:5000/crop', {
      method: 'POST',
      body: JSON.stringify(cropData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  };
  
  return (
    <div className="App">
      <Banner 
        background="#e9edc9" 
        color="#000000" 
        title="Welcome to AgroDetect!" 
        subtitle="Detect the problem and find the solution."
      />
      <h1>Upload your crop images</h1>
      <div>
          <label htmlFor="corn">Corn</label>
          <input type="checkbox" id="corn" name="corn" checked={corn} onChange={handleCheckboxChange} />
        </div>
        <div>
          <label htmlFor="soybean">Soybean</label>
          <input type="checkbox" id="soybean" name="soybean" checked={soybean} onChange={handleCheckboxChange} />
        </div>
      <input type="file" onChange={fileSelectedHandler} />
      <button className="upload-btn" onClick={fileUploadHandler}>Upload</button>
      <br />
      <button onClick={requestLocationPermission}>Share Location</button>
      {count !== null ? (
        <p>There are {0} reports of the crop disease in 25 miles. </p>
      ) : (
        <p>Loading...</p>
      )}
      <ToastContainer />
      <br />
      <PredictionDisplay prediction={prediction} description={description} />
      
      <MapContainer
      center={center}
      zoom={4}
      style={{ width: '50vw', height: '50vh', margin: '0 auto' }}
    >
      <TileLayer
        url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=xPfjkK7EqwYZYZuGzj4r"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />
      {
        statesData.features.map((state) => {
          const coordinates = state.geometry.coordinates[0].map((item) => [item[1], item[0]]);

          return (<Polygon
            pathOptions={{
              fillColor: '#FD8D3C',
              fillOpacity: 0.7,
              weight: 2,
              opacity: 1,
              dashArray: 3,
              color: 'white'
            }}
            positions={coordinates}
            eventHandlers={{
              mouseover: (e) => {
                const layer = e.target;
                layer.setStyle({
                  dashArray: "",
                  fillColor: "#BD0026",
                  fillOpacity: 0.7,
                  weight: 2,
                  opacity: 1,
                  color: "white",
                })
              },
              mouseout: (e) => {
                const layer = e.target;
                layer.setStyle({
                  fillOpacity: 0.7,
                  weight: 2,
                  dashArray: "3",
                  color: 'white',
                  fillColor: '#FD8D3C'
                });
              },
              click: (e) => {

              }
            }}
          />)
        })
      }
    </MapContainer>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="sidebar__title">AgroDetect</h2>
      <ul className="sidebar__list">
        <li className="sidebar__item"><a href="#" className="sidebar__link">Home</a></li>
        <li className="sidebar__item"><a href="#" className="sidebar__link">About</a></li>
        <li className="sidebar__item"><a href="#" className="sidebar__link">Contact</a></li>
      </ul>
    </aside>
  );
}

function PredictionDisplay({ prediction, description }) {
  return (
    <div className="prediction-box">
      <h2 className="prediction-title">Result from scanning:</h2>
      <p className="prediction-text">{prediction}</p>
      {description && (
        <div className="description-box">
          <p className="description-text">{description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
