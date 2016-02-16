'use strict';

const fs = require('fs');
const path = require('path');
const filePath = path.resolve('data.json');

function readData() {
	try {
		return JSON.parse(fs.readFileSync(filePath, 'utf8'));
	} catch (err) {
		return {};
	}
}

exports.set = (key, val) => {
	const data = readData();
	data[key] = val;
	fs.writeFileSync(filePath, JSON.stringify(data));
};

exports.get = key => readData()[key];
