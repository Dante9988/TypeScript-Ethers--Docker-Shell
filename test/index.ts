import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

describe("GetterSetter positive scenarios", function () {

  let contract: Contract;

  before(async () => {
    const GetterSetter = await ethers.getContractFactory("GetterSetter");
    contract = await GetterSetter.deploy();
    await contract.deployed();
  });


  it("Should set bytes32 value and emit the event on chain", async function () {

    // ethers provides a function to convert string to bytes, we will use that function for this example
    const bytesValue = ethers.utils.formatBytes32String("Hello, Chainlink!");

    const setBytes32 = await contract.setBytes32(bytesValue);

    // wait until the transaction is mined
    const txnReceipt = await setBytes32.wait();
    console.log("Txn hash for setBytes32:", txnReceipt.transactionHash);
  });


  it("Should set requestedBytes32 value and emit the event on chain", async function () {

    const bytesValue = ethers.utils.formatBytes32String("Pumping Link");
    const numberToSet = ethers.BigNumber.from(1).toHexString();
    const paddedNumberToSet = ethers.utils.hexZeroPad(numberToSet, 32);

    const requestedBytes32 = await contract.requestedBytes32(paddedNumberToSet, bytesValue);

    // wait until the transaction is mined
    const txnReceipt = await requestedBytes32.wait();
    console.log("Txn hash for requestedBytes32:", txnReceipt.transactionHash);
  });


  it("Should set setBytes value and emit the event on chain", async function () {

    const bytesValue = ethers.utils.formatBytes32String("PUMP IS ON THE WAY!");

    const setBytes = await contract.setBytes(bytesValue);

    // wait until the transaction is mined
    const txnReceipt = await setBytes.wait();
    console.log("Txn hash for setBytes:", txnReceipt.transactionHash);
    
  });


  it("Should set requestedBytes value and emit the event on chain", async function () {

    const bytesValue = ethers.utils.formatBytes32String("LINK to $1000");
    const numberToSet = ethers.BigNumber.from(2).toHexString();
    const paddedNumberToSet = ethers.utils.hexZeroPad(numberToSet, 32);

    const requestedBytes = await contract.requestedBytes(paddedNumberToSet, bytesValue);

    // wait until the transaction is mined
    const txnReceipt = await requestedBytes.wait();
    console.log("Txn hash for requestedBytes:", txnReceipt.transactionHash);
    
  });


  it("Should set setUint256 value and emit the event on chain", async function () {

    const numberToSet = ethers.BigNumber.from(10).toHexString();

    const setUint256 = await contract.setUint256(numberToSet);

    // wait until the transaction is mined
    const txnReceipt = await setUint256.wait();
    console.log("Txn hash for setUint256:", txnReceipt.transactionHash);
    
  });


  it("Should set requestedUint256 value and emit the event on chain", async function () {

    const numberToSetId = ethers.BigNumber.from(3).toHexString();
    const numberToSet = ethers.BigNumber.from(2).toHexString();
    const paddedNumberToSet = ethers.utils.hexZeroPad(numberToSetId, 32);

    const setUint256 = await contract.requestedUint256(paddedNumberToSet, numberToSet);

    // wait until the transaction is mined
    const txnReceipt = await setUint256.wait();
    console.log("Txn hash for requestedUint256:", txnReceipt.transactionHash);
    
  });

});