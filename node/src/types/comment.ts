export type Comment = {
	id: number;
	content: string;
	user: {
		name: string;
		profile_image_url?: string | null;
	};
};
