import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Address from 'App/Models/Address'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class UsersController {
  public async index({response}: HttpContextContract) {
    const users = await User.query().preload('addresses')
    return response.json(users)
  }
  public async show({ params, response }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    await user.load('addresses')
    return response.json(user)
  }

  public async addAddress({ request, auth, response }: HttpContextContract) {
    const addressSchema = schema.create({
      street: schema.string({}, [rules.maxLength(255)]),
      suburb: schema.string({}, [rules.maxLength(255)]),
      city: schema.string({}, [rules.maxLength(255)]),
      state: schema.string({}, [rules.maxLength(255)]),
      country: schema.string({}, [rules.maxLength(255)]),
      zip_code: schema.number(),
      latitude: schema.number.optional(),
      longitude: schema.number.optional()
    })

    const validatedData = await request.validate({ schema: addressSchema })

    const user = auth.user!

    const address = new Address()
    address.street = validatedData.street
    address.suburb = validatedData.suburb
    address.city = validatedData.city
    address.state = validatedData.state
    address.country = validatedData.country
    address.zip_code = validatedData.zip_code
    address.latitude = validatedData.latitude || 0.0
    address.longitude = validatedData.longitude || 0.0
    address.userId = user.id

    await address.save()

    return response.status(201).json({
      message: 'Address added successfully',
      data: address
    })
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}
  
  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
