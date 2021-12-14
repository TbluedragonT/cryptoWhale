import { Types } from './types'

export const setWeb3 = (data) => ({
  type: Types.SET_WEB3,
  payload: data,
});

export const setOnBoard = (data) => ({
  type: Types.SET_ONBOARD,
  payload: data,
});

export const setWalletAddress = (address) => ({
  type: Types.SET_WALLET_ADDRESS,
  payload: address,
});

export const setConnected = (status) => ({
  type: Types.SET_CONNECTED,
  payload: status,
});