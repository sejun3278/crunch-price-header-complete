import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Modal from 'react-modal';
import axios from "axios";

var angles = {}
var incluse_boolean = ["category_final_menu", "category_second_level", "category_final_level", "all_see"]

  class Category extends Component {
      constructor(props) {
          super(props)
          this.state = {
            categoryData : this.props.data,
            categoryToggle : false,
            angleToggle : false,
            secondToggle : false,
            cover_width : 0,
          }
      
          this.toggle_category = this.toggle_category.bind(this);
          this.toggle_angel = this.toggle_angel.bind(this);
        
          for(let i = 0; i < this.props.data.length; i++) {
            angles[i] = {};
            angles[i]['status'] = false;
            angles[i]['children'] = {};
  
            for(let j = 0; j < Object.keys(this.props.data[i].children).length; j++) {
              angles[i]['children'][Object.keys(this.props.data[i].children)[j]] = false
            }
          }
        }
  
      toggle_category() {
          this.setState({
            categoryToggle : !this.state.categoryToggle,
            cover_width : ReactDOM.findDOMNode(this).offsetWidth,
            cover_height : ReactDOM.findDOMNode(this).offsetHeight,
          })
        }
  
        toggle_angel(e) {
          var el = e.target
          var second = false;
          var first_num = null;
          var cover_num = null;
  
          if(incluse_boolean.includes(el.classList[0]) === true || el.classList[0] === undefined) {
            return;
          }
  
          if(el.classList.contains("category_down") === true) {
            el = e.target.parentNode
  
          } else if(el.classList.contains("second_title") === true) {
            first_num = el.classList[2]
            cover_num = el.classList[1]
            second = true;
          }
  
          if(el.classList.contains("category_second_menu") === true) {
            second = true;
            first_num = el.parentNode.parentNode.classList[1]
          }
  
          if(cover_num === null) {
          cover_num = el.classList[1];  
        }
            if(cover_num === '004002') {
              return;
            }
        ///////////////////////////////////////////////////////////////////////////// el 결정하기
  
          if(el.classList.contains("on")) {
            el.classList.remove('on')
  
            if(second === false) {
              angles[cover_num]['status'] = false;
              this.setState({
                angleToggle : false
            })
            
            } else {
              angles[first_num].children[cover_num] = false;
              this.setState({
                secondToggle : false
              })
            }  
      
          } else {
            el.classList.add('on')
  
            if(second === false) {
              angles[cover_num]['status'] = true;
              this.setState({
                angleToggle : true
            })
  
            } else {
              angles[first_num].children[cover_num] = true;
              this.setState({
                secondToggle : true
            })
          }
        }
      };

    render() {
      let shown = {
        display : this.state.categoryToggle ? "block" : "none"
      }
        return (
          <div className="main_link_wrap">
            <div className="side_manu">
                 <img 
                    onClick={() => this.toggle_category()} 
                    className="side_title"
                    src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2018/png/iconmonstr-menu-thin.png&r=255&g=255&b=255"
                    />

                 <Modal
                  isOpen={this.state.categoryToggle}
                  closeTimeoutMS={500}
  
                  style={{
                    overlay: {
                      position: 'static',
                      display: 'block',
                    },
                    content: {
                      overflow: 'auto',
                      width: '100%',
                      height: '750px',
                      transform: 'translate(-40px, -8.2%)',
                      backgroundColor: 'rgba(0, 0, 0, 1.2)',
                    }
                  }}
                > 
                  <nav style={shown}>
                    <div className="nav_box">
                      <div className="nav_banner">
                        <a className="nav_banner_right" onClick={() => console.log('로그인')}>로그인 </a> 
                            | 
                        <a className="nav_banner_left" onClick={() => console.log('회원가입')}> 회원가입</a>
                      </div>
  
                      <div className="nav_link">
                          <div className="nav_link_margin">
                          <img className="nav_image" src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-speech-bubble-20.png&r=0&g=0&b=0"/>
                            <a> Q & A </a>
                          </div>
  
                          <div className="nav_link_margin">
                          <img className="nav_image" src="https://cdns.iconmonstr.com/wp-content/assets/preview/2012/240/iconmonstr-eye-4.png"/>
                            <a> 최근 본 상품 </a>
                          </div>
  
                          <div className="nav_link_margin">
                          <img className="nav_image" src="https://cdns.iconmonstr.com/wp-content/assets/preview/2012/240/iconmonstr-favorite-2.png"/>
                            <a> 찜 리스트 </a>
                          </div>
                        </div>
  
                        <div className="nav_tapmenu_bar">
                           <div className="category_menu_area">
                           <ul className="category_side">
                             {this.state.categoryToggle ?
                              this.state.categoryData.map( (el, key) => {
                                {var angle_src = {
                                  src : angles[key]['status'] ? 'https://cdns.iconmonstr.com/wp-content/assets/preview/2017/240/iconmonstr-arrow-66.png' : 'https://cdns.iconmonstr.com/wp-content/assets/preview/2018/240/iconmonstr-angel-down-thin.png'
                                }
                                var second_show = {
                                  display : angles[key]['status'] ? 'block' : 'none'
                                }
                              };
                                return(
                                  <li key={el.cateCd} className={`category_menu_title ${key}`} onClick={this.toggle_angel}>
                                    {el.cateNm} 
                                      <img
                                        className="category_down" 
                                        src = {angle_src.src}
                                      />
                                      <ul className="category_second_level" style={second_show}>
                                        <li className={`category_second_menu ${key}`}>
                                          <a className="all_see" href={`http://m.crunchprice.com/goods/goods_list.php?cateCd=` + el.cateCd}> 전체보기 </a>
                                        </li>
  
                                      {Object.keys(el.children).map( (el_2, i) => {
                                        {var second_angle = {
                                          src : angles[key].children[el_2] ? 'https://cdns.iconmonstr.com/wp-content/assets/preview/2017/240/iconmonstr-arrow-66.png' : 'https://cdns.iconmonstr.com/wp-content/assets/preview/2018/240/iconmonstr-angel-down-thin.png',
                                        }
                                        var final_show = {
                                          display : angles[key].children[el_2] ? 'block' : 'none'
                                        }
                                        var dont_have = {
                                          boolean : el.children[el_2].children === undefined ? true : false
                                        }
                                      }
                                        return(
                                          <li key={i} className={`category_second_menu ${el.children[el_2].cateCd}`}>
                                            {dont_have.boolean
                                            ? <a
                                                href={`http://m.crunchprice.com/goods/goods_list.php?cateCd=` + el.children[el_2].cateCd}
                                                className={`all_see ${el.children[el_2].cateCd} ${key}`}> {el.children[el_2].cateNm}
                                              </a>

                                            : angles[key].children[el_2] 
                                              ? <b> <a className={`second_title ${el.children[el_2].cateCd} ${key}`}> {el.children[el_2].cateNm} </a> </b> 
                                              : <a className={`second_title ${el.children[el_2].cateCd} ${key}`}> {el.children[el_2].cateNm} </a>}
  
                                            {dont_have.boolean ? null : 
                                            
                                            <img
                                              className="category_down" 
                                              src = {second_angle.src}
                                            />}
  
                                            <div className="category_final_level" style={final_show}>
                                                <a className="category_final_menu" href={`http://m.crunchprice.com/goods/goods_list.php?cateCd=` + el.children[el_2].cateCd}> 
                                              전체보기 
                                                </a>
                                              {el.children[el_2].children === undefined ? null :
                                              el.children[el_2].children.map( (el_3, j) => {
                                                return(
                                                  <a 
                                                  href={`http://m.crunchprice.com/goods/goods_list.php?cateCd=` + el_3.cateCd}
                                                  className="category_final_menu" key={j}> 
                                                  {el_3.cateNm} 
                                                  </a>
                                                ) // 리턴은 컴포넌트로 따로 빼서 하기
                                              })
                                            }
                                            </div>
                                          </li>
                                        )
                                      })}
                                      </ul>
                                  </li>
                                )
                              })
                              : null
                            }
                            </ul>
                          </div> 
                        </div>
  
                        <div className="nav_community_box">
                            <ul className="nav_community_title">
                              <li> 
                                <a> 크런치 프라이스 소식 </a>
                              </li>
                              <li> 
                                <a> 상품 후기 </a>
                              </li>
                              <li> 
                                <a> 상품 문의 </a>
                              </li>
                              <li> 
                                <a> FAQ </a>
                              </li>
                              <li> 
                                <a onClick={() => this.test()}> 판매자 문의 </a>
                              </li>
                            </ul>
                        </div>
                    </div>
  
                    <div className="close_position">
                      <img 
                          onClick={() => this.toggle_category()}
                          className="close_button"
                          alt="닫기"
                          src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-x-mark-2.png&r=255&g=255&b=255"
                      />
                    </div>
                  </nav>
                </Modal>
              </div>
          </div>
        );
      }
  }
  
  export default Category;