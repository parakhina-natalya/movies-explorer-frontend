import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Landing from '../Landing/Landing';
import Movies from '../Movies/Movies.js';
import Profile from '../Profile/Profile.js';
import NotFound from '../NotFound/NotFound';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import './App.css';

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  function handleHamburgerClick() {
    setIsHamburgerOpen(true);
  }

  function handleEditClick() {
    setIsEditOpen(true);
  }

  function closeHamburger() {
    setIsHamburgerOpen(false);
  }

  function handleSignOut() {
    setLoggedIn(false);
    navigate('/', { replace: true });
  };

  function handleLoggedIn() {
    setLoggedIn(true);
    navigate('/', { replace: true });
  }

  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<Landing
          loggedIn={loggedIn}
          onHamburger={handleHamburgerClick}
          isOpen={isHamburgerOpen}
          onClose={closeHamburger}
        />} />

        <Route path="/movies" element={<Movies
          loggedIn={loggedIn}
          onHamburger={handleHamburgerClick}
          isOpen={isHamburgerOpen}
          onClose={closeHamburger} />} />

        <Route path="/saved-movies" element={<Movies
          loggedIn={loggedIn}
          onHamburger={handleHamburgerClick}
          isOpen={isHamburgerOpen}
          onClose={closeHamburger}
          save={true}
        />} />

        <Route path="/profile" element={<Profile
          loggedIn={loggedIn}
          onHamburger={handleHamburgerClick}
          isOpen={isHamburgerOpen}
          onClose={closeHamburger}
          onSignOut={handleSignOut}
          onEdit={handleEditClick}
          isEditOpen={isEditOpen} />} />

        <Route path="/signup" element={<Register />} />

        <Route path="/signin" element={<Login
          onloggedIn={handleLoggedIn} />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
