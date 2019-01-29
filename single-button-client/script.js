window.onload = function() {
	var post = function(data) {
		// var url = new URL("http://localhost:5000/test")
		var url = new URL("https://node-server-test.now.sh/test")
		// var params = { name: "Chris" };
		// Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
		fetch(url, {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			}
		});
	}

	document.querySelector('form').addEventListener('submit', (event) => {
		event.preventDefault();

		console.log('Press');

		let data = {
			mode: "cycle",
			colors: [
				{
					r: 255,
					g: 0,
					b: 0
				},
				{
					r: 0,
					g: 255,
					b: 0
				},
				{
					r: 0,
					g: 0,
					b: 255
				}
			],
			delay: 1500
		};

		post(data);

		//	JSON
		// fetch("http://localhost:5000/test", {
		// 	method: "POST",
		// 	body: JSON.stringify(data),
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// });

		// 	ENCODED
		// fetch("http://localhost:5000/test", {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/x-www-form-urlencoded",
		// 	},
		// 	body: new URLSearchParams({
		// 		name: "Chris"
		// 	})
		// });

	});
};
