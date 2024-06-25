import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 180).notNullable()
      table.string('lastname', 180).notNullable()
      table.integer('age').notNullable()
      table.date('birthdate').notNullable()
      table.string('email', 255).notNullable().unique()
      table.string('nickname', 180).notNullable().unique()
      table.string('phone', 10).notNullable().unique()
      table.string('password', 255).notNullable()
      table.integer('role_id').unsigned().references('id').inTable('roles').defaultTo(2)
      table.string('remember_me_token').nullable()
      table.boolean('active').defaultTo(true)

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
