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
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
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

interface EmployeeKanbanProps {
    columns: Column[];
    users: User[];
    features: Feature[];
}

export default function EmployeeKanban({
    columns: dashboardColumns,
    users: dashboardUsers,
    features: dashboardFeatures,
}: EmployeeKanbanProps) {
    const [features, setFeatures] = React.useState(dashboardFeatures);
    const [openFeatureId, setOpenFeatureId] = React.useState<string | null>(null);

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
                        <Status
                            status={column.status as StatusType} //choices are online (green), offline (red), maintenance (blue), and degraded (orange)
                        >
                            <StatusIndicator />
                            <StatusLabel>{column.name}</StatusLabel>
                        </Status>
                    </KanbanHeader>
                    <KanbanCards id={column.id}>
                        {(feature: (typeof features)[number]) => (
                            <KanbanCard
                                column={column.id}
                                id={feature.id}
                                key={feature.id}
                                name={feature.name}
                            >
                                {/* Clicking the card or the action button opens a Dialog (similar to a modal) with details.
                                    Click on the card to reliably open the overlay without interfering with drag handlers. */}
                                <div
                                    className="cursor-pointer"
                                    onClick={(e) => {
                                        // Prevent the click from bubbling to parent drag handlers
                                        e.stopPropagation();
                                        setOpenFeatureId(feature.id);
                                    }}
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex flex-col gap-1">
                                            <p className="m-0 flex-1 font-medium text-sm">
                                                {feature.name}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {feature.owner && (
                                                <Avatar className="h-4 w-4 shrink-0">
                                                    <AvatarImage src={feature.owner.image} />
                                                    <AvatarFallback>
                                                        {feature.owner.name?.slice(0, 2)}
                                                    </AvatarFallback>
                                                </Avatar>
                                            )}
                                        </div>
                                    </div>
                                    <p className="m-0 text-xs">{feature.remarks}</p>
                                </div>
                                <Dialog open={openFeatureId === feature.id} onOpenChange={(open: boolean) => {
                                    if (!open) setOpenFeatureId(null);
                                }}>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>{feature.name}</DialogTitle>
                                            <DialogDescription>
                                                {feature.owner ? `Owner: ${feature.owner.name}` : "No owner"}
                                            </DialogDescription>
                                        </DialogHeader>

                                        <div className="grid gap-2 py-2">
                                            <p className="text-sm text-muted-foreground m-0">{feature.remarks}</p>
                                            <div className="flex items-center gap-2">
                                                {feature.owner && (
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage src={feature.owner.image} />
                                                        <AvatarFallback>{feature.owner.name?.slice(0, 2)}</AvatarFallback>
                                                    </Avatar>
                                                )}
                                                <div>
                                                    <p className="m-0 font-medium">{feature.owner?.name}</p>
                                                    <p className="m-0 text-xs text-muted-foreground">{column.name}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <DialogFooter>
                                            <Button variant="ghost" onClick={() => setOpenFeatureId(null)}>
                                                Close
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </KanbanCard>
                        )}
                    </KanbanCards>
                </KanbanBoard>
            )}
        </KanbanProvider>
    );
}
