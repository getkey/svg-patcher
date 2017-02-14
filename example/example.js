svgPatcher.fetch('example.svg').then(svgDocument => {
	function patcher(svgDocument) {
		svgDocument.children[0].setAttribute('fill', 'yellow');
		return svgDocument;
	}
	return svgPatcher.patch(svgDocument, patcher);
}).then(img => {
	console.log(img);
	document.body.appendChild(img);
});
