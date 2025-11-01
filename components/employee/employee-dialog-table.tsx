"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Tasks = {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    // date: string; //comes from startDate and endDate
    status:
        | "Pending"
        | "In Progress"
        | "With Blocker"
        | "For Testing"
        | "Completed";
    link: string;
};

export const tasks: Tasks[] = [
    {
        id: "1",
        name: "Task 1",
        startDate: "2023-01-01",
        endDate: "2023-01-02",
        status: "Pending",
        link: "/",
    },
    {
        id: "2",
        name: "Task 2",
        startDate: "2023-01-03",
        endDate: "2023-01-04",
        status: "In Progress",
        link: "/",
    },
    {
        id: "3",
        name: "Task 3",
        startDate: "2023-01-05",
        endDate: "2023-01-06",
        status: "With Blocker",
        link: "/",
    },
];

export const columns: ColumnDef<Tasks>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            const { name, link } = row.original;
            return (
                <Link href={link} className="text-blue-600 underline">
                    {name}
                </Link>
            );
        },
    },
    {
        accessorKey: "startDate",
        header: "Start Date",
    },
    {
        accessorKey: "endDate",
        header: "End Date",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
];
