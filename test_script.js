const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const name = process.argv[2];

function displayResult(arr) {
  let count = 0;
  console.log("Searching ...");
  console.log(`Found ${arr.length} person(s) by the name ${name}:`);
  for (let i = 0; i < arr.length; i++) {
    count++;
    let firstName = arr[i]["first_name"];
    let lastName = arr[i]["last_name"]; 
    let birthdate = arr[i]["birthdate"];
    console.log(` - ${count}: ${firstName} ${lastName}, born ${birthdate}`);
  }
}

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(`SELECT * FROM famous_people AS name WHERE first_name = '${name}' OR last_name = '${name}'`, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    displayResult(result.rows);
    client.end();
  });
});