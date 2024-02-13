import {React,useState } from 'react';
import { Link } from 'react-router-dom';
function OverviewPage() {
  const [userNum,setUserNum]=useState(0)
  // Replace these with your actual data
  const incomeTotal = 1000;
  const expensesTotal = 500;
  const savingsGoals = 200;
  const profit = incomeTotal - expensesTotal;
  

  return (
    <div>
      <div>
        <button onClick={() => {/* handle navigation */}}>App Navigation</button>
        <button>
          <Link to="/userprofilepage">Profile</Link>
        </button>
      </div>
   

      <h1>
      <label for="overview">Overview:</label>
      </h1>


<h2>
<select name="overview" id="overview"onChange={(event)=> setUserNum(event.target.value)}>
  <option value={incomeTotal}>Income Total</option>
  <option value={expensesTotal}>Expenses</option>
  <option value={savingsGoals}>Savings Goals</option>
  <option value={profit}>Profit</option>
</select>

</h2>

<h2>${userNum}</h2>



      <Link to="/updateBudget">Update Budget</Link>




    </div>
  );
}
export default OverviewPage;
























