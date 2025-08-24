document.addEventListener("DOMContentLoaded", () => {
	const tbody = document.querySelector("tbody");
	fetch("http://localhost:3000/medicines")
		.then((meds) => meds.json())
		.then((data) => {
			addMedicines(tbody, data);
		});

	document.querySelector("#searchMedicine").addEventListener("input", (e) => {
		e.preventDefault();
		console.log(e.target.value);
		debouncedSearchMeds(e.target.value, tbody);
	});
});

function addMedicines(el, medicinesRows) {
	el.innerHTML = medicinesRows
		.map(
			(i) =>
				`<tr>
                <td>${i.m_id}</td>
                <td>${i.m_name}</td>
                <td>${i.m_rate}</td>
                <td>${i.m_comp_name}</td>
                <td>${i.m_discount}</td>
                <td>${i.m_qty}Pcs</td>
                </tr>`,
		)
		.join("");
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

function searchMeds(query, el) {
	fetch(`http://localhost:3000/medicines?value=${query}`)
		.then((j) => j.json())
		.then((k) => {
			addMedicines(el, k);
		});
}

let debouncedSearchMeds = debounce(searchMeds, 500);
