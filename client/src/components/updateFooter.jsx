import React from 'react';
import { useHistory } from 'react-router-dom';

const UpdateFooter = () => {
  const history = useHistory();

  const handleCancel = () => {
    // Navigate to "overview.js" or any other route you desire
    history.push('/overview');
  };

  const handleAddItem = () => {
    // Navigate to "createItem.js" or any other route you desire
    history.push('/createItem');
  };

  const handleSave = () => {
    // Navigate to "overview.js" or any other route you desire after saving
    history.push('/overview');
    // Implement your logic for saving the changes
    console.log('Save logic goes here');
  };

  return (
    <div className="update-footer">
      <button onClick={handleCancel}>Cancel</button>
      <button onClick={handleAddItem}>Add Item</button>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default UpdateFooter;