window.onload = function() {

	document.querySelector('form').addEventListener('submit', (event) => {
		event.preventDefault();

		let data = {name: "Chris"};

		// var xhr = new XMLHttpRequest();
		// xhr.open("POST", "http://163.118.116.1:8081/test", true);
		// xhr.send(JSON.stringify(data));

		// console.log('Press');

		fetch("http://localhost:5000/test", {
			method: "POST",
			body: JSON.stringify({name: 1})
		}).then(res => {
			console.log(res.body);
		});
	});
};
