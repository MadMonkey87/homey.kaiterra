'use strict'

const Homey = require('homey');
const axios = require('axios');

class Driver extends Homey.Driver {

	onPair( socket ) {
		let token = '';

		socket.on('login', ( data, callback ) => {

			const username = data.username;
			const password = data.password;
		  
			axios.post('https://dashboard.kaiterra.com/v1/auth/login', {
				email: username,
				password: password
			  })
			  .then(function (response) {
				if(response.status === 200){
					token = response.data.token;
					callback(null, token != null );
				} else {
					callback(null, false );
				}
			  })
			  .catch(function (error) {
				console.log('error while validating credentials: ' + error);
				callback(null, false );
			  });
		});
		
		socket.on('list_devices', ( data, callback ) => {

			const config = {
				headers: {
				  'Authorization': 'Bearer ' + token
				}
			  };

			axios.get('https://dashboard.kaiterra.com/v1/account/me/device', config)
			  .then(function (response) {
				const devices = response.data.map(kaiterraDevice => {
					return {
						name: kaiterraDevice.name,
						data: { id: kaiterraDevice.uuid },
						settings: { pollInterval: 15, id: kaiterraDevice.uuid, serial: kaiterraDevice.serial, firmware: kaiterraDevice.firmware_version }
					};
				});
				callback(null, devices );
			  })
			  .catch(function (error) {
				callback(new Error('Cannot find devices:' + error));
			  });

		});
	  }
    
}

module.exports = Driver