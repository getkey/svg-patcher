# svg-patcher

When you are using several similar SVG files in the same project, you should edit them using JavaScript instead of downloading many slightly different versions of the same image.
This library attempts to make this easy.

## Try the example

Just start `example/example.html` in your browser.

## How to use

Simply include `index.js` in your project.
It exports `svgPatcher` in the global scope.

### svgPatcher.fetch(url)

* `url`: String

This function returns a `Promise` that resolves with a SVG [`Document`](https://developer.mozilla.org/en-US/docs/Web/API/Document).

```javascript
svgPatcher.fetch('https://getkey.eu/magnifying_glass_icon.svg').then(svgDocument => {
	console.log(svgDocument);
});
```

### svgPatcher.patch(svgDocument, patcher)

* `svgDocument`: Document
* `patcher`: Function

`patcher` takes the svg `Document` you pass to `svgPatcher.patch()` as an argument.

`svgPatcher.patch()` returns a `Promise` that resolves with a patched `Image`.

```javascript
function patcher(svgDocument) {
	// navigate and modify the SVG's DOM however you want
	svgDocument.children[0].setAttribute("fill", "yellow");
	return svgDocument;
}

svgPatcher.patch(svgDocument, patcher).then(img => {
	document.body.appendChild(img);
});
```
