import {
	Command,
	ChevronRight,
	Bell,
	CreditCard,
	BadgeCheck,
	LogOut,
	Sparkles,
	Folder,
	Share,
	MoreHorizontal,
	Trash2,
	SquareTerminal,
	Bot,
	BookOpen,
	Settings2,
	LifeBuoy,
	Send,
	Frame,
	PieChart,
	Map,
	ChevronsUpDown,
} from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuLabel,
	DropdownMenuGroup,
	DropdownMenuSeparator,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useLocation } from "react-router-dom";

const data = {
	user: {
		name: "Justin Cole",
		email: "justincole@outlook.co.nz",
		avatar: "/avatar.jpg",
	},
	navMain: [
		{
			title: "Dashboard",
			url: "/dashboard",
			icon: SquareTerminal,
			items: [
				{
					title: "Overview",
					url: "/dashboard/overview",
				},
				{
					title: "Analytics",
					url: "/dashboard/analytics",
				},
				{
					title: "Settings",
					url: "/dashboard/settings",
				},
			],
		},
		{
			title: "Candidates",
			url: "/candidates",
			icon: Bot,
			items: [
				{
					title: "Active",
					url: "/candidates/active",
				},
				{
					title: "Shortlisted",
					url: "/candidates/shortlisted",
				},
				{
					title: "Archived",
					url: "/candidates/archived",
				},
			],
		},
		{
			title: "Jobs",
			url: "/jobs",
			icon: BookOpen,
			items: [
				{
					title: "Active Jobs",
					url: "/jobs/active",
				},
				{
					title: "Draft Jobs",
					url: "/jobs/draft",
				},
				{
					title: "Closed Jobs",
					url: "/jobs/closed",
				},
				{
					title: "Templates",
					url: "/jobs/templates",
				},
			],
		},
		{
			title: "Settings",
			url: "#",
			icon: Settings2,
			items: [
				{
					title: "Company Profile",
					url: "/settings/company-profile",
				},
				{
					title: "Team Members",
					url: "/settings/team-members",
				},
				{
					title: "Billing",
					url: "/settings/billing",
				},
				{
					title: "Integrations",
					url: "/settings/integrations",
				},
			],
		},
	],
	navSecondary: [
		{
			title: "Help Center",
			url: "/help-center",
			icon: LifeBuoy,
		},
		{
			title: "Contact Support",
			url: "/contact-support",
			icon: Send,
		},
	],
	projects: [
		{
			name: "Engineering Roles",
			url: "/engineering-roles",
			icon: Frame,
		},
		{
			name: "Sales Positions",
			url: "/sales-positions",
			icon: PieChart,
		},
		{
			name: "Remote Jobs",
			url: "/remote-jobs",
			icon: Map,
		},
	],
};

export function AppSidebar() {
	const location = useLocation();

	console.log(location.pathname);

	return (
		<Sidebar variant="inset">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<a href="/dashboard">
								<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
									<Avatar className="h-8 w-8 rounded-lg">
										<AvatarImage
											src="/avatar.jpg"
											alt="Just In Time Recruitment"
										/>
										<AvatarFallback className="rounded-lg">JITR</AvatarFallback>
									</Avatar>
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">
										Just In Time Recruitment
									</span>
									<span className="truncate text-xs">Enterprise</span>
								</div>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Platform</SidebarGroupLabel>
					<SidebarMenu>
						{data.navMain.map((item) => (
							<Collapsible
								key={item.title}
								asChild
								defaultOpen={location.pathname.includes(item.url)}
							>
								<SidebarMenuItem>
									<SidebarMenuButton asChild tooltip={item.title}>
										<a href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
									{item.items?.length ? (
										<>
											<CollapsibleTrigger asChild>
												<SidebarMenuAction className="data-[state=open]:rotate-90">
													<ChevronRight />
													<span className="sr-only">Toggle</span>
												</SidebarMenuAction>
											</CollapsibleTrigger>
											<CollapsibleContent>
												<SidebarMenuSub>
													{item.items?.map((subItem) => (
														<SidebarMenuSubItem key={subItem.title}>
															<SidebarMenuSubButton asChild>
																<a href={subItem.url}>
																	<span>{subItem.title}</span>
																</a>
															</SidebarMenuSubButton>
														</SidebarMenuSubItem>
													))}
												</SidebarMenuSub>
											</CollapsibleContent>
										</>
									) : null}
								</SidebarMenuItem>
							</Collapsible>
						))}
					</SidebarMenu>
				</SidebarGroup>
				<SidebarGroup className="group-data-[collapsible=icon]:hidden">
					<SidebarGroupLabel>Projects</SidebarGroupLabel>
					<SidebarMenu>
						{data.projects.map((item) => (
							<SidebarMenuItem key={item.name}>
								<SidebarMenuButton asChild>
									<a href={item.url}>
										<item.icon />
										<span>{item.name}</span>
									</a>
								</SidebarMenuButton>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<SidebarMenuAction showOnHover>
											<MoreHorizontal />
											<span className="sr-only">More</span>
										</SidebarMenuAction>
									</DropdownMenuTrigger>
									<DropdownMenuContent
										className="w-48"
										side="bottom"
										align="end"
									>
										<DropdownMenuItem>
											<Folder className="text-muted-foreground" />
											<span>View Project</span>
										</DropdownMenuItem>
										<DropdownMenuItem>
											<Share className="text-muted-foreground" />
											<span>Share Project</span>
										</DropdownMenuItem>
										<DropdownMenuSeparator />
										<DropdownMenuItem>
											<Trash2 className="text-muted-foreground" />
											<span>Delete Project</span>
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</SidebarMenuItem>
						))}
						<SidebarMenuItem>
							<SidebarMenuButton>
								<MoreHorizontal />
								<span>More</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroup>
				<SidebarGroup className="mt-auto">
					<SidebarGroupContent>
						<SidebarMenu>
							{data.navSecondary.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild size="sm">
										<a href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton
									size="lg"
									className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
								>
									<Avatar className="h-8 w-8 rounded-lg">
										<AvatarImage src={data.user.avatar} alt={data.user.name} />
										<AvatarFallback className="rounded-lg">CN</AvatarFallback>
									</Avatar>
									<div className="grid flex-1 text-left text-sm leading-tight">
										<span className="truncate font-semibold">
											{data.user.name}
										</span>
										<span className="truncate text-xs">{data.user.email}</span>
									</div>
									<ChevronsUpDown className="ml-auto size-4" />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
								side="bottom"
								align="end"
								sideOffset={4}
							>
								<DropdownMenuLabel className="p-0 font-normal">
									<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
										<Avatar className="h-8 w-8 rounded-lg">
											<AvatarImage
												src={data.user.avatar}
												alt={data.user.name}
											/>
											<AvatarFallback className="rounded-lg">CN</AvatarFallback>
										</Avatar>
										<div className="grid flex-1 text-left text-sm leading-tight">
											<span className="truncate font-semibold">
												{data.user.name}
											</span>
											<span className="truncate text-xs">
												{data.user.email}
											</span>
										</div>
									</div>
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuGroup>
									<DropdownMenuItem>
										<Sparkles />
										Upgrade to Pro
									</DropdownMenuItem>
								</DropdownMenuGroup>
								<DropdownMenuSeparator />
								<DropdownMenuGroup>
									<DropdownMenuItem>
										<BadgeCheck />
										Account
									</DropdownMenuItem>
									<DropdownMenuItem>
										<CreditCard />
										Billing
									</DropdownMenuItem>
									<DropdownMenuItem>
										<Bell />
										Notifications
									</DropdownMenuItem>
								</DropdownMenuGroup>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<LogOut />
									Log out
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
