import React, {Component} from 'react';
import {ThemeContext} from "../context/themeContext";

class Navbar extends Component{
    // contextType is applicable for class component
    // look up component tree and find the 1st context that is a ThemeContext.Provider
    // then attach the value in ThemeContext.Provider to this.context
    static contextType = ThemeContext;

    render() { 
        const {isLightTheme, light, dark} = this.context;
        const theme = isLightTheme ? light : dark;

        return (  
            <nav style={{background: theme.ui, color: theme.syntax}}>
                <h1>Context App</h1>
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </nav>

        );
    }
}
 
export default Navbar;