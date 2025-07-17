import './App.css';
import { Route, Routes } from "react-router-dom";
import { useState } from 'react';

import Movies from './components/Movies';
import LoadingBar from 'react-top-loading-bar';
import Navbar from './components/Navbar';

const App = () => {
  const [progress, setProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  // eslint-disable-next-line
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <Navbar onSearch={setSearchQuery} />
      <LoadingBar height={3.5} color="#f11946" progress={progress} />
      <Routes>
        <Route path="/" element={<Movies setProgress={setProgress} searchQuery={searchQuery} key="home" type="home" />} />
      </Routes>
    </>
  );
};

export default App;