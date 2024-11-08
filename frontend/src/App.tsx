import { useState, useEffect } from "react";
import { api, type Job } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

function App() {
	const [jobs, setJobs] = useState<Job[]>([]);
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		location: "",
		salary: "",
	});

	useEffect(() => {
		loadJobs();
	}, []);

	const loadJobs = async () => {
		const response = await api.jobs.getAll();
		if (response.data) {
			setJobs(response.data);
		}
	};

	const handleCreateJob = async (e: React.FormEvent) => {
		e.preventDefault();
		const response = await api.jobs.create({
			...formData,
			salary: Number.parseFloat(formData.salary),
			datePosted: new Date(),
		});
		if (response.data) {
			loadJobs();
			setFormData({ title: "", description: "", location: "", salary: "" });
		}
	};

	const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const response = await api.s3.uploadFile(file);
			if (response.data) {
				console.log("File uploaded:", response.data.url);
			}
		}
	};

	return (
		<div className="container mx-auto p-4 max-w-4xl">
			<h1 className="text-4xl font-bold mb-8 text-center">
				<span className="text-emerald-600">Recruitment</span> Portal
			</h1>

			{/* Job Creation Form */}
			<Card className="mb-8">
				<CardHeader>
					<CardTitle>Create New Job</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleCreateJob} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="title">Job Title</Label>
							<Input
								id="title"
								value={formData.title}
								onChange={(e) =>
									setFormData({ ...formData, title: e.target.value })
								}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="description">Description</Label>
							<Textarea
								id="description"
								value={formData.description}
								onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
									setFormData({ ...formData, description: e.target.value })
								}
								className="min-h-[100px]"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="location">Location</Label>
							<Input
								id="location"
								value={formData.location}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setFormData({ ...formData, location: e.target.value })
								}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="salary">Salary</Label>
							<Input
								id="salary"
								type="number"
								value={formData.salary}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setFormData({ ...formData, salary: e.target.value })
								}
							/>
						</div>
						<Button className="w-full bg-emerald-600 hover:bg-emerald-700">
							Create Job
						</Button>
					</form>
				</CardContent>
			</Card>

			{/* Job Listings */}
			<div className="space-y-4">
				<h2 className="text-2xl font-semibold mb-6">Current Openings</h2>
				{jobs.map((job) => (
					<Card key={job.id}>
						<CardContent className="pt-6">
							<div className="flex justify-between items-start mb-4">
								<div>
									<h3 className="text-xl font-bold mb-2">{job.title}</h3>
									<p className="text-muted-foreground mb-4">
										{job.description}
									</p>
									<div className="space-y-1">
										<p className="text-sm text-muted-foreground">
											📍 {job.location}
										</p>
										<p className="text-sm text-muted-foreground">
											💰 ${job.salary}
										</p>
									</div>
								</div>
							</div>
							<div className="flex items-center space-x-2">
								<Button
									variant="destructive"
									onClick={() => api.jobs.delete(job.id)}
								>
									Delete
								</Button>
								<Input type="file" onChange={handleFileUpload} />
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}

export default App;
