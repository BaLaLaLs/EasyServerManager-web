export function percentageToHsl(percentage: number, hue0: number, hue1: number) {
    const hue = (percentage * (hue1 - hue0)) + hue0;
    return 'hsl(' + hue + ', 100%, 40%)';
    // return [hue, 100, 50]
}

export function hslToHex(h: number, s: number, l: number) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n:number) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}
const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

export function niceBytes(x:number){

    let l = 0, n = x || 0;
    while(n >= 1024 && ++l){
        n = n/1024;
    }

    return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
}
// 固定长度数组
export class SizedArray<T> extends Array {
    private readonly size: number;
    constructor(size: number) {
        super();
        this.size = size;
    }
    push(...items: T[]): number {
        let deleteCount = (this.length + items.length) - this.size
        if(deleteCount > 0) {
            this.splice(0, deleteCount)
        }
        return super.push(...items)
    }
}
