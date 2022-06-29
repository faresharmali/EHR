const { Gateway, Wallets } = require("fabric-network");
const fs = require("fs");
const path = require("path");

exports.getallAssets = async (userID) => {
  try {
    console.log(userID);
    // load the network configuration
    const ccpPath = path.resolve(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "..",
      "test-network",
      "organizations",
      "peerOrganizations",
      "org1.example.com",
      "connection-org1.json"
    );
    let ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));

    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), "..", "wallet");
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    // Check to see if we've already enrolled the user.
    const identity = await wallet.get(userID);
    if (!identity) {
      console.log(
        "An identity for the user " + userID + " does not exist in the wallet"
      );
      console.log("Run the registerUser.js application before retrying");
      return;
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: userID,
      discovery: {
        enabled: true,
        asLocalhost: true,
      },
    });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork("mychannel");

    // Get the contract from the network.
    const contract = network.getContract("fabcar");

    //    const result = await contract.evaluateTransaction("queryAllAssets");
    const result = await contract.evaluateTransaction("queryPrivateAssets");

    // Disconnect from the gateway.
    await gateway.disconnect();
    return JSON.parse(result);
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    throw error;
    process.exit(1);
  }
};
