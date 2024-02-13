import React from 'react';
import { Link } from 'react-router-dom';
function Updatebudget() {
  // Replace these with your actual data
  const MyJob = 4500;
  const SideHustle = 500;
  const Rent = 1200;
  const CarPayment = 500;
  const Food = 300;
  const leftover = 5;
  return (
    <div>
     
      <div>
        <h1>Income Total</h1>
        <p>My Job: {MyJob}</p>
        <p>Side Hustle: {SideHustle}</p>

        <h1> Expenses Total </h1>
        <p>Rent: {Rent}</p>
        <p>Car Payment: {CarPayment}</p>
        <p>Food: {Food}</p>

        <h2> Left over: {leftover}</h2>
      </div>
      <Link to="/overviewpage">Back to Overview</Link>
      <p>
      <Link to="/detailBudget">Budget Details</Link>
      </p>
    </div>
  );
}
export default Updatebudget;