'use strict';

const Homey = require('homey');
const axios = require('axios');

class LaserEggCO2Device extends Homey.Device {
	
	onInit() {
		this.log('LaserEggCO2Device has been inited');

		const settings = this.getSettings();
		const pollInterval = settings.pollInterval;
		this.log(pollInterval);
		const POLL_INTERVAL = 1000 * 60 * pollInterval;

        this.poll();

		setInterval(this.poll.bind(this), POLL_INTERVAL);
	}

	poll() {

		let id = this.getData().id;
		const device = this;

		this.log('Polling device: ' + id);

		axios.get('https://api.kaiterra.cn/v1/lasereggs/' + id + '?key=' + Homey.env.API_KEY)
		.then(function (response) {

			device.setCapabilityValue("measure_humidity", response.data['info.aqi'].data.humidity);
			device.setCapabilityValue("measure_temperature", response.data['info.aqi'].data.temp);
			device.setCapabilityValue("measure_pm25", response.data['info.aqi'].data.pm25);
			device.setCapabilityValue("measure_pm10", response.data['info.aqi'].data.pm10);
			device.setCapabilityValue("measure_co2", response.data['info.aqi'].data.data.co2);
			
			device.log('Updated device successfully: ' + id);

			return Promise.resolve();
		})
		.catch(function (error) {
			device.log('error: ' + error);
		});
	}
}

module.exports = LaserEggCO2Device;