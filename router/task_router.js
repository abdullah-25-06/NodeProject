const {Router} = require('express')

const task_router = Router()

task_router.route('/').get().post()
task_router.route('/:id').get().patch().delete()


module.exports= task_router