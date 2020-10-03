

export const findDate = (input:string) => {
    for(let i = 0; i < input.length; i++) {
        if(i + 4 > input.length) break
        const num = Number(input.substring(i, i + 4))
        if(Number.isInteger(num) && num.toString().length > 3 && num > 0) {
            return num
        }
    }

    return 0
}