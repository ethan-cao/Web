import React, { useEffect, useContext, useState } from "react";
import NewSongForm from "./NewSongForm";
import { SongContext } from "../context/SongContext";

const SongList = () => {
	const {songs, addSong} = useContext(SongContext)
	const [counter, setCounter] = useState(0);

    useEffect(() => {
		console.log("[useEffect] counter: ", counter);
		window.document.title = counter;
	}, [counter]);

    useEffect(() => {
		console.log("[useEffect] songs: ", songs);

		return () => {
			console.log("[useEffect] songs cleanup:", songs)
			// return function can access the previous values
			// return function is called when 
			//   (1) component is gonna unmount
			//   (2) before next useEffect function is called
		}
    }, [songs]);  // if [], only invoked after 1st render
    
	console.log("render");
	return (
		<div className="song-list" onMouseOver={() => setCounter(counter + 1)}>
			<NewSongForm addSong={addSong}  />
			<ul>
				{songs.map((song) => (
					<li key={song.id}>{song.title}</li>
				))}
			</ul>
		</div>
	);
};

export default SongList;
