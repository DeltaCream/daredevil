/// From shadcn/ui
import { AppSidebar } from "@/components/app-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { faker } from "@faker-js/faker";
import EmployeeKanban from "@/components/employee/employee-kanban";

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
    remarks: string;
    column: string;
};

let columns = [
    { id: faker.string.uuid(), name: "Busy", status: "offline" },
    { id: faker.string.uuid(), name: "Nearing Availability", status: "idle" },
    { id: faker.string.uuid(), name: "Available", status: "online" },
    { id: faker.string.uuid(), name: "Present", status: "pending" },
];

columns = columns.map((column) => {
    // Map string status to StatusType, change "pending" to "maintenance", "idle" to "degraded", and set status to "offline" if not valid
    let newStatus: StatusType =
        column.status === "online" || column.status === "offline"
            ? column.status
            : column.status === "pending"
            ? "maintenance"
            : column.status === "idle"
            ? "degraded"
            : "offline";
    if (column.status === "idle") {
        newStatus = "degraded";
    } else if (column.status === "pending") {
        newStatus = "maintenance";
    }

    return { ...column, status: newStatus };
});

//data needed:
/*
1. id of employee
2. name of employee
3. avatar of employee
4. projects of employee containing:
a. name of project
b. link of project (in Jira)
c. status of project
d. due date
5. remarks of employee
*/

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
        footer:
            faker.number.float({ min: 0, max: 100, fractionDigits: 2 }) +
            "%" +
            " of total employees",
    },
    {
        title: "Supervisors",
        description: "Number of supervisors present",
        content: "5",
        footer:
            faker.number.float({ min: 0, max: 100, fractionDigits: 2 }) +
            "%" +
            " of total supervisors",
    },
];

async function getTableData(): Promise<User[]> {
    return [
        {
            id: "1000",
            name: "Rian",
            image: faker.image.avatar(),
            remarks: "Sample Text",
            column: "Present", // All start in Present
        },
        {
            id: "2000",
            name: "John",
            image: faker.image.avatar(),
            remarks: "They call him cute",
            column: "Present",
        },
        {
            id: "3000",
            name: "Lily",
            image: faker.image.avatar(),
            remarks: "Currently working on a project",
            column: "Present",
        },
        {
            id: "3300",
            name: "Ryan",
            image: faker.image.avatar(),
            remarks: "About to be done with the project",
            column: "Present",
        },
        {
            id: "3750",
            name: "Harry",
            image: faker.image.avatar(),
            remarks: "Somehow, he's not a potter",
            column: "Present",
        },
        {
            id: "4000",
            name: "Luis",
            image: faker.image.avatar(),
            remarks: "Luis is a good person",
            column: "Present",
        },
        {
            id: "5000",
            name: "William",
            image: faker.image.avatar(),
            remarks: "His name is William",
            column: "Present",
        },
    ];
}

export default async function Page() {
    const usersRaw = await getTableData();
    const users = usersRaw.map((u) => ({
        ...u,
        // find the column by name and replace the user.column with the column id
        column: columns.find((c) => c.name === u.column)?.id ?? columns[0].id,
    }));
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
            defaultOpen={false}
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                <DashboardHeader />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            {/* <SectionCards content={exampleCardData}/>
                            <div className="px-4 lg:px-6">
                              <ChartAreaInteractive />
                              <EmployeeChartArea />
                            </div> */}
                            <EmployeeKanban
                                columns={columns as Column[]}
                                users={users as User[]}
                                // features={exampleFeatures as Feature[]}
                            />
                            {/* <DataTable data={data} /> */}
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
