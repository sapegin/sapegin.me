export interface Campaign {
	enabled: boolean;
	badge: string;
	banner: string;
	price: number;
	discountedPrice: number;
	url: string;
}

// TODO: Add a separate discounted URL
export const campaigns: Record<string, Campaign> = {
	washingCode: {
		enabled: false,
		badge: 'Now 50% off!',
		banner: 'Black Friday deal: get my book on clean code with 50% off',
		price: 20,
		discountedPrice: 10,
		url: 'https://sapegin.gumroad.com/l/washingcode-book/BF2025',
	},
};
