import React from 'react';
import { Link } from 'react-router-dom';
// import userImage from '../assets/userImage';

// const userImage = {userImage}


function UserProfilepage() {
  // Replace these with your actual data
  
 
  return (
    <div>
      {/* <img src={userImage} alt="userImage" />; */}


      <div>
        <h1> First Last</h1>
      </div>
      <div>
      <h2> <button onClick={() => {/* handle navigation */}}>Income</button> </h2>
      <h2> <button onClick={() => {/* handle navigation */}}>Pay Day</button> </h2>
      </div>
      <Link to="/usersettings">User Settings</Link>
    </div>
  );
}
export default UserProfilepage;