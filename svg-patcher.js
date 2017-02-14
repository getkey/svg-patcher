var svgPatcher = (() => {
	function patch (svgDocument, patcher, clonable = false) {
		return new Promise((resolve, reject) => {
			let newSvg = svgDocument.cloneNode(true);
			patcher(newSvg);

			let blob = new Blob([newSvg.outerHTML], {type: 'image/svg+xml;charset=utf-8'}), // convert DOMString to Blob
				img = new Image();

			img.addEventListener('load', ev => {
				if (clonable === false) revoke(img);
				resolve(ev.target);
			});
			img.addEventListener('error', err => {
				reject(err);
			});
			img.src = URL.createObjectURL(blob); // use blob://whatever to create image
		});
	}
	function fetch(url) {
		return new Promise((resolve, reject) => {
			let xhr = new XMLHttpRequest();
			xhr.responseType = 'document';
			xhr.open('GET', url, true);

			xhr.addEventListener('load', ev => {
				resolve(ev.target.response.documentElement);
			});
			xhr.addEventListener('error', err => {
				reject(err);
			});

			xhr.send();
		});
	}
	function revoke(img) {
		URL.revokeObjectURL(img.src);
	}

	return {
		patch,
		fetch,
		revoke
	};
})();
