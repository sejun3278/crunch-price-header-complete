import React, { Component } from 'react';
import './App.css';
import Category_header from './Category_header.js';

class Category extends Component {
  constructor(props) {
    super(props)
  }

    render() {
        return (
          <div className="main_link_wrap">
            <Category_header data={this.props.data}/>
          </div>
        );
      }
  }
  
  export default Category;