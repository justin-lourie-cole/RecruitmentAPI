import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbLink,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useLocation } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

export function Layout({ children }: { children: React.ReactNode }) {
	const location = useLocation();
	const pathSegments = location.pathname
		.split("/")
		.filter(Boolean)
		.map((segment) => ({
			label: segment
				.split("-")
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
				.join(" "),
			href: `/${segment}`,
		}));

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator orientation="vertical" className="mr-2 h-4" />
						<Breadcrumb>
							<BreadcrumbList>
								{pathSegments.map((segment, index) => (
									<Fragment key={segment.href}>
										<BreadcrumbItem key={segment.href}>
											{index === pathSegments.length - 1 ? (
												<BreadcrumbPage>{segment.label}</BreadcrumbPage>
											) : (
												<BreadcrumbLink href={segment.href}>
													{segment.label}
												</BreadcrumbLink>
											)}
										</BreadcrumbItem>
										{index < pathSegments.length - 1 && <BreadcrumbSeparator />}
									</Fragment>
								))}
							</BreadcrumbList>
						</Breadcrumb>
					</div>
				</header>
				<main className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
