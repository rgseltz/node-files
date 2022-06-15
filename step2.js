const fs = require('fs');
const axios = require('axios');

function cat(path) {
	fs.readFile(path, 'utf-8', (err, data) => {
		if (err) {
			console.log(`Error reading ${path}`, err);
		}

		console.log('File data:', data);
	});
}

async function webCat(url) {
	try {
		let resp = await axios.get(url);
		console.log(resp);
	} catch (err) {
		console.log(`Error fetching: ${url}. Please check url and try again`, err);
	}
}

let path = process.argv[2];

if (path.slice(0, 4) === 'http') {
	webCat(path);
} else {
	cat(path);
}

module.exports = {
	cat: cat,
	webCat: webCat,
	path: path
};
