import React from "react";

import "../../assets/css/searchbar.css";

function Searchbar() {
    return (
        <div className="box">
    <input type="checkbox" id="check"/>
    <div className="search-box">
      <input type="text" placeholder="Type here..."/>
      <label htmlFor="check" className="icon">
        <i className="fas fa-search"></i>
      </label>
    </div>
  </div>
    )
}

export default Searchbar;