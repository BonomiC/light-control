window.onload = function() {
	var config = {
		apiKey: "AIzaSyBNyQ5Kb4RgRrCjR5usr4RiwYgn7J94K0E",
		authDomain: "light-control-c46ac.firebaseapp.com",
		databaseURL: "https://light-control-c46ac.firebaseio.com",
		projectId: "light-control-c46ac",
		storageBucket: "light-control-c46ac.appspot.com",
		messagingSenderId: "490129759068"
	};
	firebase.initializeApp(config);

	const database = firebase.database();
	const ref = database.ref('data')

	// console.log(database);
	// console.log(ref);

	// var data = {
	// 	name: 'ButtonPressed',
	// 	value: false
	// };

	document.querySelector('form').addEventListener('submit', (event) => {
		event.preventDefault();

		let data = {name: "Chris"};

		fetch("http://localhost:5000/test", {
			method: "POST",
			body: JSON.stringify(data)
		}).then(res => {
			console.log(res);
		});

		//ref.push(data);

		// ref.on('child_changed', (snapshot) => {
		// 	var data = snapshot.val();
		// 	console.log(data.value);
		// }, (err) => {
		// 	console.error(err);
		// });

		ref.once('value').then(function(snapshot) {
			var data = snapshot.val();
			var keys = Object.keys(data);

			for(var i = 0; i < keys.length; i++) {
				if(data[keys[i]].name == 'ButtonPressed') {
					database.ref('data/' + keys[0]).set({
						name: 'ButtonPressed',
						value: true
					});

					setTimeout(() => {
						database.ref('data/' + keys[0]).set({
							name: 'ButtonPressed',
							value: false
						});
					}, 50);
				}
			}
		});
	});
};
