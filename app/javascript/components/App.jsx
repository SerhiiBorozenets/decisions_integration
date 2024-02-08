import React, {Fragment} from "react"
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import DecisionsPage from "./DecisionsPage";

function App() {

  return <Fragment>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DecisionsPage />} />
      </Routes>
    </BrowserRouter>
  </Fragment>
}

export default App;
