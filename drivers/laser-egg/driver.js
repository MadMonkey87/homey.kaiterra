'use strict';

const Homey = require('homey');
const Driver = require('../driver');

class LaserEggDriver extends Driver {
	
	onInit() {
		this.log('LaserEggDriver has been inited');
	}

}

module.exports = LaserEggDriver;