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

	console.log(document.querySelectorAll("#deleteMedicine"));
	if (document.querySelectorAll("#deleteMedicine")) {
		Array.from(document.querySelectorAll("#deleteMedicine")).map((btn) => {
			btn.addEventListener("click", function () {
				console.log("HELLO");
			});
		});
	}
});

async function deleteMedicineRow(id) {
	if (confirm("Do you want to Delete")) {
		fetch(`http://localhost:3000/medicines/${id}`, {
			method: "DELETE",
		});
		renderMedRows();
	}
}
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
                <td>
            <button data-id=${i.m_id} id="editMedicine" >Edit</button>
            <button data-id=${i.m_id} class="del-med" id="deleteMedicine" >Delete</button>
            
            </td>
                </tr>`,
		)
		.join("");
	Array.from(document.querySelectorAll("#deleteMedicine")).map((btn) => {
		btn.onclick = function () {
			deleteMedicineRow(btn.dataset.id);
		};
	});
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

function renderMedRows() {
	const tbody = document.querySelector("tbody");
	fetch("http://localhost:3000/medicines")
		.then((meds) => meds.json())
		.then((data) => {
			addMedicines(tbody, data);
		});
}
let debouncedSearchMeds = debounce(searchMeds, 500);
