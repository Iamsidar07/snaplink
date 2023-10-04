export interface History {
    _id: string,
    original_url: string,
    clicks: number,
    createdAt: Date,
    userId: string,
    short_url: string,
    qrcode: string
}