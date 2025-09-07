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

function debounce(func, delay) {
	let timeout;
	return function (...args) {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			func.apply(this, args);
		}, delay);
	};
}

export { getRows, debounce, deleteRow };
