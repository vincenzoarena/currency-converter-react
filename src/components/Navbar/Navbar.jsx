import React, { Component } from "react";
import { MenuItems } from "./MenuItems";
import { Button } from "../Button";
import "./Navbar.css";

class Navbar extends Component {
    state = { clicked: false }

    handleClick = () => {
        this.setState({clicked: !this.state.cliched })
    }
  render() {
    return (
      <nav className="NavbarItems">
        <h1 className="navbar-logo">Utility Deck <i className="fa-solid fa-rectangle-list"></i></h1>
        <div className="menu-icon" onClick={this.handleClick}>
            <i className={this.state.click ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'}></i>
        </div>
        <ul className={this.state.clicked ? 'nav-menu active' : ''}>
            {MenuItems.map((item, index) => {
                return (
                    <li key={index}>
                        <a className={item.cName} href={item.url}>{item.title}</a>
                    </li>
                )
            })}            
        </ul>
        <Button>Sign Up</Button>
      </nav>
    );
  }
}

export default Navbar;