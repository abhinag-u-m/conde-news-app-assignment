import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import NavBar from "./components/NavBar/NavBar";
import News from "./components/News/News";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { router } from "./config/config";
import LoadingBar from "react-top-loading-bar";

function App() {
  const [progress, setProgress] = useState(0);
  const pageSize = 7;
  document.body.style.backgroundColor = "rgb(36, 39, 41)";
  const [queryValue, setQueryValue] = useState('');

  const searchHandler = (value) => {
    setQueryValue(value);
  }

  return (
    <>
      <Router>
        <NavBar searchHandler={searchHandler}/>
        <LoadingBar color="#005abb" height={3} progress={progress} />
        <Routes>
          {
            router.map(path =>
              <Route
                exact
                key={uuidv4()}
                path={path.path}
                element={
                  <News
                    setProgress={setProgress}
                    key={path.key}
                    category={path.category}
                    pageSize={pageSize}
                    country={path.country}
                    queryValue={queryValue}
                  />
                }
              />
            )
          }
        </Routes>
      </Router>
    </>
  );
}

export default App;
