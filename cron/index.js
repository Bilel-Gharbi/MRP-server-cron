const {
  apiUsersUrl,
  apiUserUpdateUrl,
  apiUpdateConstants,
} = require("../config/constants");
const axios = require("axios");

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
const getUsersAddress = async () => {
  const { data: usersList } = await axios.get(apiUsersUrl);
  const arr = await usersList.map(async (user) => {
    let { address } = user.owner;
    let { totalStakedAmount } = user;
    return { address, totalStakedAmount };
  });
  // console.log(arr);
  return arr;
};

const runner = async () => {
  console.log("script start");
  let promises = await getUsersAddress();
  let addressArray = await Promise.all(promises);

  console.log(addressArray);

  for (let i = 0; i < addressArray.length; i++) {
    let address = addressArray[i].address;
    let totalUserStakedAmount = addressArray[i].totalStakedAmount;

    const { data } = await axios.get(
      `https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=${process.env.CONTRACT_ADDRESS}&address=${address}&tag=latest&apikey=${process.env.ETH_SCAN_TOKEN}`
    );
    await sleep(2000);

    const totalWalletToken = data.result / 10 ** 9;

    // console.log(totalWalletToken);
    // console.log(totalWalletToken.toFixed());
    // console.log(totalUserStakedAmount);
    // console.log(totalUserStakedAmount.toFixed());

    if (totalWalletToken < totalUserStakedAmount.toFixed()) {
      console.log("condition");
      await Promise.all([
        axios.patch(apiUserUpdateUrl, {
          address,
          eligibility: false,
          active: false,
        }),
        axios.patch(apiUpdateConstants, {
          amount: totalUserStakedAmount,
        }),
      ]);
    }
  }
};

module.exports = {
  runner,
};
