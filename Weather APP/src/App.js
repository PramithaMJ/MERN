import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import WeatherService from "./components/WeatherService";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<WeatherService />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
