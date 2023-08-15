import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import WeatherService from "./components/WeatherService";
import Test from "./components/Test";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<WeatherService />}></Route>
          <Route path="/" element={<Test />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
