document.addEventListener("DOMContentLoaded", () => {
	const tbody = document.querySelector("tbody");

	addMedicines(tbody);
});

function addMedicines(el) {
	fetch("http://localhost:3000/test")
		.then((j) => j.json())
		.then((med) => {
			console.log(med);
			el.innerHTML = med
				.map(
					(i) =>
						`<tr>
                <td>${i.m_id}</td>
                <td>${i.m_name}</td>
                <td>${i.m_rate}</td>
                <td>${i.m_comp_name}</td>
                <td>${i.m_discount}</td>
                <td>${i.m_inStock}</td>
                </tr>`,
				)
				.join("");
		});
}
