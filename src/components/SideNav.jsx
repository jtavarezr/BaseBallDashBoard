import React from "react";
import PropTypes from "prop-types";
import "../assets/css/SideNav.css";
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap CSS


const SideNav = ({ teams, selectedDate, handleInputChange, children }) => {
  return (
    <div className="sidenav">
      <div className="date-picker">
              <label htmlFor="date">Select a date:</label>
              <input
                type="date"
                id="date"
                className="form-control" 
                value={selectedDate}
                onChange={handleInputChange}
              />
            </div>

      <div className="additional-content">{children}</div>
    </div>
  );
};



export default SideNav;
