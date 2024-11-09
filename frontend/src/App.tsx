import { useState, useEffect } from "react";
import { api, type Job } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Layout } from "@/components/layout";
import { BrowserRouter } from "react-router-dom";

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
		<BrowserRouter>
			<Layout>
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Job Creation Form */}
					<Card className="lg:col-span-1">
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
					<div className="lg:col-span-2">
						<h2 className="text-2xl font-semibold mb-6">Current Openings</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{jobs.map((job) => (
								<Card key={job.id}>
									<CardContent className="pt-6">
										<div className="flex flex-col h-full">
											<div className="flex-1">
												<h3 className="text-xl font-bold mb-2">{job.title}</h3>
												<p className="text-muted-foreground mb-4">
													{job.description}
												</p>
												<div className="space-y-1">
													<p className="text-sm text-muted-foreground">
														📍 {job.location}
													</p>
													<p className="text-sm text-muted-foreground">
														💰 ${Number(job.salary).toLocaleString("en-US")}
													</p>
												</div>
											</div>
											<div className="flex items-center space-x-2 mt-4">
												<Button
													variant="destructive"
													onClick={() => api.jobs.delete(job.id)}
												>
													Delete
												</Button>
												<Input type="file" onChange={handleFileUpload} />
											</div>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</div>
			</Layout>
		</BrowserRouter>
	);
}

export default App;
