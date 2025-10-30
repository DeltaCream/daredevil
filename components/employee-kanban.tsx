"use client";

import * as React from "react";

import {
    DragEndEvent,
    KanbanBoard,
    KanbanCard,
    KanbanCards,
    KanbanHeader,
    KanbanProvider,
} from "@/components/ui/shadcn-io/kanban/employee";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
    DialogTrigger,
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
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    // const [openFeatureId, setOpenFeatureId] = React.useState<string | null>(
    //     null
    // );

    // timestamp of last dialog close — used to debounce immediate re-opens
    // const lastDialogCloseRef = React.useRef<number | null>(null);
    // const DIALOG_COOLDOWN_MS = 250; // (200-300ms is typical)

    // Use this instead of calling setOpenFeatureId directly
    // const tryOpenFeature = (featureId: string) => {
    //     const last = lastDialogCloseRef.current;
    //     if (last && Date.now() - last < DIALOG_COOLDOWN_MS) {
    //         // ignore attempts to open too soon after a close
    //         return;
    //     }
    //     setOpenFeatureId(featureId);
    // };

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
                                dialogOpen={isDialogOpen}
                            >
                                {/* Clicking the card or the action button opens a Dialog (similar to a modal) with details.
                                    Click on the card to reliably open the overlay without interfering with drag handlers. */}
                                <Dialog modal={true} onOpenChange={() => setIsDialogOpen(!isDialogOpen)} open={isDialogOpen}>
                                    <DialogTrigger asChild>
                                        <div>
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="flex flex-col gap-1">
                                                    <p className="m-0 flex-1 font-medium text-sm">
                                                        {feature.name}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2">
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
                                            </div>
                                            <p className="m-0 text-xs">
                                                {feature.remarks}
                                            </p>
                                        </div>
                                    </DialogTrigger>

                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                {feature.name}
                                                {feature.owner && (
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage
                                                            src={
                                                                feature.owner
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
                                            </DialogTitle>
                                            <DialogDescription>
                                                {feature.owner
                                                    ? `Owner: ${feature.owner.name}`
                                                    : "No owner"}
                                            </DialogDescription>
                                        </DialogHeader>

                                        <div className="grid gap-2 py-2">
                                            <p className="text-sm text-muted-foreground m-0">
                                                {feature.remarks}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                {feature.owner && (
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage
                                                            src={
                                                                feature.owner
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
                                                <div>
                                                    <p className="m-0 font-medium">
                                                        {feature.owner?.name}
                                                    </p>
                                                    <p className="m-0 text-xs text-muted-foreground">
                                                        {column.name}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <DialogFooter>
                                            <DialogClose asChild>
                                                <Button
                                                    type="button"
                                                    variant="ghost" //or secondary
                                                >
                                                    Close
                                                </Button>
                                            </DialogClose>
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
