/// From shadcn/ui
import { AppSidebar } from "@/components/app-sidebar";
import {
    ChartAreaInteractive,
    description,
} from "@/components/chart-area-interactive";
// import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { DashboardHeader } from "@/components/dashboard-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { faker } from "@faker-js/faker";

import DashboardKanban from "@/components/dashboard-kanban";

import { DataTable } from "@/app/dashboard/finance/data-table";
import { BudgetEntry, columns } from "@/app/dashboard/finance/columns";
import { FinanceTable } from "./finance-table";
import { financeColumns } from "./finance-columns";

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

type StatusType = "debt" | "loan" | "paid" | "cc" | "gcash";

type Column = {
    id: string;
    amount: number;
    remarks: string;
    date: string;
    statuses: StatusType[];
};

// type BudgetEntry = {
//     id: string;
//     amount: number;
//     remarks: string;
//     date: Date;
//     statuses: StatusType[];
// };

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

export const budgetEntries: BudgetEntry[] = Array.from({ length: 20 })
    .fill(null)
    .map(() => ({
        id: faker.string.uuid(),
        amount: faker.number.int({ min: 0, max: 1000 }),
        remarks: faker.lorem.words({ min: 1, max: 5 }),
        date: faker.date.between({
            from: "2025-10-01T00:00:00.000Z",
            to: "2025-11-01T00:00:00.000Z",
        }),
        statuses: faker.helpers.arrayElements(
            ["debt", "loan", "paid", "cc", "gcash"],
            {
                min: 1,
                max: 3,
            }
        ),
    }));

async function getTableData(): Promise<BudgetEntry[]> {
    // Fetch data from your API here.
    // return [
    //     {
    //         id: "728ed52f",
    //         amount: 100,
    //         status: "pending",
    //         email: "m@example.com",
    //     },
    //     // ...
    // ];

    return Array.from({ length: 100 })
    .fill(null)
    .map(() => ({
        id: faker.string.uuid(),
        amount: faker.number.int({ min: 0, max: 1000 }),
        remarks: faker.lorem.words({ min: 1, max: 5 }),
        date: faker.date.between({
            from: "2025-10-01T00:00:00.000Z",
            to: "2025-11-01T00:00:00.000Z",
        }),
        statuses: faker.helpers.arrayElements(
            ["debt", "loan", "paid", "cc", "gcash"],
            {
                min: 1,
                max: 3,
            }
        ),
    }));
}

export default async function Page() {
    const data = await getTableData()
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
                            {/* <DataTable columns={columns} data={data} /> */}
                            <FinanceTable columns={financeColumns} data={data} />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
