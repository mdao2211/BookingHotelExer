import pkg from "pg";
const { Client } = pkg;

const con = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "22112003",
  database: "postgres",
});

if (con.connect().then(() => console.log("Connected"))) {
} else console.log(error.message);

con.query("select * from guest; ", (err, res) => {
  if (!err) {
    console.log(res.rows);
  } else {
    console.log(err);
  }
  con.end();
});
