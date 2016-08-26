# Simple Dashboard

## Running - Getting Started

In terminal run the following:
```sh
# install dependencies
$ npm install

# to build the app once
$ npm run build

# to run server
$ npm start
```
In Browser, navigate to http://localhost:3000/

## Use
Populate outbox.json with:
```sh
{
  "merits": ["Master Sneaker", "Man of Mystery", "Whitest Hair"],
  "outbox": [{
    "first": "Bilbo",
    "last": "Baggins",
    "email": "bilbo.baggins@shire.com",
    "merit": "Master Sneaker"
  },
  {
    "first": "Gandalf",
    "last": "the Gray",
    "email": "gDaddy@wizards.com",
    "merit": "Man of Mystery"
  },
    {
    "first": "Legoal",
    "last": "None?",
    "email": "elfie@elves.com",
    "merit": "Whitest Hair"
  }
  ]
}
```
Either copy and paste or in server > outbox.json OR using Postman / similar program, POST to http://localhost:3000/outbox

