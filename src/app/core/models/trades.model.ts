export interface Trade {
    id?: string;
    user_id?: string;
    asset: string;
    type: TradeType;
    openTime: Date | string;
    closeTime: Date | string;
    duration: string;
    pnl: number;
    userId?: string;
    hasScreenshot: boolean;
}

export enum TradeType {
    LONG = 'long',
    SHORT = 'short'
}