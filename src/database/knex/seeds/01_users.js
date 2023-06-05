const bcrpyt = require("bcryptjs")
const password = "admin123"
const hash = bcrpyt.hashSync(password, 8)

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1,
     name: "Humberto Abreu",
     email: "admin@email.com",
     password: hash,
     isAdmin: true
    }

  ]);
};
