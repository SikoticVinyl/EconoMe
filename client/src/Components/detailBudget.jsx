import React from 'react';
import { Link } from 'react-router-dom';
// import userImage from './';


function detailBudget() {
  // Replace these with your actual data
 
  return (
    <div>


      <div>
        <h1> First Last</h1>
      </div>
      <div>
      <h2> <button onClick={() => {/* handle navigation */}}>Income</button> </h2>
      <h2> <button onClick={() => {/* handle navigation */}}>Pay Day</button> </h2>
      </div>
      <Link to="/updateBudget">Back to Update Budget</Link>
    </div>
  );
}
export default detailBudget;