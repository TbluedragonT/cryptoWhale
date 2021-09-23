# $Env:WEB3_INFURA_PROJECT_ID="fa8b97680fdd4614b172c724586e8f5b"

import time
import json
from brownie import Contract, network, web3
from brownie.network.gas.strategies import LinearScalingStrategy

# network
is_mainnet = True

# read contract ABI
abi = {}
with open("abi-whelps.json") as file:
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
c = Contract.from_abi("Dragons", address, abi=abi)

# get total supply
totalSupply = c.totalSupply()
print("Total supply", totalSupply)

tokenUris = []
# update startIndex if you don't want all tokens
startIndex = 4197
for i in range(startIndex, totalSupply):
	t = c.tokenURI(i)
	print(i, "-", t)
	tokenUris.append(t)

with open('tokenURIs.json', 'w') as handle:
	json.dump(tokenUris, handle, indent=4)
