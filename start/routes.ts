/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import './Routes/AuthRoutes'
import './Routes/UserRoutes'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.get('/admin', async ({ response }) => {
    return response.json({ message: "You're Edmund :D" })
  }).middleware('role:admin')

  Route.get('/support', async ({ response }) => {
    return response.json({ message: "You're support dude :p" })
  }).middleware('role:support')
}).middleware('auth:api').prefix('/api/users')
