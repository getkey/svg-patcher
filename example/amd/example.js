requirejs(['svg-patcher'], svgPatcher => {
	svgPatcher.fetch('example.svg').then(svgDocument => {
		function patcher(svgDocument) {
			svgDocument.children[0].setAttribute('fill', 'yellow');
		}
		return svgPatcher.patch(svgDocument, patcher, true);
	}).then(img => {
		console.log(img);
		document.body.appendChild(img);
		document.body.appendChild(img.cloneNode(true));
		svgPatcher.revoke(img);
	});
});
