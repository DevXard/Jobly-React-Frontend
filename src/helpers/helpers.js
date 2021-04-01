
function toLowerCase(str) {
    let result = ''
    for(let i of str){
        result += i.toLowerCase()
    }
    return result
}

export {
    toLowerCase
}