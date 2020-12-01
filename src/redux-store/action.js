export const storeData = (token=[]) =>({
    type:'STORE_DATA',
    token
})

export const singleUser = (token={}) =>({
    type:'SINGLE_USER',
    token
})

export const authUser = (token=false) =>({
    type:'AUTHORIZATION',
    token
})