MOCKFABRICK
========

The project tests the Platfr.io api. 

> **fabrick-platform** The technological platform of banking and fintech services.
Composable, robust and ready-to-use APIs to build your applications and services.
We are working to open the fintech world. https://www.platfr.io/#/home

------------
Requirements:
  - [Nodejs][], [npm][]
------------
# Follow steps below to setup the project:

- Get and install latest LTS Version: 10.13.0 (includes npm 6.4.1) of Nodejs https://nodejs.org/en/download/ or https://nodejs.org/en/download/package-manager/

- Clone this repository in your local machine

- From command line move to the root of the project and install all dependencies 
```bash
npm install
```
Now you're set up.

# How interact with it:
- Read the balance given an accountId:
```bash
npm run balance -- --accountId 12345678
```
- Make an order given an accountId:
```bash
npm run order -- --accountId 12345678
```

Tech Stack
----------

  - [Nodejs][], [npm][]

[Nodejs]: http://nodejs.org
[npm]: http://npmjs.com
