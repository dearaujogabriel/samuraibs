const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1366,
    viewportHeight: 768,

    setupNodeEvents(on, config) {

      const { Pool } = require('pg')
      const pool = new Pool({
        host: 'drona.db.elephantsql.com',
        user: 'bfqksbxf',
        password: 'c8vxas6YRdebzAVhPUQNVn5OeLvExXRq',
        database: 'bfqksbxf',
        port: 5432
      })

      on('task', {
        removeUser(email) {
          return new Promise(function (resolve) {
            pool.query('DELETE FROM public.users WHERE email = $1', [email], function (error, result) {
              if (error) {
                throw error
              }
              resolve({ success: result })
            })
          })
        }
      })
      
    },
  },
});
