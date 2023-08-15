import * as React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TextField, Container } from "@mui/material";

import axios from "axios";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

//sample response for weather data
// {
//     "location": {
//         "name": "London",
//         "region": "City of London, Greater London",
//         "country": "United Kingdom",
//         "lat": 51.52,
//         "lon": -0.11,
//         "tz_id": "Europe/London",
//         "localtime_epoch": 1692105602,
//         "localtime": "2023-08-15 14:20"
//     },
//     "current": {
//         "last_updated_epoch": 1692105300,
//         "last_updated": "2023-08-15 14:15",
//         "temp_c": 23.0,
//         "temp_f": 73.4,
//         "is_day": 1,
//         "condition": {
//             "text": "Partly cloudy",
//             "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png",
//             "code": 1003
//         },
//         "wind_mph": 10.5,
//         "wind_kph": 16.9,
//         "wind_degree": 260,
//         "wind_dir": "W",
//         "pressure_mb": 1016.0,
//         "pressure_in": 30.0,
//         "precip_mm": 0.0,
//         "precip_in": 0.0,
//         "humidity": 53,
//         "cloud": 50,
//         "feelslike_c": 24.5,
//         "feelslike_f": 76.0,
//         "vis_km": 10.0,
//         "vis_miles": 6.0,
//         "uv": 5.0,
//         "gust_mph": 9.2,
//         "gust_kph": 14.8
//     }
// }

export default function WeatherService() {
  //WEATHER DATA USESTATE
  const [weatherData, setWeatherData] = useState(null);

  //const searchbox
  const [searchbox, setSearchbox] = useState("");

  async function getWeather(location) {
    const API_KEY = "e877051dfda541c4bcc142039231508";

    //if location is empty, set it to london
    if (location === "") {
      location = "london";
    }
    const LOCATION_INPUT = location;

    await axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${LOCATION_INPUT}&aqi=no`
      )
      .then((response) => {
        console.log(response.data);
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    //api request
    console.log(searchbox);
    getWeather(searchbox);
  }, [searchbox]);

  const handleSearch = (e) => {
    setSearchbox(e.target.value);
  };

  return (
    <Container>
      <TextField
        id="filled-search"
        label="Search field"
        type="search"
        variant="filled"
        onChange={handleSearch}
      />
      <TableContainer component={Paper} className="tableData">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Location</TableCell>
              <TableCell align="right">Humidity</TableCell>
              <TableCell align="right">Pressure</TableCell>
              <TableCell align="right">Wind Speed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="right">{weatherData?.location.name}</TableCell>
              <TableCell align="right">
                {weatherData?.current.humidity}
              </TableCell>
              <TableCell align="right">
                {weatherData?.current.pressure_mb}
              </TableCell>
              <TableCell align="right">
                {weatherData?.current.wind_kph}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
