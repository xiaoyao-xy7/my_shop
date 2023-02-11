export function getLocalStorage (key) {
    let data, obj
    try {
        obj = localStorage.getItem(key)
        data = JSON.parse(obj)
    } catch (error) {
        data = obj
    }
    return data
}