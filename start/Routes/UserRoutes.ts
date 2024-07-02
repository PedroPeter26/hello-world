import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('/', 'UsersController.index').middleware('auth:api')
    Route.get('/:id', 'UsersController.show').middleware('admin')
    Route.post('/addresses', 'UsersController.addAddress')
}).prefix('/api/users').middleware('auth:api')
