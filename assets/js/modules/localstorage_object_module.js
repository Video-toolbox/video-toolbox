


export function SaveObject(basketData, itemName) {
    let mySerializedData = JSON.stringify(basketData)
    localStorage.setItem(itemName, mySerializedData)
}


export function ReadObject(itemName) {

    let mybasketstring = localStorage.getItem(itemName)
    // @ts-ignore
    let myBasket = JSON.parse(mybasketstring)
    return myBasket
}