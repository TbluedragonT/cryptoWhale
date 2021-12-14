import { initialState } from './state'

const Types = {
    SET_WEB3: 'SET_WEB3',
    SET_ONBOARD: 'SET_ONBOARD',
    SET_WALLET_ADDRESS: 'SET_WALLET_ADDRESS',
    SET_CONNECTED: 'SET_CONNECTED'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.SET_WEB3:
            return {
                ...state,
                web3: action.payload
            };
        case Types.SET_ONBOARD:
            return {
                ...state,
                onBoard: action.payload
            };
        case Types.SET_WALLET_ADDRESS:
            return {
                ...state,
                walletAddress: action.payload
            };
        case Types.SET_CONNECTED:
            return {
                ...state,
                connected: action.payload
            };
        default: return state
    }
}
export default reducer;