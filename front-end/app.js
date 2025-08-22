let data;
fetch("http://localhost:3000/test")
	.then((j) => j.json())
	.then((k) => {
		data = k;
		console.log(k);
		document.querySelector("thead").innerHTML = Object.keys(data[0])
			.map((th) => `<th>${th}</th>`)
			.join("");
		document.querySelector("tbody").innerHTML = data
			.map(
				(rows) => `
            <tr>
            ${Object.keys(data[0])
							.map((j) => `<td>${rows[j]}</td>`)
							.join("")}
            </tr>
            `,
			)
			.join("");
	})
	.catch((e) => console.error(e));
const dialog = document.querySelector("dialog");

const p_id = document.querySelector("#p_id");
const p_name = document.querySelector("#p_name");
const p_content = document.querySelector("#p_content");

document.querySelector("#addRowBtn").onclick = () => {
	dialog.showModal();
};

document.querySelector("form").onsubmit = (e) => {
	e.preventDefault();
	if (p_id.value && p_name.value && p_content.value) {
		const user = {
			p_id: p_id.value,
			p_name: p_name.value,
			p_content: p_content.value,
		};

		fetch("http://localhost:3000/test", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});
	} else {
		return;
	}
	dialog.close();
};

document.querySelector("dialog").onclick = (e) => {
	const rect = dialog.getBoundingClientRect();
	if (
		rect.left > e.clientX ||
		rect.right < e.clientX ||
		rect.top > e.clientY ||
		rect.bottom < e.clientY
	) {
		dialog.close();
	}
};
