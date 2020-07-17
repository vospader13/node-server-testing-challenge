exports.up = async function(knex) {
    await knex.schema.createTable("projects", (table) => {
        table.increments("id")
        table.string("name").notNull()
        table.string("description").notNull()
    })
    await knex.schema.createTable("users", (table) => {
		table.increments()
		table.text("name").notNullable()
	})
  };
  
  exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("projects")
    await knex.schema.dropTableIfExists("users")
  };
