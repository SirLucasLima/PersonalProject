exports.up = knex => knex.schema.createTable("links", table => {
  table.increments("id");
  table.text("url").notNullable();

  //estratégia para que o LINK seja exlcuído junto com sua respectiva NOTA "note"
  table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");
  table.timestamp("updated_at").default(knex.fn.now());
});
  
exports.down =  knex => knex.schema.dropTable("links");

//para gerar a migration usar o comando (npx knex migrate:latest)