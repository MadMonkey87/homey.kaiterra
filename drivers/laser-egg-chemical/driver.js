'use strict';

const Homey = require('homey');
const Driver = require('../driver');

class LaserEggChemicalDriver extends Driver {
	
	onInit() {
		this.log('LaserEggChemicalDriver has been inited');
	}
	
}

module.exports = LaserEggChemicalDriver;