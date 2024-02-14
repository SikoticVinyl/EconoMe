import React from 'react';
import { Link } from 'react-router-dom';

const UpdateFooter = ({ handleCancel, handleAddItem, handleSave }) => {
    return (
        <div className="update-footer max-w-100 flex justify-between">
            <Link to="/overview-page" onClick={handleCancel} className="flex-1 px-5 py-2 text-center text-white bg-gradient-to-r from-blue-500 to-green-500 hover:from-pink-500 hover:to-yellow-500 cursor-pointer transform transition rounded">
                <span className="text-2xl">Cancel</span>
            </Link>
            <Link to="/create-budget" className="flex-1 px-5 py-2 text-center text-white bg-gradient-to-r from-blue-500 to-green-500 hover:from-pink-500 hover:to-yellow-500 cursor-pointer transform transition rounded">
                <span className="text-2xl">Add Item</span>
            </Link>
            <Link to="/overview-page" onClick={handleSave} className="flex-1 px-5 py-2 text-center text-white bg-gradient-to-r from-blue-500 to-green-500 hover:from-pink-500 hover:to-yellow-500 cursor-pointer transform transition rounded">
                <span className="text-2xl">Save</span>
            </Link>
        </div>
    );
};

export default UpdateFooter;
