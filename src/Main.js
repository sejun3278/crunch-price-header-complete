import React, { Component } from 'react';
import './App.css';
// import ReactDOM from 'react-dom';
import Main_header from './Main_header.js'

import Modal from 'react-modal';
import Category from './Category';
Modal.setAppElement('html')

class Main extends Component {
    constructor(props) {
      super(props)
    }

    render() {
        return(
          <div>
            <Main_header />
            <Category data={this.props.data}/>
          </div>
        )
    }

};

export default Main