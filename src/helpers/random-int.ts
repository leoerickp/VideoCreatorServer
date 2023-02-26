export const RandomInt = (n: number, n0: number = 0): number => {
    return Math.floor(Math.random() * (n - n0 + 1) + n0);
}