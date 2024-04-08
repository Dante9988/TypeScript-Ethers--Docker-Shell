import { ethers } from "hardhat";

async function main() {
  console.log("Deploying contracts with the account:", (await ethers.getSigners())[0].address);

  // We get the contract to deploy
  const GetterSetter = await ethers.getContractFactory("GetterSetter");
  const getterSetter = await GetterSetter.deploy();

  const contract = await getterSetter.deployed();

  console.log("GetterSetter deployed to:", contract.address);

  const shouldInteract = process.env.INTERACT === "true";
  if (shouldInteract) {
    const valueToSet = process.env.VALUE_TO_SET || "env var from bash didnt work!"; 
    const valueBytes32 = ethers.utils.formatBytes32String(valueToSet);
    const tx = await getterSetter.setBytes32(valueBytes32);
    await tx.wait();
    console.log(`Value set: ${valueToSet}`);
    
    // Fetching the value after setting, as an example
    const retrievedValue = await getterSetter.getBytes32();
    console.log(`Retrieved value: ${ethers.utils.parseBytes32String(retrievedValue)}`);
  }

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
