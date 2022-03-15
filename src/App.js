import React, {useState} from "react";
import Player from "./classes/Player";
import './App.css';
import { useEffect } from "react";

function App() {

	const [player, setPlayer] = useState(new Player({
		frequencies: 128
	}));

	const getFile = (e) => {
		let file = e.target.files[0];
		if(file.type === 'audio/mpeg') {
			let obj = player;
			obj.setFile = file
			setPlayer(obj);
		}
	}

	useEffect(() => {
		let obj = player;
		obj.setAudio = document.getElementById('audio')
		obj.setCanvas = document.getElementById('canvas')
		obj.setWrapper = document.getElementById('wrapper')
		setPlayer(obj);
	}, [])

	useEffect(() => {
		// console.log('player: ', player);
	},[player]);

	return (
		<div className="App">
			<canvas id='canvas' className='wrapper' width='1024px' height='215px'/>
			<div id='wrapper' className='wrapper' />
			<audio className='Audio'  controls id="audio" src=""/>
			<label className='Label'>
				<input type='file' onChange={getFile} />
			</label>
		</div>
	);
}

export default App;
