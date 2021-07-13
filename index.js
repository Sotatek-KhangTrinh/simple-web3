const abi = require("./poolAbi.json");
var Web3 = require("web3");

// "Web3.providers.givenProvider" will be set if in an Ethereum supported browser.
const divide = (start, end, step) => {
    const arr = [];
    if (end - start < step) return [{ start, end }];
    for (let i = start + step; i <= end; i += step + 1) {
      arr.push({ start: i - step, end: i });
      if (i + step + 1 > end && i < end) {
        arr.push({ start: i + 1, end: end });
      }
    }
    return arr;
  };
  
(async () => {
  try {
    var web3 = new Web3(
      "https://mainnet.infura.io/v3/710b741fe9924cc8a5fa4fa20a89e620"
    );
    const startBlock = 12534247;
    const lastestBlock = 12817416;
    // 1 Pool vi du
    const contract = new web3.eth.Contract(
      abi,
      "0x7858e59e0c01ea06df3af3d20ac7b0003275d4bf"
    );
    const rangeBlock = divide(startBlock, lastestBlock, 10000);
    const listTrans = [].concat.apply(
      [],
      await Promise.all(
        rangeBlock.map((block) => {
          return contract.getPastEvents("Swap", {
            fromBlock: block.start,
            toBlock: block.end,
          });
        })
      )
    );
    listTrans.forEach((element) => {
      console.log(element.returnValues);
    });

    // pool khasc thi tao them 1 contract, khac moi dia chi
  } catch (e) {
    console.log(e);
  }
})();

