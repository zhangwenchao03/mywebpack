import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from '@/assets/delete.svg';
import './search.less';

 class Search extends Component {
  render () {
    return (
      <div className="searchDiv">
        <img src= {logo} />
        Search
      </div>
    )
  }
 }

 export default Search;

 ReactDOM.render(<Search/>, document.getElementById('root'))