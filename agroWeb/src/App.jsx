import React, { useState } from "react";
import Header from "./components/Header";
import "./App.css";

import { Grid } from "@mui/material";
import FilePicker from "./components/FilePicker";

function App() {
  const [selectedCrop, setSelectedCrop] = useState("");
  const handleChangeCrop = (event, newCrop) => {
    if (newCrop === null) {
      return;
    }
    setSelectedCrop(newCrop);
  };

  const [selectedFileHandle, setSelectedFileHandle] = useState(null);

  // // const [prediction, setPrediction] = useState("");
  // // const [description, setDescription] = useState("");
  // const [location, setLocation] = useState(null);
  // const [count, setdbCount] = useState(null);

  // const requestLocationPermission = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         setLocation(position.coords);
  //         // toast.success("Location shared successfully!");

  //         const locationData = {
  //           Latitude: location.latitude,
  //           Longitude: location.longitude,
  //         };

  //         fetch("http://127.0.0.1:5000/location", {
  //           method: "POST",
  //           body: JSON.stringify(locationData),
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }).then((data) => {
  //           console.log(data); // Verify that the response contains the prediction property
  //           setdbCount(data.count); // Set the prediction state
  //         });
  //       },
  //       (error) => {
  //         // handle error while getting location
  //         if (error.code === error.PERMISSION_DENIED) {
  //           // display permission request notification
  //           // toast("Please allow location access to use this feature.", {
  //           //   autoClose: 5000,
  //           // });
  //         }
  //       }
  //     );
  //   } else {
  //     // handle geolocation not supported by browser
  //   }
  // };

  // useEffect(() => {
  //   fetch("http://127.0.0.1:5000/get", {
  //     method: "GET",
  //   })
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .then((response) => setSelectedFile(response));
  // }, []);

  // const fileUploadHandler = () => {
  //   const formData = new FormData();
  //   formData.append("file", selectedFile);

  //   const cropData = {
  //     corn: corn,
  //     soybean: soybean,
  //   };

  //   fetch("http://127.0.0.1:5000/upload", {
  //     method: "POST",
  //     body: formData,
  //   })
  //     .then((response) => {
  //       console.log(response);
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data); // Verify that the response contains the prediction property
  //       // setPrediction(data.prediction); // Set the prediction state
  //       // setDescription(data.description);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });

  //   fetch("http://127.0.0.1:5000/crop", {
  //     method: "POST",
  //     body: JSON.stringify(cropData),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  // };

  return (
    <div>
      <Grid
        container
        direction="row"
        spacing={2}
        paddingTop="15px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          item
          xs={12}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Header />
        </Grid>
        <Grid
          item
          xs={12}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <FilePicker
            cropSelected={selectedCrop}
            cropSelector={handleChangeCrop}
            file={selectedFileHandle}
            setFile={setSelectedFileHandle}
          />
        </Grid>
      </Grid>
      {/* <h1>Upload your crop images</h1>
      <input type="file" onChange={fileSelectedHandler} />
      <button className="upload-btn" onClick={fileUploadHandler}>
        Upload
      </button>
      <br />
      <button onClick={requestLocationPermission}>Share Location</button>
      {count !== null ? (
        <p>There are {0} reports of the crop disease in 25 miles. </p>
      ) : (
        <p>Loading...</p>
      )} */}
    </div>
  );
}

export default App;
