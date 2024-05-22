import React, { useState } from "react";
import Navbar from './components/Navbar'
import News from "./components/News";
import './App.css'
import {
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const [progress, setProgress] = useState(0);
  const calculatePageSize = (totalResults) => {
    // Calculate the page size dynamically based on totalResults
    const desiredPageSize = 5; // Set your desired page size here
    return Math.ceil(totalResults / desiredPageSize);
  }
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <LoadingBar
          color='#f11946'
          progress={progress}
        />
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} key={"general"} calculatePageSize={calculatePageSize} country="in" category="General" />} />
          <Route exact path="/business" element={<News setProgress={setProgress} key={"business"} calculatePageSize={calculatePageSize} country="in" category="Business" />} />
          <Route exact path="/entertainment" element={<News setProgress={setProgress} key={"entertainment"} calculatePageSize={calculatePageSize} country="us" category="Entertainment" />} />
          <Route exact path="/health" element={<News setProgress={setProgress} key={"health"} calculatePageSize={calculatePageSize} country="in" category="Health" />} />
          <Route exact path="/science" element={<News setProgress={setProgress} key={"science"} calculatePageSize={calculatePageSize} country="in" category="Science" />} />
          <Route exact path="/sports" element={<News setProgress={setProgress} key={"sports"} calculatePageSize={calculatePageSize} country="in" category="Sports" />} />
          <Route exact path="/technology" element={<News setProgress={setProgress} key={"technology"} calculatePageSize={calculatePageSize} country="in" category="Technology" />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
