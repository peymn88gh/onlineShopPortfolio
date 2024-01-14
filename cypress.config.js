const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    username: 'Admin',
    password: 'peaRlg4IIkOWvH2ZF0NjIJHrSCrykSgt5u6wsolkFNCwYoJJEPJ1fZryeBaxcpLZ',
    baseUrl: "http://localhost:3000",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
