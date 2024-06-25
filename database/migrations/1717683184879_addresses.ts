import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'addresses'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('street', 255).notNullable()
      table.string('suburb', 255).notNullable()
      table.string('city', 255).notNullable()
      table.string('state', 255).notNullable()
      table.string('country', 255).notNullable()
      table.integer('zip_code').notNullable()
      table.double('latitude').defaultTo(0.0)
      table.double('longitude').defaultTo(0.0)
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable().onDelete('CASCADE')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
