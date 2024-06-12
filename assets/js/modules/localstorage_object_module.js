


export function SaveObject(basketData, itemName) {
    let mySerializedData = JSON.stringify(basketData)
    localStorage.setItem(itemName, mySerializedData)
    //console.log(`Local storage usage: ${localStorageSpace()}`);
}


export function ReadObject(itemName) {

    let mybasketstring = localStorage.getItem(itemName)
    // @ts-ignore
    let myBasket = JSON.parse(mybasketstring)
    return myBasket
}




function localStorageSpace() {
    var allStrings = '';
    for (var key in window.localStorage) {
        if (window.localStorage.hasOwnProperty(key)) {
            allStrings += window.localStorage[key];
        }
    }
    return allStrings ? 3 + ((allStrings.length * 16) / (8 * 1024)) + ' KB' : 'Empty (0 KB)';
};