const canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d');

svgPatcher.fetch('example.svg').then(svgDocument => {
	function patcher(svgDocument) {
		svgDocument.children[0].setAttribute('fill', 'yellow');
	}
	return svgPatcher.patch(svgDocument, patcher);
}).then(img => {
	ctx.drawImage(img, 0, 0, 200, 200);
}).catch(console.error);
