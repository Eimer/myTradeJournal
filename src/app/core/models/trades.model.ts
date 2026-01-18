export interface Trade {
    id?: string;
    asset: string;
    type: TradeType;
    openTime: Date | string;
    closeTime: Date | string;
    duration: string;
    pnl: number;
    userId?: string;
}

export enum TradeType {
    LONG = 'Long',
    SHORT = 'Short'
}