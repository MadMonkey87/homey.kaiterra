'use strict';

const Homey = require('homey');
const axios = require('axios');

class LaserEggChemialDevice extends Homey.Device {
	
	onInit() {
		this.log('LaserEggChemialDevice has been inited: ' + this.getData().id);

		const settings = this.getSettings();
		const pollInterval = settings.pollInterval;
		const POLL_INTERVAL = 1000 * 60 * pollInterval;

        this.poll();

		setInterval(this.poll.bind(this), POLL_INTERVAL);
	}

	poll() {

		let id = this.getData().id;
		const device = this;

		this.log('Polling device: ' + id);

		axios.get('https://dashboard.kaiterra.com/v1/lasereggs/' + id + '?key=' + Homey.env.API_KEY)
		.then(function (response) {

			let humidity = response.data['info.aqi'].data.humidity;
			let pm25 = response.data['info.aqi'].data.pm25;
			let pm10 = response.data['info.aqi'].data.pm10;
			let voc = response.data['info.aqi'].data.rtvoc;
			let temp = response.data['info.aqi'].data.temp;

			if(!humidity && !pm25 && !pm10 && !voc && !temp){
				device.setUnavailable("Device is offline");
			} else {

				device.setAvailable();

				if(humidity){
					device.setCapabilityValue("measure_humidity", humidity);
				}

				if(temp){
					device.setCapabilityValue("measure_temperature", temp);
				}

				if(pm25){
					device.setCapabilityValue("measure_pm25", pm25);
				}

				if(pm10){
					device.setCapabilityValue("measure_pm10", pm10);
				}

				if(voc){
					device.setCapabilityValue("measure_voc", voc);
				}
			}

			device.log('Updated device successfully: ' + id);
		})
		.catch(function (error) {
			device.log('error: ' + error);
			device.setUnavailable(error.error);
		});
	}
}

module.exports = LaserEggChemialDevice;