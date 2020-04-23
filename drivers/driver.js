'use strict'

const Homey = require('homey');
const axios = require('axios');

class Driver extends Homey.Driver {

	onPair( socket ) {
		let token = '';

		socket.on('login', ( data, callback ) => {

			const username = data.username;
			const password = data.password;
		  
			axios.post('https://api.kaiterra.cn/v1/auth/login', {
				email: username,
				password: password
			  })
			  .then(function (response) {
				token = response.data.token;
				callback(null, token != null );
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

			axios.get('https://api.kaiterra.cn/v1/account/me/device', config)
			  .then(function (response) {
				const devices = response.data.map(kaiterraDevice => {
					return {
						name: kaiterraDevice.name,
						data: { id: kaiterraDevice.timeID },
						settings: { pollInterval: 15 }
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