const fs = require('fs');

const INFURA_URL = fs.readFileSync('.secret-infura', 'utf8'); //"https://rinkeby.infura.io/v3/your-key"
const CONTRACT_ADDRESS = fs.readFileSync('.secret-contract-addr', 'utf8'); //contrac address after deployment to Rinkeby network
const PRIVATE_KEY = fs.readFileSync('.secret-private-key', 'utf8'); //private key from Metamask
const ACCOUNT = fs.readFileSync('.secret-account', 'utf8'); //Metamask account 

// Import the fastify framework
const fastify = require('fastify')
const Web3 = require ('web3')
const app = fastify()// Set a GET route "/"

const Tx = require('ethereumjs-tx');

app.get('/', async (request, reply) => {
    reply.send("Our first route")
})


app.get('/tasks', async (request, reply) => {

    var contract = getContract();

   
    const taskCount = await contract.methods.taskCount().call()
    var theTasks = []
    for (var i = 1; i <= taskCount; i++) {
        const task = await contract.methods.tasks(i).call()
        const taskId = task.id
        const taskContent = task.content

    var tskJ = {
        "id": taskId,
        "content": taskContent
    }

        theTasks.push(tskJ)
    }

    reply.send(theTasks)
})


app.post("/task", async (request, reply) => {
    const content = request.body
    var contract = getContract()

    const privateKey1 = Buffer.from(PRIVATE_KEY, 'hex');
    const web3 = createWeb3();

    const myData = contract.methods.createTask(content).encodeABI()

        const txCount = await web3.eth.getTransactionCount(ACCOUNT)
        const nonce = web3.utils.toHex(txCount)
        // Build the transaction
          const txObject = {
            nonce:    nonce,
            to:       CONTRACT_ADDRESS,
            value:    web3.utils.toHex(web3.utils.toWei('0', 'ether')),
            gasLimit: web3.utils.toHex(2100000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('6', 'gwei')),
            data: myData  
          }
            // Sign the transaction
            const tx = new Tx(txObject);
            tx.sign(privateKey1);
        
            const serializedTx = tx.serialize();
            const raw = '0x' + serializedTx.toString('hex');
        
            // Broadcast the transaction
            const transaction = web3.eth.sendSignedTransaction(raw, (err, tx) => {
                if (err) {
                    var r = {
                        nonce: nonce,
                        error: err.message
                    }
                    reply.send(r)
                }
                reply.send(tx)
            });
})

app.post("/test", (request, reply) => {
    var user = request.body
    User.create(user, (err, user) => {
        if (!err) {
            reply.send(user)
        } else {
            reply.send({ error: err })
        }
    })
})

// Start the server
app.listen(3000, function (err, address) {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening on ${address}`)
})

function getContract() {
    const web3 = createWeb3();

    const contractJson = fs.readFileSync('../build/contracts/TodoList.json', 'utf8');
    const abi = JSON.parse(contractJson);

    var c = new web3.eth.Contract(abi.abi, CONTRACT_ADDRESS);
    var contract = c.clone();
    return contract;
}

function createWeb3() {
    return new Web3(new Web3.providers.HttpProvider(INFURA_URL))
}

