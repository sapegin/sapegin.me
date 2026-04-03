export type TalkType = 'talk' | 'lightning' | 'workshop';

export interface Event {
	ref: string;
	name: string;
	date: string;
	location: string;
	url: string;
}

export interface Talk {
	id: string;
	type: TalkType;
	title: string;
	slides?: string;
	video?: string;
}

export type Gig = Talk &
	Event & {
		timestamp: number;
	};
