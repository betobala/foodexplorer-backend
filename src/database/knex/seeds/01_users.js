const bcrpyt = require("bcryptjs")
require("dotenv/config")
const password = process.env.ADMIN_PASSWORD
const name = process.env.ADMIN_NAME
const email = process.env.ADMIN_EMAIL
const hash = bcrpyt.hashSync(password, 8)

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1,
     name,
     email,
     password: hash,
     isAdmin: true
    }
  ]);
};
