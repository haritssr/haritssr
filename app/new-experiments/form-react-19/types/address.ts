export interface AddressFormData {
	streetAddress: string;
	apartment?: string;
	city: string;
	state: string;
	zipCode: string;
	country: string;
}

export interface ActionResponse {
	success: boolean;
	message: string;
	errors?: {
		[K in keyof AddressFormData]?: string[];
	};
}
