const Web3 = require("web3");
import { AsyncStorage } from "react-native";
const web3 = new Web3(
    new Web3.providers.HttpProvider(
        "https://kovan.infura.io/ZWXhYfP2uIvdg1yKuQNY "
    )
);
const Erc20Abi = [
    {
        constant: true,
        inputs: [],
        name: "name",
        outputs: [{ name: "", type: "bytes32" }],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: false,
        inputs: [],
        name: "stop",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: false,
        inputs: [
            { name: "guy", type: "address" },
            { name: "wad", type: "uint256" }
        ],
        name: "approve",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: false,
        inputs: [{ name: "owner_", type: "address" }],
        name: "setOwner",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: true,
        inputs: [],
        name: "totalSupply",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: false,
        inputs: [
            { name: "src", type: "address" },
            { name: "dst", type: "address" },
            { name: "wad", type: "uint256" }
        ],
        name: "transferFrom",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: true,
        inputs: [],
        name: "decimals",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: false,
        inputs: [
            { name: "guy", type: "address" },
            { name: "wad", type: "uint256" }
        ],
        name: "mint",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: false,
        inputs: [{ name: "wad", type: "uint256" }],
        name: "burn",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: false,
        inputs: [{ name: "name_", type: "bytes32" }],
        name: "setName",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: true,
        inputs: [{ name: "src", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: true,
        inputs: [],
        name: "stopped",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: false,
        inputs: [{ name: "authority_", type: "address" }],
        name: "setAuthority",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: true,
        inputs: [],
        name: "owner",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: true,
        inputs: [],
        name: "symbol",
        outputs: [{ name: "", type: "bytes32" }],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: false,
        inputs: [
            { name: "guy", type: "address" },
            { name: "wad", type: "uint256" }
        ],
        name: "burn",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: false,
        inputs: [{ name: "wad", type: "uint256" }],
        name: "mint",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: false,
        inputs: [
            { name: "dst", type: "address" },
            { name: "wad", type: "uint256" }
        ],
        name: "transfer",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: false,
        inputs: [
            { name: "dst", type: "address" },
            { name: "wad", type: "uint256" }
        ],
        name: "push",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: false,
        inputs: [
            { name: "src", type: "address" },
            { name: "dst", type: "address" },
            { name: "wad", type: "uint256" }
        ],
        name: "move",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: false,
        inputs: [],
        name: "start",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: true,
        inputs: [],
        name: "authority",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: false,
        inputs: [{ name: "guy", type: "address" }],
        name: "approve",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: true,
        inputs: [
            { name: "src", type: "address" },
            { name: "guy", type: "address" }
        ],
        name: "allowance",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: false,
        inputs: [
            { name: "src", type: "address" },
            { name: "wad", type: "uint256" }
        ],
        name: "pull",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [{ name: "symbol_", type: "bytes32" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor"
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: "guy", type: "address" },
            { indexed: false, name: "wad", type: "uint256" }
        ],
        name: "Mint",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: "guy", type: "address" },
            { indexed: false, name: "wad", type: "uint256" }
        ],
        name: "Burn",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [{ indexed: true, name: "authority", type: "address" }],
        name: "LogSetAuthority",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [{ indexed: true, name: "owner", type: "address" }],
        name: "LogSetOwner",
        type: "event"
    },
    {
        anonymous: true,
        inputs: [
            { indexed: true, name: "sig", type: "bytes4" },
            { indexed: true, name: "guy", type: "address" },
            { indexed: true, name: "foo", type: "bytes32" },
            { indexed: true, name: "bar", type: "bytes32" },
            { indexed: false, name: "wad", type: "uint256" },
            { indexed: false, name: "fax", type: "bytes" }
        ],
        name: "LogNote",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: "src", type: "address" },
            { indexed: true, name: "guy", type: "address" },
            { indexed: false, name: "wad", type: "uint256" }
        ],
        name: "Approval",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: "src", type: "address" },
            { indexed: true, name: "dst", type: "address" },
            { indexed: false, name: "wad", type: "uint256" }
        ],
        name: "Transfer",
        type: "event"
    }
];
const TokenAddress = "0xC4375B7De8af5a38a93548eb8453a498222C4fF2";
const TokenContract = new web3.eth.Contract(Erc20Abi, TokenAddress);
const contractAbi = [{"constant":true,"inputs":[],"name":"getInitialPay","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newPay","type":"uint256"}],"name":"setInitialPay","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_username","type":"string"}],"name":"storageUsernameValidity","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getSecurity","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newReward","type":"uint256"}],"name":"setReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_username","type":"string"}],"name":"addPrivateKeyHolder","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newAllowance","type":"uint256"}],"name":"setAllowance","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_holder","type":"string"},{"name":"_sender1","type":"string"},{"name":"_sender2","type":"string"}],"name":"privateKeyRetreived","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getReward","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_username","type":"string"}],"name":"addNewStorageAccount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getNumberOfKeyStores","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newSecurity","type":"uint256"}],"name":"setSecurity","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAllowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_username","type":"string"},{"name":"_storageAddress","type":"address"}],"name":"addStorageAccountByAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getNumberOfKeyHolders","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_username","type":"string"}],"name":"privateKeyUsernameValidity","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
const contractAddress = "0xE65eC838360168057b780D85FFD4C2CD8B33B158";
const contract = new web3.eth.Contract(contractAbi, contractAddress);
console.log(TokenContract);


/*
    Function to get the Dai Balance of a certain address
    @Param { string } address
    @Returns { number } value wrapped in a promise
 */
function getDaiBalance(address) {
    return new Promise(function(resolve, reject) {
        TokenContract.methods
            .balanceOf(address)
            .call()
            .then(function(result) {
                resolve(result / 1000000000000000000);
            })
            .catch(function(err) {
                reject(err);
            });
    });
}


/*
    Function to check whether a certain private key is valid or not
    @Param { string } privateKey
    @Returns { boolean } wrapped in promise
 */
async function KeyIsValid(privateKey) {
    let returnState = false;
    try {
        const account = await web3.eth.accounts.privateKeyToAccount(privateKey);
        returnState = true;
    } catch (e) {
        returnState = false;
    } finally {
        return returnState;
    }
}


/*
    Function to store the private key in the mobile's storage
    @Param { string } privateKey
    @Param { function } callback which is called with the dai balance
 */
function fillBalance(privateKey, callback) {
    let account;
    // let $output = document.getElementById("output");
    if (privateKey) {
        account = web3.eth.accounts.privateKeyToAccount(privateKey);
        console.log("fillbalance private key", privateKey);
        AsyncStorage.setItem("privateKey", privateKey);
    } else {
        account = web3.eth.accounts.create();
        privateKey = account.privateKey;
        AsyncStorage.setItem("privateKey", privateKey);
    }

    let address = account.address;
    getDaiBalance(address).then(function(balance) {
        // $output.innerHTML += "\nYour Dai Balance = " + balance;
        callback(balance);
    });
}


/*
    Function to create a new ethereum account
    @Returns { object } {privateKey , address}
 */
let CreateNewAccount = () => {
    let account = web3.eth.accounts.create();
    let privateKey = account.privateKey;
    let address = account.address;
    return { privateKey, address };
};


/*
    Function to get the ethereum address from privateKey
    @Param { string } privateKey
    @Returns { string } address
 */
let getAccountAdress = privateKey => {
    return web3.eth.accounts.privateKeyToAccount(privateKey);
};


/*
    Function not used now
 */
function registerToContract(username, privateKey, eventsObject) {
    return new Promise(function(resolve, reject) {
        let address = web3.eth.accounts.privateKeyToAccount(privateKey);
        addStorageAccountTransaction(
            username,
            privateKey,
            address,
            eventsObject
        ).then(function() {
            resolve();
        });
    });
}



/*
    Function to check whether a certain username for the storage account is available on the contract
    @Param { string } username
    @Returns { boolean } true if available and vice versa wrapped in promise
 */
function checkUsernameAvailabiliy(username) {
    return new Promise(function(resolve, reject) {
        contract.methods
            .storageUsernameValidity(username)
            .call()
            .then(function(boolean) {
                if (boolean) {
                    reject(!boolean);
                } else {
                    resolve(!boolean);
                }
            });
    });
}


/*
    Function to make a transaction to the SplitMeUp smart contract
    to add the storage account to the contract
    @Param { string } username
    @Param { string } privateKey
    @Param { string } address
    @Param { object } callingFunctions : events object

 */
function addStorageAccountTransaction(
    username,
    privateKey,
    address,
    callingFunctions
) {
    return new Promise(function(resolve, reject) {
        console.log("Adding Android user to contract");
        contract.methods
            .addNewStorageAccount(username)
            .estimateGas({ from: address })
            .then(function(gasPrice) {
                let transaction = {
                    from: web3.utils.toChecksumAddress(address),
                    to: web3.utils.toChecksumAddress(contractAddress),
                    gas: gasPrice + 1000,
                    data: contract.methods.addNewStorageAccount(username).encodeABI()
                };

                callingFunctions.authoriseTransaction(transaction, function() {
                    let signPromise = web3.eth.accounts.signTransaction(
                        transaction,
                        privateKey
                    );
                    console.log(signPromise);
                    signPromise
                        .then(signedTx => {
                            console.log(signedTx);
                            const sentTx = web3.eth.sendSignedTransaction(
                                signedTx.raw || signedTx.rawTransaction
                            );
                            sentTx.on("receipt", receipt => {
                                console.log(receipt);
                                // co("Transaction Mined");
                                resolve(true);
                            });
                            sentTx.on("transactionHash", function(hash) {
                                // alert("Transaction Mining");
                                callingFunctions.mining(hash);
                                console.log("hash =", hash);
                            });
                            sentTx.on("error", err => {
                                reject(err);
                            });
                        })
                        .catch(err => {
                            reject(err);
                        });
                });
            });
    });
}


/*
    Function to create a transaction to Dai Contract to send dai to some account
    @Param { string } privateKey : private key of the sender
    @Param { string } receiverAddress : ethereum address of the receiver
    @Param { string } amount : amount to dai that are to be sent
    @Param { object } eventsObj : explained below

    eventsObj : Events in the Events Object
    1. authoriseTransaction : Arguments
                                    1. transaction : Example - {
                                                from: senderAddress,
                                                to: receiverAddress,
                                                gas: gasAmount,
                                                data: signedData
                                            }
                                    2. additionalInfo : Example - {
                                                gasInEther : gas converted into eth to be shown to user,
                                                ERC20Token : 'DaiStableCoin',
                                                ERC20Amount : amount
                                            }
                                    3. callback function : Further code runs when this function is called

    2. transactionMined : No Arguments just to tell user that transaction is mined

    3. transactionMining : Arguments - hash (of the transaction to create Etherscan Link)
 */
function sendDaiTransaction(myPrivateKey, receiverAddress, amount, eventsObj) {
    let wadAmount = web3.utils.toWei(amount.toString(), 'ether');
    let myAddress = web3.eth.accounts.privateKeyToAccount(myPrivateKey).address;
    return new Promise(function(resolve, reject) {
        console.log("Sending Dai Transaction");
        TokenContract.methods
            .transfer(receiverAddress, wadAmount)
            .estimateGas({ from: myAddress })
            .then(function (gasAmount) {
                web3.eth.getGasPrice()
                    .then(function (gasPrice) {
                        let gasValue = gasPrice * gasAmount;
                        let gasInEther = web3.utils.fromWei(gasValue);
                        let transaction = {
                            from: web3.utils.toChecksumAddress(myAddress),
                            to: web3.utils.toChecksumAddress(TokenAddress),
                            gas: gasAmount + 1000,
                            data: contract.methods.addNewStorageAccount(username).encodeABI()
                        };
                        let additionalInfo = {
                            gasInEther,
                            ERC20Token : 'DaiStableCoin',
                            ERC20Amount : amount
                        };
                        eventsObj.authoriseTransaction(transaction, additionalInfo, function () {
                           let signPromise = web3.eth.accounts.signTransaction(
                               transaction,
                               myPrivateKey
                           );
                           signPromise.then(signedTx => {
                               console.log(signedTx);
                               const sentTx = web3.eth.sendSignedTransaction(
                                   signedTx.raw || signedTx.rawTransaction
                               );
                               sentTx.on("receipt", receipt => {
                                   console.log(receipt);
                                   eventsObj.transactionMined();
                                   resolve(true);
                               });
                               sentTx.on("transactionHash", function(hash) {
                                   // alert("Transaction Mining");
                                   eventsObj.transactionMining(hash);
                                   console.log("hash =", hash);
                               });
                               sentTx.on("error", err => {
                                   reject(err);
                               });
                           })
                        });
                    });
            });
    });
}

// Copy Till Here

export {
    getDaiBalance,
    fillBalance,
    KeyIsValid,
    CreateNewAccount,
    getAccountAdress,
    checkUsernameAvailabiliy,
    sendDaiTransaction
};
