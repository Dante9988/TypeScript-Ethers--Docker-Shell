# Solidity Contract Deployment & Interaction
This project streamlines the process of deploying Solidity smart contracts and interacting with them. It's configured for both local development and the Sepolia testnet, utilizing Hardhat for tasks such as compiling, testing, and deploying contracts.

### Prerequisites
Node.js (12.x or higher)
npm
jq
### Setup
### Installation
Clone the repository and install dependencies:
```sh
git clone <repository-url>
cd <repository-directory>
```

### Intall yarn if not installed yet:
```sh
npm i -g yarn
```
### Install dependencies:
```sh
yarn install
```
### Environment Configuration
Create a .env file in the project root with your Ethereum private key and Infura project ID:
```sh
INFURA_PROJECT_ID=yourInfuraProjectID
PRIVATE_KEY=yourPrivateKey
VALUE=someValue
```
# Usage
## Running Tests
Execute contract tests with:
```sh
yarn test
```

## Deploying Contracts
### Deploy to the local Hardhat network:
```sh
yarn deploy
```

### Deploy to the Sepolia testnet:
```sh
yarn deploy:sepolia
```

## Bash Script Deployment
### For a comprehensive deployment and interaction process on Sepolia:
```sh
chmod +x deploy_and_interact.sh
./deploy_and_interact.sh
```

## Additional Information

### Project Structure
* contracts/: Solidity contracts.
* scripts/: Deployment and interaction scripts.
* test/: Contract tests.
### Notes
* Ensure jq is installed for JSON processing in bash scripts.
* Update .env for Sepolia deployments with sufficient ETH for transactions.
* The bash script automates deployment and basic contract interactions, appending results to output.json.

# Docker Setup
The project includes a Docker setup for running the deployment and interaction processes in an isolated environment. This approach ensures compatibility and simplifies the management of dependencies.

## Prerequisites for Docker
* Docker installed on your machine.
* Docker Compose for orchestrating multi-container Docker applications.

## Build with Docker
```
docker build -t gettersetter .
```

## Run docker image
```
docker run --name my-gettersetter-container gettersetter
```

## Running with Docker Compose
```
docker compose-up --build
```