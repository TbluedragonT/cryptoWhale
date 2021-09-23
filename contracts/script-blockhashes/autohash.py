# $Env:WEB3_INFURA_PROJECT_ID="fa8b97680fdd4614b172c724586e8f5b"

import time
import json
from brownie import Contract, network, web3, accounts
from brownie.network.gas.strategies import LinearScalingStrategy

# network
is_mainnet = True

# load account
accounts.load("main")
acc = accounts[0]

# read contract ABI
abi = {}
with open("abi.json") as file:
	abi = json.load(file)

# contract address
address = "0xa8934086a260F8Ece9166296967D18Bd9C8474A5"

# connect to network
if is_mainnet:
	network.connect("mainnet");	
	print("Connected to MAINNET")
else:
	network.connect("rinkeby")
	print("Connected to RINKEBY")

# build contract object
c = Contract.from_abi("WhelpsNFT", address, abi=abi)

# setup gas strategy
# begin with 10 gwei, multiply by 1.1 after each 30 seconds until it goes through
# max gas spent: 180 gwei
gas_strategy_mainnet = LinearScalingStrategy("20 gwei", "200 gwei", 1.1, 30)
gas_strategy_rinkeby = LinearScalingStrategy("1 gwei", "200 gwei", 1.01, 30)
gas_strategy = gas_strategy_mainnet if is_mainnet else gas_strategy_rinkeby

# setup sleep time
sleep_time_mainnet = 15*60 	# 40 minutes
sleep_time_rinkeby = 30 	# 30 seconds
sleep_time = sleep_time_mainnet if is_mainnet else sleep_time_rinkeby

# collect minimum block interval
min_block_interval = c.BLOCKHASH_MINIMUM_BLOCK_INTERVAL()

while True:
	# collect last block recorded in contract
	lastBlock = c.lastBlock()

	# collect current block
	height = web3.eth.blockNumber

	# make sure enough blocks passed
	while (height < lastBlock+min_block_interval):
		print("It's not time yet, waiting...")
		time.sleep(10)
		lastBlock = c.lastBlock()
		height = web3.eth.blockNumber		

	print("Currently at:", height, "- last block:", lastBlock, "- preparing call...")

	try:
		# record blockhash
		c.externalRecordBlockhash({'from': acc, 'gas_price': gas_strategy})
	except:
		# ignore
		print("pass")
		pass

	# collect last block again
	lastBlock = c.lastBlock()
	print("New last block:", lastBlock)	

	# sleep
	time.sleep(sleep_time)
