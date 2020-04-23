'use strict';

const Homey = require('homey');

class KaiterraApp extends Homey.App {
	
	onInit() {
		this.log('Kaiterra is running...');
	}
	
}

module.exports = KaiterraApp;