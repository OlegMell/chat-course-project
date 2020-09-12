import React from "react";
import './search-bar.scss';
import SearchIcon from "../SearchIcon/SearchIcon";

export default function SearchBar() {
  return (
      <div className={'search-bar-box'} >
        <SearchIcon />
        <input type="text" className={'search-inp'} name="search" id="search"
               placeholder='Find something..'/>
      </div>
  )
}