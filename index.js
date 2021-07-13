const abi = require("./poolAbi.json");
var Web3 = require("web3");

// "Web3.providers.givenProvider" will be set if in an Ethereum supported browser.

(async () => {
  try {
    var web3 = new Web3(
      "https://data-seed-prebsc-1-s3.binance.org:8545"
    );

    // 1 Pool vi du
    const contract = new web3.eth.Contract(
      abi,
      "0xD7de2af41a61387750C19Ac1BFd599d722c2c663"
    );
    const swapHistory = await contract.getPastEvents("Swapped", {
        fromBlock: 'earliest',
        toBlock: 'latest',
    });
    swapHistory.forEach(element => {
        console.log(element.returnValues)
    });

    // pool khasc thi tao them 1 contract, khac moi dia chi
  } catch (e) {
    console.log(e);
  }
})();
