export interface Idol {
	chara_id: number;
	name: string;
	name_kana: string;
	age: number;
	home_town: number;
	height: number;
	weight: number;
	body_size_1: number;
	body_size_2: number;
	body_size_3: number;
	birth_month: number;
	birth_day: number;
	constellation: number;
	blood_type: number;
	hand: number;
	favorite: string;
	voice: string;
	model_height_id: number;
	model_weight_id: number;
	model_bust_id: number;
	model_skin_id: number;
	spine_size: number;
	personality: number;
	type: string;
	base_card_id: number;
	bus_vo_value: number;
	bus_da_value: number;
	bus_vi_value: number;
	special_type: number;
	kanji_spaced: string;
	kana_spaced: string;
	conventional: string;
	valist: any[];
	icon_image_ref: string;
  cards: number[]
}
