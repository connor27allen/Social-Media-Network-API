// Export an object and create an api_routes property on it
// Set the value to the exported router from ./api_routes.js
module.exports = {
    user_routes: require('./user_routes')
}