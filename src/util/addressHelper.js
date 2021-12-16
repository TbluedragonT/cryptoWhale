import addresses from "../config/address";

const chainId = process.env.GATSBY_APP_CHAIN_ID;

export const CONTRACT_ADDRESS_CWC = addresses.cwc_contract[chainId];
export const CONTRACT_ADDRESS_BLUB = addresses.blub_contract[chainId];

export const BACKEND_URL = process.env.GATSBY_APP_BACKEND_URL;