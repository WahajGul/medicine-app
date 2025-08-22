import { rejects } from "assert";
import sqlite3 from "sqlite3";

// this is a top-level await
let db = new sqlite3.Database("./database/medicineApp.db");

// let run = db.run(
// 	"create table test ( p_id int PRIMARY KEY, p_name varchar(50) NOT NULL, p_content varchar(50) );",
// );

// let run = db.run(
// 	"insert into test values (101,'hobbit','hello'),(102,'bob','hi')",
// );

const showAll = () => {
	return new Promise((resolve, reject) => {
		db.all("select * from test", (err, rows) => {
			if (err) {
				console.error("error : ", err.message);
				reject(err);
			} else {
				console.log(rows);
				resolve(rows);
			}
		});
	});
};

const insertRow = (user) => {
	const keys = Object.keys(user);
	const values = Object.values(user);
	return new Promise((resolve, reject) => {
		db.run(
			`insert into test (p_id,p_name,p_content) values (?,?,?)`,
			values,
			(err) => {
				reject(err);

				db.all(
					`select * from test where p_id=(?)`,
					[user.p_id],
					(err, rows) => {
						if (err) console.error(err);

						resolve(rows);
					},
				);
			},
		);
	});
};
export { showAll, insertRow };
