exports.up = knex => knex.schema.createTable("tags", table => {
  table.increments("id");
  table.text("name").notNullable();

  //estratégia para que a TAG seja exlcuída junto com sua respectiva NOTA "note"
  table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");
  table.integer("user_id").references("id").inTable("users");
});
  
exports.down =  knex => knex.schema.dropTable("tags");

//para gerar a migration usar o comando (npx knex migrate:latest)