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

const deleteMedicine = (id) => {
	console.log(id);
	if (!id) {
		return;
	}
	return new Promise((resolve, reject) => {
		db.all("delete from medicines where m_id=?", [id], (err, rows) => {
			if (err) {
				console.log(err.message, "djk");
				reject(err);
			} else {
				console.log(rows);
				resolve(rows);
			}
		});
	});
};

const insertMedicine = (m_name, m_rate, m_comp_name, m_discount, m_qty) => {
	if (!m_name || !m_rate || !m_comp_name || !m_discount || !m_qty) {
		return Promise.reject(new Error("All fields are required"));
	}
	return new Promise((resolve, reject) => {
		db.run(
			"insert into medicines (m_name,m_rate,m_comp_name,m_discount,m_qty) values (?,?,?,?,?)",
			[m_name, m_rate, m_comp_name, m_discount, m_qty],
			(err, rows) => {
				if (err) {
					reject(err);
				} else {
					resolve(rows);
				}
			},
		);
	});
};

const updateMedicine = (
	m_id,
	m_name,
	m_rate,
	m_comp_name,
	m_discount,
	m_qty,
) => {
	if (!m_id || !m_name || !m_rate || !m_comp_name || !m_discount || !m_qty) {
		return Promise.reject(new Error("All fields are required"));
	}
	return new Promise((resolve, reject) => {
		db.run(
			"update medicines set m_name=? , m_rate=? , m_comp_name = ? , m_discount = ? , m_qty = ? where m_id=?",
			[m_name, m_rate, m_comp_name, m_discount, m_qty, m_id],
			(err, rows) => {
				if (err) {
					reject(err);
				} else {
					resolve(rows);
				}
			},
		);
	});
};

// ============== Customers ================================

const showAllCustomers = () => {
	return new Promise((resolve, reject) => {
		db.all("select * from customers", [], (err, rows) => {
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

const searchCustomers = (query) => {
	if (!query) {
		return showAllCustomers();
	}
	return new Promise((resolve, reject) => {
		db.all(
			"select * from customers where customer_id LIKE ? OR first_name LIKE ? OR last_name LIKE ?",
			[`%${query}%`, `%${query}%`, `%${query}%`],
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

const deleteCustomer = (id) => {
	console.log(id);
	if (!id) {
		return;
	}
	return new Promise((resolve, reject) => {
		db.all("delete from medicines where customer_id=?", [id], (err, rows) => {
			if (err) {
				console.log(err.message, "djk");
				reject(err);
			} else {
				console.log(rows);
				resolve(rows);
			}
		});
	});
};

const insertCustomer = (first_name, last_name, phone, email, address) => {
	if (!first_name || !last_name || !phone || !email || !address) {
		return Promise.reject(new Error("All fields are required"));
	}
	return new Promise((resolve, reject) => {
		db.run(
			"insert into customers (first_name, last_name, phone, email, address) values (?,?,?,?,?)",
			[first_name, last_name, phone, email, address],
			(err, rows) => {
				if (err) {
					reject(err);
				} else {
					resolve(rows);
				}
			},
		);
	});
};

const updateCustomer = (
	customer_id,
	first_name,
	last_name,
	phone,
	email,
	address,
) => {
	if (
		!customer_id ||
		!first_name ||
		!last_name ||
		!phone ||
		!email ||
		!address
	) {
		return Promise.reject(new Error("All fields are required"));
	}
	return new Promise((resolve, reject) => {
		db.run(
			"update customers set first_name=? , last_name=? ,  phone= ? , email = ? , address = ? where customer_id=?",
			[first_name, last_name, phone, email, address, customer_id],
			(err, rows) => {
				if (err) {
					reject(err);
				} else {
					resolve(rows);
				}
			},
		);
	});
};

export {
	showAllMeds,
	searchMeds,
	deleteMedicine,
	insertMedicine,
	updateMedicine,
	searchCustomers,
	deleteCustomer,
	insertCustomer,
	updateCustomer,
};
