# Overview
This simple application is built with ExpressJS, Prisma and MySQL on the backend, and uses Handlebars for the view layer. The application is a proof of concept that represents the commenting part of a blogging application, and features the ability to post new comments and upvote existing comments.

# Pre-requisites
The rest of this guide assumes you already have MySQL installed and running somewhere accessible to your development machine, with a database named "boo" created.

# Getting Started
## Clone the repo
`git clone https://github.com/cmraible/boo.git`
## cd into project directory
`cd boo`
## Install dependencies
`npm install`
## Add Database URL to .env file
Add your MySQL connection URL to a .env file in the project root. If running MySQL locally, it may look something like this:
`DATABASE_URL="mysql://root@localhost:3306/boo"`
## Reset, migrate and seed database
`npm run migrate:reset`
## Run backend smoke tests
`npm test`
## Run development server
`npm run start`
## Open Cypress for interactive End to End Testing
Note: to run Cypress tests, you need two terminal windows: one to run the app, and one to run Cypress
`npm run start`
In another terminal window/tab:
`npm run cypress:open`