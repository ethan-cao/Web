import React, { Component, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/themeContext";
import { BookContext } from "../context/BookContext";

const BookList = () => {
	const { isLightTheme, light, dark} = useContext(ThemeContext);
	const { isAuthenticated, toggleAuth } = useContext(AuthContext);
    const { books } = useContext(BookContext);

    const theme = isLightTheme ? light : dark;

	return (
		<>
			<div onClick={toggleAuth} style={{ color: theme.syntax, background: theme.bg }}>
				{isAuthenticated ? "logged in" : "logged out"}
			</div>

			<div className="book-list" style={{ color: theme.syntax, background: theme.bg }}>
                <ul>
                    {books.map((book) => 
                        <li key={book.id} style={{background: theme.ui}}> {book.title} </li>
                    )}
                </ul>
			</div>
		</>
	);
};

export default BookList;

// equivalent version with Context.Consumer
class BookList1 extends Component {
    render() {
        return (
            <AuthContext.Consumer>
                {(authContext) => {
                    return (
                        <ThemeContext.Consumer>
                            {(themeContext) => {
                                const { isAuthenticated, toggleAuth } = authContext;
                                const { isLightTheme, light, dark } = themeContext;
                                const theme = isLightTheme ? light : dark;

                                return (
                                    <>
                                    <div onClick={toggleAuth} style={{ color: theme.syntax, background: theme.bg }}>
                                        { isAuthenticated ? "logged in" : "logged out"}
                                    </div>
                                    <div className="book-list" style={{ color: theme.syntax, background: theme.bg }}>
                                        <ul>
                                            <li>the way of kinds</li>
                                            <li>the name of the wind</li>
                                            <li>The final empire</li>
                                        </ul>
                                    </div>
                                    </>
                                );
                            }}
                        </ThemeContext.Consumer>
                    );
                }}
            </AuthContext.Consumer>
        );
    }
}