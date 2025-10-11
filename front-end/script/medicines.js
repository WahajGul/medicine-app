import { getRows, debounce, deleteRow, insertRow, rowEdit } from "./func.js";

// variable declaration

const tbody = document.querySelector("tbody");
const medSearchBar = document.querySelector("#searchMedicine");
const medicineDialog = document.querySelector("#addMedicineDialog");
const addMedicineBtn = document.querySelector("#addMedicineBtn");
const m_nameInput = document.querySelector("#m_name");
const m_rateInput = document.querySelector("#m_rate");
const m_comp_nameInput = document.querySelector("#m_comp_name");
const m_discountInput = document.querySelector("#m_discount");
const m_qtyInput = document.querySelector("#m_qty");

//render rows on page load
addMedicines(tbody, await getRows("medicines", medSearchBar.value));

// when user types in search bar display rows based on that value
medSearchBar.oninput = function (e) {
	e.preventDefault();
	debouncedSearchMeds(e.target.value, tbody);
};

// as soon as add medicine function load rows select all the buttons with #deleteMedicine
// map over them and bind the deleteRow function to them on click handler
if (document.querySelectorAll("#deleteMedicine")) {
	Array.from(document.querySelectorAll("#deleteMedicine")).map((btn) => {
		btn.addEventListener("click", function () {
			deleteRow(btn.dataset.id, "medicines", medSearchBar.value);
		});
	});
}

if (document.querySelectorAll("#editMedicine")) {
	Array.from(document.querySelectorAll("#editMedicine")).map((btn) => {
		btn.addEventListener("click", function (e) {
			rowEdit(e.currentTarget.closest("tr"));
		});
	});
}

if (document.querySelectorAll("#saveMedicine")) {
	// Array.from(document.querySelectorAll("#editMedicine")).map((btn) => {
	// 	btn.disabled = true;
	// });
	Array.from(document.querySelectorAll("#saveMedicine")).map((btn) => {});
}

// add button next to search bar
addMedicineBtn.onclick = () => {
	medicineDialog.showModal();

	if (document.querySelector("#addMedicineForm")) {
		document.querySelector("#addMedicineForm").onsubmit = async (e) => {
			console.log("hello");
			e.preventDefault();
			if (
				!m_nameInput.value ||
				!m_rateInput.value ||
				!m_comp_nameInput.value ||
				!m_discountInput.value ||
				!m_qtyInput.value
			) {
				alert("empty or invalid input field");
				return;
			}
			const data = {
				m_name: m_nameInput.value,
				m_rate: parseFloat(m_rateInput.value),
				m_comp_name: m_comp_nameInput.value,
				m_discount: parseFloat(m_discountInput.value),
				m_qty: m_qtyInput.value,
			};
			insertRow("medicines", data);

			m_nameInput.value = "";
			m_rateInput.value = "";
			m_comp_nameInput.value = "";
			m_discountInput.value = "";
			m_qtyInput.value = "";

			addMedicines(tbody, await getRows("medicines", medSearchBar.value));

			medicineDialog.close();
		};
	}
};

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
}

async function searchMeds(query, el) {
	addMedicines(el, await getRows("medicines", query));
}

let debouncedSearchMeds = debounce(searchMeds, 500);

document.querySelector("dialog").onclick = (e) => {
	const rect = document
		.querySelector("#medicineDialog")
		.getBoundingClientRect();
	if (
		e.clientX < rect.left ||
		e.clientX > rect.right ||
		e.clientY < rect.top ||
		e.clientY > rect.bottom
	) {
		document.querySelector("#medicineDialog").close();
	}
};
