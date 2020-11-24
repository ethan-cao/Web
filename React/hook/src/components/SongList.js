import React, { useEffect, useContext, useState } from "react";
import NewSongForm from "./NewSongForm";
import { SongContext } from "../context/SongContext";

const SongList = () => {
	const {songs, addSong} = useContext(SongContext)
	const [counter, setCounter] = useState();

    useEffect(() => {
		console.log("[Effect] counter: ", counter);

	}, [counter]);

    useEffect(() => {
		console.log("[useEffect] songs: ", songs);

		return () => {
			console.log("[useEffect] songs cleanup:", songs)
			// called when 
			//   (1) component is gonna unmount
			//   (2) before next useEffect content is called
			// can access the previous values
		}
    }, [songs]);  // if [], only invoked after 1st render
    
	console.log("render");
	return (
		<div className="song-list">
			<ul>
				{songs.map((song) => (
					<li key={song.id}>{song.title}</li>
				))}
			</ul>
            <NewSongForm addSong={addSong} />
		</div>
	);
};

export default SongList;
