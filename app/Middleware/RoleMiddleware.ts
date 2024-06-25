import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RoleMiddleware {
  public async handle({auth, response}: HttpContextContract, next: () => Promise<void>, roles: String[]) {
    try {
      await auth.check()
    }
    catch {
      return response.unauthorized({ message: 'No tienes permiso para acceder a esta ruta'})
    }

    const user = auth.user

    if(!user) {
      return response.unauthorized({ message: 'No tienes permiso para acceder a esta ruta'})
    }

    await user.load('role')
    const isAdmin = user.role.slug === 'admin'

    if (!roles.includes(user.role.slug)) {
      return response.unauthorized({message: 'No tienes permiso para acceder a esta ruta'})
    }

    if (!isAdmin) {
      return response.unauthorized({ message: 'No tienes permiso para acceder a esta ruta' })
    }
    
    await next()
  }
}
