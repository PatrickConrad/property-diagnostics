export const convertToString = (num: number) => {
    let numParts;
    if(`${num}`.includes('.')){
        numParts = `${num}`.split('.')
    }
    else{
        numParts = `${num}`
    }
    let fullNumPart = '';
    const fullNum = numParts[0]
    if(fullNum.length>3 && fullNum.length<=6){
        fullNumPart = `${numParts[0].slice(0, fullNum.length-3)},${numParts[0].slice(fullNum.length-3)}`
    }
    if(fullNum.length>6 && fullNum.length<=9){
        fullNumPart = `${numParts[0].slice(0, fullNum.length-6)}, ${numParts[0].slice(fullNum.length-6, fullNum.length-3)},${numParts[0].slice(fullNum.length-3)}`
    }
    if(fullNum.length>9 && fullNum.length<=12){
        fullNumPart = `${numParts[0].slice(0, fullNum.length-9)},${numParts[0].slice(fullNum.length-9, fullNum.length-6)},${numParts[0].slice(fullNum.length-6, fullNum.length-3)},${numParts[0].slice(fullNum.length-3)}`
    }
    if(fullNum.length>12 && fullNum.length<=15){
        fullNumPart = `${numParts[0].slice(0, fullNum.length-12)},${numParts[0].slice(fullNum.length-12, fullNum.length-9)},${numParts[0].slice(fullNum.length-9, fullNum.length-6)},${numParts[0].slice(fullNum.length-6, fullNum.length-3)},${numParts[0].slice(fullNum.length-3)}`
    }
    if(`${num}`.includes('.')){
        return fullNumPart+numParts[1]
    }
    return fullNumPart

}