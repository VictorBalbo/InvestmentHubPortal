# InvestmentHubProtal

This is a personal project to create a front end for the API on [this repository](https://github.com/VictorBalbo/InvestmentHubServer) using React + Vite.

The idea is to have a page to connect to banks and investment brokers, and unify all the data in a single view.

For now the system is integrated to [Nubank](https://app.nubank.com.br/) and [Rico](https://www.rico.com.vc/login/).

## Installation

1. Install the NPM packages

```bash
yarn install
```

2. Run the project

```bash
npm start
```

## Usage
Right now is not possibile to create and account or connect to a bank provider through the interface, so its needed to send the commands directly to the server.
Once create, the project should connect to the specified account and show the summary with the fetched assets.

## Roadmap
The nexts steps are:
* Create a registriation page.
* Add posibility to connect to a bank provider though interface.
* Add more insights for the assets registered.
