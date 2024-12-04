export interface Campaign {
	enabled: boolean;
	badge: string;
	price: number;
	discountedPrice: number;
	url: string;
}

// TODO: Add a separate discounted URL
export const campaigns: Record<string, Campaign> = {
	washingCode: {
		enabled: false,
		badge: 'Now 75% off!',
		price: 20,
		discountedPrice: 5,
		url: 'https://sapegin.gumroad.com/l/washingcode-book',
	},
};
