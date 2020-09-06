import React, { createContext, useReducer } from "react";
import { songReducer } from "../reducer/songReducer";

export const SongContext = createContext();

const SongContextProvider = (props) => {
	const [songs, dispatch] = useReducer(songReducer, [])

	return (
        <SongContext.Provider value={{ songs, dispatch }}>
            {props.children}
        </SongContext.Provider>
    );
};

export default SongContextProvider;
