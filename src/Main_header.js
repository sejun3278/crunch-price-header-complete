import React, { Component } from 'react';
import './App.css';

class Main_header extends Component {

    render() {
        return (
            <div>
                <img 
                  className="top_logo"
                  src="http://m.crunchprice.com/data/skin/mobile/M_sikcode_C/img/banner/edd0f68f1e06cbdde4f2d01dd76383e8_90032.png"
                />

            <div className="top_nav">
                    <a className="top_nav_right"> 로그인 </a>
                    <a className="top_nav_right"> 회원가입 </a>
                    <a className="top_nav_right"> 장바구니 </a>
                    <a className="top_nav_right"> 마이페이지 </a>
                </div>
        
                <div className="top_wrap">
                      <a>
                        <img
                            className="home_logo"
                            src="http://m.crunchprice.com/data/skin/mobile/M_sikcode_C/img/banner/b12f0e43396e6f2a113c632140aaf365_89487.gif"
                        />
                      </a>

                    <div className="layout_search">
                        <form
                            method="POST"
                            
                        />
                        <input
                            className="input_search"
                        />

                    <button className="button_search">
                        <img
                            className="search_icon"
                            src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-magnifier-5.png&r=255&g=255&b=255"
                        />
                    </button>
                    </div>
                </div>
        </div>
        );
      }
  }
  
  export default Main_header;