function getRows(table, query) {
	const data = fetch(`http://localhost:3000/${table}?value=${query}`)
		.then((data) => data.json())
		.then((rows) => rows);

	return data;
}
function deleteRow(id, table, query) {
	if (confirm("Do you want to delete")) {
		fetch(`http://localhost:3000/${table}/${id}`, {
			method: "DELETE",
		});
		getRows(table, query);
	} else {
		return;
	}
}

function insertRow(table, data) {
	if (!table || !data) {
		console.error("invalid");

		return;
	}
	fetch(`http://localhost:3000/${table}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
}

// replcaes td with input tags and uses td.textContent as input.value
function rowEdit(tr) {
	let tds = Array.from(tr.children);
	// console.log(tds.shift());
	const idCell = tds.shift();
	const actionCell = tds.pop();
	tds = tds.map((e) => {
		return `<input  value="${e.textContent}" />`;
	});
	tds = [
		idCell.outerHTML,
		...tds.map((td) => `<td>${td}</td>`),
		`<td><button id="saveMedicine" data-id="${idCell.textContent}">Save</button></td>`,
	];
	tr.innerHTML = tds.join("");
}

function debounce(func, delay) {
	let timeout;
	return function (...args) {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			func.apply(this, args);
		}, delay);
	};
}

export { getRows, debounce, deleteRow, insertRow, rowEdit };
