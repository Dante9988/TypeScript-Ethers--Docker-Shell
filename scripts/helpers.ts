import { ethers } from "hardhat";

export const setBytes32 = async () => {

    if (process.argv.length < 4) {
        console.error("Usage: npx hardhat run scripts/helpers.ts [CONTRACT_ADDRESS] [VALUE_TO_SET]");
        process.exit(1);
      }
    
      const contractAddress = process.argv[2];
      const valueToSet = process.argv[3];
    
      const valueBytes32 = ethers.utils.formatBytes32String(valueToSet);
    
      const GetterSetter = await ethers.getContractFactory("GetterSetter");
      const contract = GetterSetter.attach(contractAddress);
    
      const tx = await contract.setBytes32(valueBytes32);
      const txnReceipt = await tx.wait();
    
      console.log(`setBytes32 called with value: ${valueToSet}`);
      console.log(`Txn hash: ${txnReceipt.transactionHash}`);
}