# Deploy the contract, set a value, and retrieve it

echo "Deploying contract and possibly interacting..."
export INTERACT="true"
export VALUE_TO_SET="Hello-chainlink"
DEPLOY_OUTPUT=$(npx hardhat run scripts/deploy.ts --network sepolia)

DEPLOYER_ADDRESS=$(echo "$DEPLOY_OUTPUT" | grep -o 'Deploying contracts with the account: 0x[a-fA-F0-9]\{40\}' | grep -o '0x[a-fA-F0-9]\{40\}')
CONTRACT_ADDRESS=$(echo "$DEPLOY_OUTPUT" | grep -o 'GetterSetter deployed to: 0x[a-fA-F0-9]\{40\}' | grep -o '0x[a-fA-F0-9]\{40\}')
echo "Deployer Address: $DEPLOYER_ADDRESS"
echo "Contract Address: $CONTRACT_ADDRESS"

# Optionally, capture interaction output if INTERACT was "true"
if [ "$INTERACT" = "true" ]; then
    RETRIEVED_VALUE=$(echo "$DEPLOY_OUTPUT" | grep -o 'Retrieved value: .*' | cut -d ' ' -f 3-)
    echo "Retrieved Value: $RETRIEVED_VALUE"
fi

install_jq() {
    if ! command -v jq >/dev/null 2>&1; then
    echo "jq not found. Installing jq..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # Install jq using Homebrew on macOS
        brew install jq
    else
        echo "Please install jq manually."
    fi
fi

}

# Install jq if not already installed
install_jq

FILENAME="output.json"

# Check if the file exists. If not, create an empty JSON array.
if [ ! -f "$FILENAME" ]; then
  echo "[]" > "$FILENAME"
fi

# Create a new JSON object with the latest details
NEW_DATA=$(jq -n \
  --arg da "$DEPLOYER_ADDRESS" \
  --arg ca "$CONTRACT_ADDRESS" \
  --arg vs "$VALUE_TO_SET" \
  --arg rv "$RETRIEVED_VALUE" \
  '{deployerAddress: $da, contractAddress: $ca, valueSet: $vs, retrievedValue: $rv}')

# Read the current file content, add the new data, and write back to the file
jq ". += [$NEW_DATA]" "$FILENAME" > temp.json && mv temp.json "$FILENAME"

echo "Updated details added to $FILENAME"