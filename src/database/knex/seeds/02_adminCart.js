
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('carts').del()
  await knex('carts').insert([
    {id: 1,
     user_id: 1,
    }

  ]);
};
