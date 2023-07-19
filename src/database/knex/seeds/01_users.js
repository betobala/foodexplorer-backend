const bcrpyt = require("bcryptjs")
const password = process.env.ADMIN_PASSWORD
const hash = bcrpyt.hashSync(password, 8)

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1,
     name: process.env.ADMIN_NAME,
     email: process.env.ADMIN_EMAIL,
     password: hash,
     isAdmin: true
    }

  ]);
};
