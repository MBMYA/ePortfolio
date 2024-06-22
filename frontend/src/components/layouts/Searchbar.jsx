import React from "react";

import "../../assets/css/searchbar.css";

function Searchbar() {
    return (
        <div class="box">
    <input type="checkbox" id="check"/>
    <div class="search-box">
      <input type="text" placeholder="Type here..."/>
      <label for="check" class="icon">
        <i class="fas fa-search"></i>
      </label>
    </div>
  </div>
    )
}

export default Searchbar;