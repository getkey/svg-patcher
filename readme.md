# svg-patcher

When you are using several similar SVG files in the same project, you should edit them using JavaScript instead of downloading many slightly different versions of the same image.
This library attempts to make this easy.

## Try the example

Just start `example/example.html` in your browser.

## How to use

Simply include `svg-patcher.js` in your project.
It will export `svgPatcher` in the global scope.

### svgPatcher.fetch(url)

* `url`: String

This function returns a `Promise` that resolves with a SVG [`Document`](https://developer.mozilla.org/en-US/docs/Web/API/Document).

```javascript
svgPatcher.fetch('https://getkey.eu/magnifying_glass_icon.svg').then(svgDocument => {
	console.log(svgDocument);
});
```

### svgPatcher.patch(svgDocument, patcher[, clonable])

* `svgDocument`: Document
* `patcher`: Function
* `clonable`: Boolean

`patcher` takes the svg `Document` you pass to `svgPatcher.patch()` as an argument.

`svgPatcher.patch()` returns a `Promise` that resolves with a patched `Image`.

```javascript
function patcher(svgDocument) {
	// navigate and modify the SVG's DOM however you want
	svgDocument.children[0].setAttribute("fill", "yellow");
}

svgPatcher.patch(svgDocument, patcher).then(img => {
	document.body.appendChild(img);
});
```

If `clonable` is unset or set to `false`, the resolved image will not be clonable, ie:

```javascript
let newImg = oldImg.cloneNode(true); // won't work

let newImg = new Image(); // won't
newImg.src = oldImg.src; // work
```

If you set `clonable` to `true`, once you are done cloning it, you should release memory by calling [svgPatcher.revoke()](#svgpatcherrevokeimg).

### svgPatcher.revoke(img)

* img: `Image`

[Releases the memory](https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL) used to load your `Image`. Use this function only if you no longer need to clone your image.

It is only useful to use this function on clonable images.

You can use this function on the original `Image` or any of its clones.
