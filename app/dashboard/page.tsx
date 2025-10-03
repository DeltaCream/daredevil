"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import data from "./data.json";

import { faker } from "@faker-js/faker";
import {
    DragEndEvent,
    KanbanBoard,
    KanbanCard,
    KanbanCards,
    KanbanHeader,
    KanbanProvider,
} from "@/components/ui/shadcn-io/kanban";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Status,
    StatusIndicator,
    StatusLabel,
} from "@/components/ui/shadcn-io/status";

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

type StatusType = "online" | "offline" | "maintenance" | "degraded";

type Column = {
    id: string;
    name: string;
    color: string;
    status: StatusType;
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

export default function Page() {
    const [features, setFeatures] = useState(exampleFeatures);
    //number of present employees (card)
    //number of present supervisors (card)

    //change the color of employee depending on the number of stats
    //initial two columns for kanban board (Available and Not Available), but can add more as Mehraj wishes (add column)
    //show name, remarks and avatar instead of task, date, and avatar

    //add graphs containing the number of available employees over the course of the day
    //or use developer velocity (middle if on track, high if early, low if late)

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) {
            return;
        }

        const status = columns.find(({ id }) => id === over.id);

        if (!status) {
            return;
        }

        setFeatures(
            features.map((feature) => {
                if (feature.id === active.id) {
                    return { ...feature, column: status.id };
                }

                return feature;
            })
        );
    };

    const dateFormatter = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    const shortDateFormatter = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
    });

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
                            <SectionCards />
                            {/* <div className="px-4 lg:px-6">
                              <ChartAreaInteractive />
                            </div> */}
                            {/* <DataTable data={data} /> */}
                            <KanbanProvider
                                columns={columns}
                                data={features}
                                onDataChange={setFeatures}
                            >
                                {(column) => (
                                    <KanbanBoard id={column.id} key={column.id}>
                                        <KanbanHeader>
                                            {/* <div className="flex items-center gap-2"> */}
                                                {/* <div
                                                    className="h-2 w-2 rounded-full"
                                                    style={{
                                                        backgroundColor:
                                                            column.color,
                                                    }}
                                                />
                                                <span>{column.name}</span> */}
                                                <Status
                                                    status={column.status as StatusType} //choices are online (green), offline (red), maintenance (blue), and degraded (orange)
                                                >
                                                    <StatusIndicator />
                                                    <StatusLabel>
                                                        {column.name}
                                                    </StatusLabel>
                                                </Status>
                                            {/* </div> */}
                                        </KanbanHeader>
                                        <KanbanCards id={column.id}>
                                            {(
                                                feature: (typeof features)[number]
                                            ) => (
                                                <KanbanCard
                                                    column={column.id}
                                                    id={feature.id}
                                                    key={feature.id}
                                                    name={feature.name}
                                                >
                                                    <div className="flex items-start justify-between gap-2">
                                                        <div className="flex flex-col gap-1">
                                                            <p className="m-0 flex-1 font-medium text-sm">
                                                                {feature.name}
                                                            </p>
                                                        </div>
                                                        {feature.owner && (
                                                            <Avatar className="h-4 w-4 shrink-0">
                                                                <AvatarImage
                                                                    src={
                                                                        feature
                                                                            .owner
                                                                            .image
                                                                    }
                                                                />
                                                                <AvatarFallback>
                                                                    {feature.owner.name?.slice(
                                                                        0,
                                                                        2
                                                                    )}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                        )}
                                                    </div>
                                                    <p className= "m-0 text-xs"
                                                    //"m-0 text-muted-foreground text-xs"
                                                    >
                                                        {/* {shortDateFormatter.format(
                                                            feature.startAt
                                                        )}{" "}
                                                        -{" "}
                                                        {dateFormatter.format(
                                                            feature.endAt
                                                        )} */}
                                                        {feature.remarks}
                                                    </p>
                                                </KanbanCard>
                                            )}
                                        </KanbanCards>
                                    </KanbanBoard>
                                )}
                            </KanbanProvider>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
