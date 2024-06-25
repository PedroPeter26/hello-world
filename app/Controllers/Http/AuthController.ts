import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'
import User from 'App/Models/User'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class AuthController {

  // * POST
  public async register({request, response}: HttpContextContract) {
    try {
      const validationSchema = schema.create({
        email: schema.string({}, [
          rules.email(),
          rules.unique({ table: 'users', column: 'email' }),
        ]),
        password: schema.string({}, [rules.minLength(8),]),
        nickname: schema.string({}, [
          rules.regex(/^@/),
          rules.unique({ table: 'users', column: 'nickname' }),
        ]),
        phone: schema.string({}, [
          rules.regex(/^\d{10}$/),
          rules.unique({ table: 'users', column: 'phone' }),
        ]),
        name: schema.string({}, [
          rules.maxLength(180),
          rules.regex(/^[a-zA-Z\s]+$/),
        ]),
        lastname: schema.string({}, [
          rules.maxLength(180),
          rules.regex(/^[a-zA-Z\s]+$/),
        ]),
        age: schema.number([rules.range(1, 150),]),
        birthdate: schema.date(),
      })

      const validatedData = await request.validate({
        schema: validationSchema,
      })
      const birthdate = validatedData.birthdate.toJSDate()

      const role = await Role.findByOrFail('slug', 'support')
      const user = await User.create({ 
        email: validatedData.email,
        password: validatedData.password,
        nickname: validatedData.nickname,
        phone: validatedData.phone,
        name: validatedData.name,
        lastname: validatedData.lastname,
        age: validatedData.age,
        birthdate: birthdate,
        roleId: role.id,
        active: true
      })

      return response.status(201).json({
        type: 'Created',
        title: 'User created successfully',
        message: 'User account was created successfully',
        data: {user}
      })
    } catch (error) {
      return response.status(400).json({
        type: 'Error',
        title: 'Error at creating user',
        message: 'Error at creating user, check your input data.'
      })
    }
  }

  // * POST
  public async login({request, auth, response}: HttpContextContract) {
    const {uid, password} = request.only(['uid', 'password'])

    try {
      const token = await auth.use('api').attempt(uid, password)
      return response.json({token})
    }
    catch {
      return response.badRequest('Invalid credentials')
    }
  }

  // * POST
  public async logout({ auth, response }: HttpContextContract) {
    try {
      await auth.use('api').revoke()
      return response.ok({ message: 'Logout successful' })
    } catch (error) {
      return response.badRequest({ message: 'Logout failed' })
    }
  }
}
