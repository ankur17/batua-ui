import {LOCALSTORE_KEYS} from "../Services/constants";

export const resolveWalletId = () => {
    const walletId = localStorage.getItem(LOCALSTORE_KEYS.WALLET_ID) || null;
    if (walletId !== 'undefined') {
        return walletId;
    } else {
        return null;
    }
}

export const postFetch = (url, payload) => {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
}

export const getFetch = (url, queryParams) => {
    const formedUrl = url + "?" + new URLSearchParams(queryParams)
    return fetch(formedUrl)
}