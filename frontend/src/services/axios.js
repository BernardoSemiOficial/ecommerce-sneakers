import axios from "axios";

export const instanceAxios = axios.create({
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json'
	}
});