export interface FavoriteOffer {
    id?: number;
    userId: number;
    offerId: string | number;
    title: string;
    company: string;
    location: string;
    shortDescription?: string;
    dateAdded?: string;
}