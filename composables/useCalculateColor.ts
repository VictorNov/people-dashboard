export const useCalculateColor = (hexcolor: string): string => {
    const r: number = parseInt(hexcolor.substring(0, 2), 16);
    const g: number = parseInt(hexcolor.substring(2, 4), 16);
    const b: number = parseInt(hexcolor.substring(4, 6), 16);
    const yiq: number = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? "black" : "white";
};