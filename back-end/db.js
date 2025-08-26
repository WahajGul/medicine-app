import sqlite3 from "sqlite3";

// this is a top-level await
let db = new sqlite3.Database("./database/medicineApp.db");

// ==============  Medicines ==============================
const showAllMeds = () => {
	return new Promise((resolve, reject) => {
		db.all("select * from medicines", [], (err, rows) => {
			if (err) {
				console.error("error : ", err.message);
				reject(err);
			} else {
				// console.log(rows);
				resolve(rows);
			}
		});
	});
};

const searchMeds = (query) => {
	if (!query) {
		console.log("from if", query);

		return showAllMeds();
	}
	return new Promise((resolve, reject) => {
		db.all(
			"select * from medicines where m_name LIKE ? OR m_comp_name LIKE ?",
			[`%${query}%`, `%${query}%`],
			(err, rows) => {
				if (err) {
					console.error(err);
					reject(err);
				} else {
					// console.log(rows);
					resolve(rows);
				}
			},
		);
	});
};
export { showAllMeds, searchMeds };
