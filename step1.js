const fs = require('fs');

function cat(path) {
	fs.readFile(path, 'utf-8', (err, data) => {
		if (err) {
			console.log(`Error reading ${path}`, err);
		}

		console.log('File data:', data);
	});
}

cat(process.argv[2]);

module.exports = {
	cat: cat
};
