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
import {
    Status,
    StatusIndicator,
    StatusLabel,
} from "@/components/ui/shadcn-io/status";
import { columns, Tasks } from "./employee-dialog-table";
import { DataTable } from "./employee-data-table";

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
    remarks: string;
    column: string;
};

interface EmployeeKanbanProps {
    columns: Column[];
    users: User[];
}

export default function EmployeeKanban({
    columns: dashboardColumns, //the columns for the entire Kanban Board (1 column = 1 board)
    users: dashboardUsers, //cards
}: EmployeeKanbanProps) {
    const [users, setUsers] = React.useState(dashboardUsers);
    // const [features, setFeatures] = React.useState(dashboardFeatures);

    // needed to disable (unintentional) dragging when dialog is open
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);

    // track which feature's dialog is open (feature id) or null when none
    // const [openFeatureId, setOpenFeatureId] = React.useState<string | null>(
    //     null
    // );
    const [openUserId, setOpenUserId] = React.useState<string | null>(null);

    const [tableData, setTableData] = React.useState<Tasks[]>([]);

    React.useEffect(() => {
        async function fetchData() {
            const data = await getTableData();
            setTableData(data);
        }
        fetchData();
    }, []);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) {
            return;
        }

        const status = dashboardColumns.find(({ id }) => id === over.id);

        if (!status) {
            return;
        }

        const activeId = active.id.toString().split("-")[0]; // Extract original ID from compound ID
        const movingUser = users.find((u) => u.id === activeId);
        const sourceColumn = dashboardColumns.find(
            ({ id }) => id === movingUser?.column
        );
        const targetColumn = status;

        if (!movingUser || !sourceColumn) {
            return;
        }

        let newUsers = [...users];

        // Case 1: Moving a card from a non-Present column
        if (sourceColumn.name !== "Present") {
            // Only update the card position if it's not moving to Present
            if (targetColumn.name !== "Present") {
                newUsers = users.map((user) => {
                    if (user.id === activeId) {
                        // If this is the card in the non-Present column
                        if (user.column === sourceColumn.id) {
                            return { ...user, column: targetColumn.id };
                        }
                    }
                    return user;
                });
            } else {
                //target column name is "Present"
                newUsers = users.map((user) => {
                    if (user.id === activeId) {
                        // If this is the card in the non-Present column
                        if (user.column === sourceColumn.id) {
                            return { ...user, column: targetColumn.id };
                        }
                    }
                    return user;
                });
            }
        }
        // Case 2: Moving a card from Present column
        else if (sourceColumn.name === "Present") {
            // Only move the Present card
            newUsers = users.map((user) => {
                if (user.id === activeId && user.column === sourceColumn.id) {
                    return { ...user, column: targetColumn.id };
                }
                return user;
            });
        }

        setUsers(newUsers);
    };

    const getAssignedName = (columnId?: string) => {
        const col = dashboardColumns.find((c) => c.id === columnId);
        // Treat missing or Present as Unassigned
        if (!col || col.name === "Present") return "Unassigned";
        return col.name;
    };

    //retrieve by user id in the future to only retrieve the data for a given user when the dialog opens up
    async function getTableData(): Promise<Tasks[]> {
        return [
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
    }

    return (
        <KanbanProvider
            columns={dashboardColumns}
            data={users}
            onDataChange={setUsers}
            onDragEnd={handleDragEnd}
        >
            {(column) =>
                column.name === "Present" ? ( //if the column name is present, list every employee here with their current status, and update it accordingly from where they are assigned
                    <KanbanBoard
                        id={column.id}
                        key={column.id}
                        className="w-1/2"
                    >
                        <KanbanHeader>
                            <Status
                                status={column.status as StatusType} //choices are online (green), offline (red), maintenance (blue), and degraded (orange)
                            >
                                <StatusIndicator />
                                <StatusLabel>{column.name}</StatusLabel>
                            </Status>
                        </KanbanHeader>
                        <KanbanCards id={column.id}>
                            {(user) => (
                                <KanbanCard
                                    column={column.id}
                                    id={user.id}
                                    key={user.id}
                                    name={user.name}
                                    dialogOpen={isDialogOpen}
                                >
                                    {/* Clicking the card or the action button opens a Dialog (similar to a modal) with details.
                                    Click on the card to reliably open the overlay without interfering with drag handlers. */}
                                    <Dialog
                                        modal={true}
                                        onOpenChange={(open) => {
                                            setOpenUserId(
                                                open ? user.id : null
                                            );
                                            setIsDialogOpen(open); //need this to pass on the KanbanProvider to disable any finicky behavior regarding drag and drop when selecting on a Dialog
                                        }}
                                        open={openUserId === user.id}
                                    >
                                        <DialogTrigger asChild>
                                            <div role="button">
                                                <div className="flex items-start justify-between gap-2">
                                                    <div className="flex flex-col gap-1">
                                                        <p className="m-0 flex-1 font-medium text-sm">
                                                            {user.name}
                                                            {/* {feature.owner.name} */}
                                                        </p>
                                                        <p className="m-0 text-xs text-muted-foreground">
                                                            {user.column
                                                                ? `Assigned to: ${
                                                                      getAssignedName(
                                                                          user.column
                                                                      )
                                                                      //   dashboardColumns.find(
                                                                      //       (c) =>
                                                                      //           c.id ===
                                                                      //           user.column
                                                                      //   )?.name
                                                                  }`
                                                                : "Unassigned"}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        {
                                                            // feature.owner
                                                            user && (
                                                                <Avatar className="h-4 w-4 shrink-0">
                                                                    <AvatarImage
                                                                        src={String(
                                                                            user.image
                                                                        )}
                                                                    />
                                                                    <AvatarFallback>
                                                                        {user.name // .owner
                                                                            ?.slice(
                                                                                0,
                                                                                2
                                                                            )}
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                                <p className="m-0 text-xs">
                                                    {String(user.remarks)}
                                                </p>
                                            </div>
                                        </DialogTrigger>

                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>
                                                    <div className="flex items-center gap-2">
                                                        {user && (
                                                            <Avatar className="h-8 w-8">
                                                                <AvatarImage
                                                                    src={String(
                                                                        user.image
                                                                    )}
                                                                />
                                                                <AvatarFallback>
                                                                    {user.name?.slice(
                                                                        0,
                                                                        2
                                                                    )}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                        )}
                                                        <div>
                                                            <p className="m-0 font-medium">
                                                                {user?.name}
                                                            </p>
                                                            <p className="m-0 text-xs text-muted-foreground">
                                                                {column.name}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </DialogTitle>
                                                <DialogDescription>
                                                    Remarks:{" "}
                                                    {String(user.remarks)}
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DataTable
                                                columns={columns}
                                                data={tableData}
                                            />
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
                ) : (
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
                            {(user: (typeof users)[number]) => (
                                <KanbanCard
                                    column={column.id}
                                    id={user.id}
                                    key={user.id}
                                    name={user.name} //{feature.name}
                                    dialogOpen={isDialogOpen}
                                >
                                    {/* Clicking the card or the action button opens a Dialog (similar to a modal) with details.
                                    Click on the card to reliably open the overlay without interfering with drag handlers. */}
                                    <Dialog
                                        modal={true}
                                        onOpenChange={(open) => {
                                            setOpenUserId(
                                                open ? user.id : null
                                            );
                                            setIsDialogOpen(open); //need this to pass on the KanbanProvider to disable any finicky behavior regarding drag and drop when selecting on a Dialog
                                        }}
                                        open={openUserId === user.id}
                                    >
                                        <DialogTrigger asChild>
                                            <div role="button">
                                                <div className="flex items-start justify-between gap-2">
                                                    <div className="flex flex-col gap-1">
                                                        <p className="m-0 flex-1 font-medium text-sm">
                                                            {/* {feature.name} */}
                                                            {user.name}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        {user && (
                                                            <Avatar className="h-4 w-4 shrink-0">
                                                                <AvatarImage
                                                                    src={
                                                                        user.image
                                                                    }
                                                                />
                                                                <AvatarFallback>
                                                                    {user.name?.slice(
                                                                        0,
                                                                        2
                                                                    )}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                        )}
                                                    </div>
                                                </div>
                                                <p className="m-0 text-xs">
                                                    {user.remarks}
                                                </p>
                                            </div>
                                        </DialogTrigger>

                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>
                                                    <div className="flex items-center gap-2">
                                                        {user && (
                                                            <Avatar className="h-8 w-8">
                                                                <AvatarImage
                                                                    src={
                                                                        user.image
                                                                    }
                                                                />
                                                                <AvatarFallback>
                                                                    {user.name?.slice(
                                                                        0,
                                                                        2
                                                                    )}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                        )}
                                                        <div>
                                                            <p className="m-0 font-medium">
                                                                {user?.name}
                                                            </p>
                                                            <p className="m-0 text-xs text-muted-foreground">
                                                                {column.name}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </DialogTitle>
                                                <DialogDescription>
                                                    Remarks: {user.remarks}
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DataTable
                                                columns={columns}
                                                data={tableData}
                                            />
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
                )
            }
        </KanbanProvider>
    );
}
