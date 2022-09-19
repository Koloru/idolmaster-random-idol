import axios from "axios";
import classNames from "classnames";
import { useState, useEffect } from "react";

// Types
import { Idol } from "./types/idol";

function App() {
	const [idol, setIdol] = useState<Idol>();
	const [idols, setIdols] = useState<any[]>([]);
	const [cards, setCards] = useState<any[]>([]);
	const [mainBackground, setMainBackground] = useState("");

	async function randomIdol() {
		let randomIdol = Math.floor(Math.random() * idols?.length);
		const randIdol = idols[randomIdol];
		try {
			const response = await axios.get(
				"https://starlight.kirara.ca/api/v1/char_t/" +
					randIdol.chara_id +
					"?stubs=yes"
			);
			setIdol({ ...randIdol, ...response.data.result[0] });
			console.log(idol);
		} catch (error) {
			console.error(error);
		}
	}

	// Fix this
	async function getIdols() {
		try {
			const response = await axios.get(
				"https://starlight.kirara.ca/api/v1/list/char_t?stubs=yes"
			);
			setIdols(response.data.result);
		} catch (error) {
			console.error(error);
		}
	}

	const getCards = async (arr: number[]) => {
		if (arr) {
			const responses = await axios.get(
				"https://starlight.kirara.ca/api/v1/card_t/" + arr.join(",")
			);
			setCards(responses.data.result);
		}
	};

	function mainBG() {
		const imagesWithoutNull = cards.filter((c) => c?.spread_image_ref);
		setMainBackground(
			`url(${
				imagesWithoutNull[Math.floor(Math.random() * imagesWithoutNull?.length)]
					?.spread_image_ref
			})`
		);
	}

	useEffect(() => {
		getIdols();
	}, []);

	useEffect(() => {
		if (idols.length) {
			randomIdol();
		}
	}, [idols]);

	useEffect(() => {
		if (idol) {
			getCards(idol.cards);
		}
	}, [idol]);

	useEffect(() => {
		if (cards) {
			const imagesWithoutNull = cards.filter((c) => c?.spread_image_ref);
			setMainBackground(
				`url(${
					imagesWithoutNull[
						Math.floor(Math.random() * imagesWithoutNull?.length)
					]?.spread_image_ref
				})`
			);
		}
	}, [cards]);

let idolType = `text-${idol?.type}`	
	return (
		<div
			className='relative min-w-full min-h-screen bg-cover bg-no-repeat bg-center flex-column flex justify-center items-end flex-wrap'
			style={{
				backgroundImage: `linear-gradient(0deg, rgba(2,0,36,0.6) 0%, rgba(2,0,36,0.45) 19%, rgba(157,76,194,0.3) 91%), ${mainBackground}`,
			}}
		>
			{/* BLUR */}
			<div className='min-w-full min-h-screen absolute'></div>

			<div className='z-50 text-center mb-5 flex-col flex gap-5 justify-center items-center content-center'>
				<img
					src={idol?.icon_image_ref}
					alt={idol?.conventional}
					className='mb-8'
					onClick={mainBG}
				/>

				<h1 className='text-8xl text-white block font-alumni tracking-wide font-bold drop-shadow-md'>
					{/* Idol Kana Name Section Start */}
					<span
						className={
							idol?.kanji_spaced.split(" ").length !== 2
								? idolType
								: ""
						}
					>
						{idol?.kanji_spaced.split(" ")[0]}
					</span>

					{/*  Idol Kana Name Section end  */}

					<span className={idolType}>
						{idol?.kana_spaced.split(" ")[1]}
					</span>

					<div className='text-4xl'>
						{idol?.conventional}
						{idol?.age ? `(${idol?.age})` : ""}
					</div>

					<div className='text-4xl'>
						<span>{idol?.height}cm</span> -<span>{idol?.weight}Kg</span>
					</div>
				</h1>

				<button
					onClick={randomIdol}
					className='border border-white text-md text-white bg-slate-500 text-4xl font-alumni py-2 px-8 rounded hover:bg-transparent hover:text-white bg-white text-black'
				>
					Aidoru
				</button>
			</div>
		</div>
	);
}

export default App;
