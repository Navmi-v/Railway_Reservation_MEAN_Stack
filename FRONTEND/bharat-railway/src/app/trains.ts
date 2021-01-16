export class Train {
    constructor(
    public name: string,
    public trainNum: number,
    public from: string,
    public to: string,
    public distance: number,
    public fare: number,
    public arrival: Number,
    public departure: Number,
    ) {}
}