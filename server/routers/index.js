const search = require('./search')
const auth = require('./auth')
const data = require('./data')
const sub = require('./sub')
const Property = require('./property')
const user = require('./user')
const initRoutes = (app) =>{
    app.use('/api/auth' ,auth)
    app.use('/' ,search)
    app.use('/api',data)
    app.use('/',sub)
    app.use('/',Property)
    app.use('/',user)
}

module.exports = initRoutes