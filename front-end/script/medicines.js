import { getRows, debounce, deleteRow } from "./func.js";

document.addEventListener("DOMContentLoaded", async () => {
	const tbody = document.querySelector("tbody");
	const medSearchBar = document.querySelector("#searchMedicine");

	//render rows on page load

	addMedicines(tbody, await getRows("medicines", medSearchBar.value));

	// when user types in search bar display rows based on that value

	medSearchBar.oninput = function (e) {
		e.preventDefault();
		debouncedSearchMeds(e.target.value, tbody);
	};

	if (document.querySelectorAll("#deleteMedicine")) {
		Array.from(document.querySelectorAll("#deleteMedicine")).map((btn) => {
			btn.addEventListener("click", function () {
				deleteRow(btn.dataset.id, "medicines", medSearchBar.value);
			});
		});
	}
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
