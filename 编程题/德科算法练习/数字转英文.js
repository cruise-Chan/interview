
let number = Number('11892785345893458') // 16,024,558,922
const map = {
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
    10: 'ten',
    11: 'eleven',
    12: 'twelve',
    13: 'thirteen',
    14: 'forteen',
    15: 'fifteen',
    16: 'sixteen',
    17: 'seventeen',
    18: 'eighteen',
    19: 'nineteen',
    20: 'twenty',
    30: 'thirty',
    40: 'forty',
    50: 'fifty',
    60: 'sixty',
    70: 'seventy',
    80: 'eighty',
    90: 'ninety',
}
// and，billion，million，thousand，hundred。
readAll(number)
function readAll(number) {
    let res = ''
    let billion = Math.floor(number / Math.pow(10, 9))
    const billionRest = number % Math.pow(10, 9)
    const million = Math.floor(billionRest / Math.pow(10, 6))
    const millionRest = billionRest % Math.pow(10, 6)
    const thousand = Math.floor(millionRest / Math.pow(10, 3))
    const thousandRest = millionRest % Math.pow(10, 3)
    if (billion >= 1000) {
        billion = readAll(billion)
    } else if (billion > 0) {
        res += ' ' + readTribleNumber(billion) + ' billion'
    }
    if (million > 0) {
        res += (' ' + readTribleNumber(million) + ' million')
    }
    if (thousand > 0) {
        res += (' ' + readTribleNumber(thousand) + ' thousand')
    }
    if (thousandRest > 0) {
        res += (' ' + readTribleNumber(thousandRest))
    }
    console.log(res.trim())
    return res
}

function readTribleNumber(num) {
    if (num < 100) {
        return readDoubleNumber(num)
    }
    let result = ''
    const hundred = Math.floor(num / 100)
    const rest = num % 100
    if (hundred) {
        result += (map[hundred] + ' hundred')
    } else {
        result = readDoubleNumber(rest)
    }
    if (rest > 10 && result.length) {
        result += (' and ' + readDoubleNumber(rest))
    } else if (readDoubleNumber(rest)) {
        result += (' and ' + readDoubleNumber(rest))
    }
    return result.trim()
}
// for(let i=1;i<100;i++){
//     readDoubleNumber(i)
// }

function readDoubleNumber(num) {
    let result = ''
    let tenBit = Math.floor(num / 10)
    let unit = num % 10
    if (tenBit >= 2) {
        result += map[tenBit * 10] + ' '
    }
    if (unit > 0 && (tenBit >= 2 || tenBit === 0)) {
        result += map[unit]
    }
    if (num >= 10 && num <= 20) {
        result = map[num]
    }
    return result.trim()
}
