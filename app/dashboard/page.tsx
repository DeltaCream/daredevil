import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive, description } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import data from "./data.json";

import { faker } from "@faker-js/faker";

import DashboardKanban from "@/components/dashboard-kanban";

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

type StatusType = "online" | "offline" | "maintenance" | "degraded";

type Column = {
    id: string;
    name: string;
    // color: string;
    status: StatusType;
};

type User = {
    id: string;
    name: string;
    image: string;
};

type Feature = {
    id: string;
    name: string;
    remarks: string;
    column: string;
    owner: User;
};

// columns are already mapped to valid statuses, so this mapping is no longer needed

var columns = [
    // { id: faker.string.uuid(), name: "Sean", status: "idle" },
    // { id: faker.string.uuid(), name: "Renz", color: "#F59E0B", status: "online"},
    // { id: faker.string.uuid(), name: "Rommel", color: "#10B981", status: "online"},
    // { id: faker.string.uuid(), name: "Mehraj", color: "#10B981", status: "offline"},
    // { id: faker.string.uuid(), name: "Jay", color: "#10B981", status: "pending" },
    { id: faker.string.uuid(), name: "Available", status: "online"},
    { id: faker.string.uuid(), name: "Not Available", status: "offline"},
    { id: faker.string.uuid(), name: "Frontend", status: "idle"},
    { id: faker.string.uuid(), name: "Backend", status: "pending"},
];

columns = columns.map((column) => {
    // Map string status to StatusType, change "pending" to "maintenance", "idle" to "degraded", and set status to "offline" if not valid
    let newStatus: StatusType =
        column.status === "online" ||
        column.status === "offline"
            ? column.status
            : column.status === "pending" ? "maintenance"
            : column.status === "idle" ? "degraded" : "offline";
    if (column.status === "idle") {
        newStatus = "degraded";
    } else if (column.status === "pending") {
        newStatus = "maintenance";
    }

  return { ...column, status: newStatus };
})

const users = Array.from({ length: 4 })
    .fill(null)
    .map(() => ({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        image: faker.image.avatar(),
    }));

const exampleFeatures = Array.from({ length: 20 })
    .fill(null)
    .map(() => ({
        id: faker.string.uuid(),
        name: capitalize(faker.person.fullName()),
        // startAt: faker.date.past({ years: 0.5, refDate: new Date() }),
        // endAt: faker.date.future({ years: 0.5, refDate: new Date() }),
        remarks: faker.lorem.sentence(),
        column: faker.helpers.arrayElement(columns).id,
        owner: faker.helpers.arrayElement(users),
    }));

// const exampleCardData = Array.from({ length: 20 })
//     .fill(null)
//     .map(() => ({
//         description: faker.lorem.sentence(),
//         title: capitalize(faker.lorem.sentence()),
//         footer: faker.lorem.sentence(),
//         subfooter: faker.lorem.sentence(),
//     }));

const exampleCardData = [
    {
        title: "Employees",
        description: "Number of employees present",
        content: "20",
        footer: faker.number.float({ min: 0, max: 100, fractionDigits: 2}) + "%" + " of total employees",
    },
    {
        title: "Supervisors",
        description: "Number of supervisors present",
        content: "5",
        footer: faker.number.float({ min: 0, max: 100, fractionDigits: 2}) + "%" + " of total supervisors",
    },
]

export default function Page() {
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <SectionCards content={exampleCardData}/>
                            {/* <div className="px-4 lg:px-6">
                              <ChartAreaInteractive />
                            </div> */}
                            {/* <DataTable data={data} /> */}
                            <DashboardKanban columns={columns as Column[]} users={users as User[]} features={exampleFeatures as Feature[]} />
                        </div>
                    </div>
                </div>
            </SidebarInset> 
        </SidebarProvider>
    );
}
