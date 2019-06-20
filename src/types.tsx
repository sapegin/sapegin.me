export type Book = {
	link: string;
	title: string;
	description: string;
	cover: string;
};

export type Resource = {
	link: string;
	title: string;
	description?: string;
};

export type Social = {
	id: string;
	link: string;
	name: string;
};

export type TalkType = 'talk' | 'lightning' | 'workshop';

export type Event = {
	ref: string;
	name: string;
	date: string;
	location: string;
	link: string;
};

export type Talk = {
	id: string;
	title: string;
	type: TalkType;
	slides?: string;
	video?: string;
};

export type Gig = Talk &
	Event & {
		timestamp: number;
	};
