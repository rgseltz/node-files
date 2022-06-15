const fs = require('fs');
const axios = require('axios');

function handleOutputData(data, out) {
	if (out) {
		fs.writeFile(out, data, 'utf8', (err) => {
			if (err) {
				console.log('ERROR:', err);
				process.exit(1);
			}
			console.log('Successfully added data');
		});
	} else {
		console.log(data);
	}
}

function cat(path, out) {
	fs.readFile(path, 'utf-8', (err, data) => {
		if (err) {
			console.log(`Error reading ${path}`, err);
			process.exit(1);
		}
		handleOutputData(data, out);
	});
}

async function webCat(url, out) {
	try {
		let resp = await axios.get(url);
		handleOutputData(resp.data, out);
	} catch (err) {
		console.log(`Error fetching: ${url}. Please check url and try again`, err);
	}
}

let path;
let out;

//node step3.js --out new-file.txt  file-path.txt OR http://.com
//arg0  arg1    arg2    arg3        arg4

if (process.argv[2] === '--out') {
	out = process.argv[3];
	path = process.argv[4];
} else {
	path = process.argv[2];
}

if (path.slice(0, 4) === 'http') {
	webCat(path, out);
} else {
	cat(path, out);
}

module.exports = {
	cat: cat,
	webCat: webCat,
	handleOutputData: handleOutputData
};
