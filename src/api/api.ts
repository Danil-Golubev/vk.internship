import axios from 'axios';


export const fetchGetItems = async () => {
	const {data} = await axios.get('https://api.tcgdex.net/v2/en/sets');
	return data;
};
