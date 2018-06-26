const settings = require("./settings"); // settings.json
const knex = require('knex')({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
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

knex.select().from("famous_people").where("last_name", name).orWhere("first_name", name)
.then(function (data) {
  displayResult(data)
})
.finally(function() {
  knex.destroy();
});