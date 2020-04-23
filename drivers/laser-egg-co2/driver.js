'use strict';

const Homey = require('homey');
const Driver = require('../driver');

class LaserEggCO2Driver extends Driver {
	
	onInit() {
		this.log('LaserEggCO2Driver has been inited');
	}
	
}

module.exports = LaserEggCO2Driver;