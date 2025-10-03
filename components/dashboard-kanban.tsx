"use client";

import * as React from "react";

import {
    DragEndEvent,
    KanbanBoard,
    KanbanCard,
    KanbanCards,
    KanbanHeader,
    KanbanProvider,
} from "@/components/ui/shadcn-io/kanban";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Status,
    StatusIndicator,
    StatusLabel,
} from "@/components/ui/shadcn-io/status";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
});

const shortDateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
});

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

interface DashboardKanbanProps {
  columns: Column[];
  users: User[];
  features: Feature[];
}

export default function DashboardKanban(
    { columns: dashboardColumns, users: dashboardUsers, features: dashboardFeatures }: DashboardKanbanProps
) {
    const [features, setFeatures] = React.useState(dashboardFeatures);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) {
            return;
        }

        const status = dashboardColumns.find(({ id }) => id === over.id);

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

    return (
        <KanbanProvider
            columns={dashboardColumns}
            data={features}
            onDataChange={setFeatures}
            onDragEnd={handleDragEnd}
        >
            {(column) => (
                <KanbanBoard id={column.id} key={column.id}>
                    <KanbanHeader>
                        {/* <div className="flex items-center gap-2">
                            <div
                                className="h-2 w-2 rounded-full"
                                style={{
                                    backgroundColor: column.color,
                                }}
                            />
                            <span>{column.name}</span>
                        </div> */}
                        <Status
                            status={column.status as StatusType} //choices are online (green), offline (red), maintenance (blue), and degraded (orange)
                        >
                            <StatusIndicator />
                            <StatusLabel>{column.name}</StatusLabel>
                        </Status>
                        {/* </div> */}
                    </KanbanHeader>
                    <KanbanCards id={column.id}>
                        {(feature: (typeof features)[number]) => (
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
                                                src={feature.owner.image}
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
                                <p
                                    className="m-0 text-xs"
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
    );
}
