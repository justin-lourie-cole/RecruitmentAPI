// Types
export type LoginRequest = {
	username: string;
	password: string;
};

export type LoginResponse = {
	token: string;
};

export type Job = {
	id: number;
	title: string;
	description: string;
	location: string;
	salary: number;
	datePosted: Date;
};

export type EmailRequest = {
	toEmail: string;
	subject: string;
	message: string;
};

type ApiResponse<T> =
	| {
			data: T;
			error?: never;
	  }
	| {
			data?: never;
			error: string;
	  };

const API_BASE_URL = "http://localhost:5075/api";

const getAuthHeader = () => {
	const token = localStorage.getItem("token");
	return token ? { Authorization: `Bearer ${token}` } : {};
};

async function apiClient<T>(
	endpoint: string,
	options: RequestInit = {},
): Promise<ApiResponse<T>> {
	try {
		const response = await fetch(`${API_BASE_URL}${endpoint}`, {
			headers: {
				"Content-Type": "application/json",
				...getAuthHeader(),
				...options.headers,
			} as HeadersInit,
			...options,
		});

		if (!response.ok) {
			throw new Error(`API Error: ${response.statusText}`);
		}

		const data = await response.json();
		return { data };
	} catch (error) {
		return {
			error:
				error instanceof Error ? error.message : "An unknown error occurred",
		};
	}
}

async function uploadFile(
	endpoint: string,
	file: File,
): Promise<ApiResponse<{ url: string }>> {
	const formData = new FormData();
	formData.append("file", file);

	return apiClient(endpoint, {
		method: "POST",
		headers: {
			...getAuthHeader(),
		} as HeadersInit,
		body: formData,
	});
}

export const api = {
	auth: {
		login: (credentials: LoginRequest) =>
			apiClient<LoginResponse>("/auth/login", {
				method: "POST",
				body: JSON.stringify(credentials),
			}),
	},

	jobs: {
		getAll: () => apiClient<Job[]>("/job"),

		create: (job: Omit<Job, "id">) =>
			apiClient<Job>("/job", {
				method: "POST",
				body: JSON.stringify(job),
			}),

		update: (id: number, job: Job) =>
			apiClient<void>(`/job/${id}`, {
				method: "PUT",
				body: JSON.stringify(job),
			}),

		delete: (id: number) =>
			apiClient<void>(`/job/${id}`, {
				method: "DELETE",
			}),
	},

	s3: {
		uploadFile: (file: File) => uploadFile("/s3/upload", file),
	},

	sqs: {
		sendMessage: (message: string) =>
			apiClient<{ message: string }>("/sqs/send-message", {
				method: "POST",
				body: JSON.stringify(message),
			}),
	},

	email: {
		sendEmail: (request: EmailRequest) =>
			apiClient<{ message: string }>("/email/send-email", {
				method: "POST",
				body: JSON.stringify(request),
			}),
	},
};
