const Nightmare = require('nightmare'),
	nightmare = Nightmare({ show: true });

nightmare
	.goto('file://' + __dirname + '/../example/globals/example.html')
	.wait(3000)
	.evaluate(() => {
		return document.getElementsByTagName('img').length;
	})
	.end()
	.then(res => {
		console.log('Should be 2: ' + res);
	})
	.catch(err => {
		console.error(err);
	});
