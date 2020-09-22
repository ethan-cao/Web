
function testJQuery() {
	const $tableBody = $("tbody"); // select all tbody elements
	const bgColor = $tableBody.css("background-color"); // get CSS property valye

	const $rows = $tableBody.children(); // .children( [selector ] ) : get direct children that matches selector
	const $cell = $tableBody.find(".newClass"); // get all descents matching selector

	$rows.each((idx, rowElem) => {
		// idx starts from 0, rowElem is the DOM element in selection
		console.log(idx, " : ", rowElem);
		console.log(this); // this refers window,the same lexical this in its surrounding code
	});

	$rows.each(function(idx, rowElem) {
		// idx starts from 0, rowElem is the DOM element in selection
		console.log(idx, " : ", rowElem);
		console.log(this === rowElem); //true, this refers to rowElem
	});
}
