export function roll(x, y, z){

    x = x || 6;
    y = y || 1;
    z = z || 1;
    let min = y;
    let max = 6 * y;
    let result = [];
    let i = 0;
    while(i < z){
        result.push(Math.floor(Math.random() * (max-min)) + min)
        i++;
    }
    const obj = {
        sides: x,
        dice: y,
        rolls: z,
        results: result,
    };
    return JSON.stringify(obj);
}