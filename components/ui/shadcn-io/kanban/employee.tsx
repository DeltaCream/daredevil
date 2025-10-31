"use client";

import type {
    Announcements,
    DndContextProps,
    DragEndEvent,
    DragOverEvent,
    DragStartEvent,
} from "@dnd-kit/core";
import {
    closestCenter,
    DndContext,
    DragOverlay,
    KeyboardSensor,
    MouseSensor,
    PointerSensor,
    TouchSensor,
    useDroppable,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
    createContext,
    type HTMLAttributes,
    type ReactNode,
    useContext,
    useRef,
    useState,
} from "react";
import { createPortal } from "react-dom";
import tunnel from "tunnel-rat";
import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const t = tunnel();

export type { DragEndEvent } from "@dnd-kit/core";

type KanbanItemProps = {
    id: string;
    name: string;
    column: string;
} & Record<string, unknown>;

type KanbanColumnProps = {
    id: string;
    name: string;
} & Record<string, unknown>;

type KanbanContextProps<
    T extends KanbanItemProps = KanbanItemProps,
    C extends KanbanColumnProps = KanbanColumnProps
> = {
    columns: C[];
    data: T[];
    activeCardId: string | null;
};

const KanbanContext = createContext<KanbanContextProps>({
    columns: [],
    data: [],
    activeCardId: null,
});

export type KanbanBoardProps = {
    id: string;
    children: ReactNode;
    className?: string;
};

export const KanbanBoard = ({ id, children, className }: KanbanBoardProps) => {
    const { isOver, setNodeRef } = useDroppable({
        id,
    });

    return (
        <div
            className={cn(
                "flex size-full min-h-40 flex-col divide-y overflow-hidden rounded-md border bg-secondary text-xs shadow-sm ring-2 transition-all",
                isOver ? "ring-primary" : "ring-transparent",
                className
            )}
            ref={setNodeRef}
        >
            {children}
        </div>
    );
};

export type KanbanCardProps<T extends KanbanItemProps = KanbanItemProps> = T & {
    children?: ReactNode;
    className?: string;
    dialogOpen?: boolean;
};

export const KanbanCard = <T extends KanbanItemProps = KanbanItemProps>({
    id,
    name,
    children,
    className,
    dialogOpen,
}: KanbanCardProps<T>) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transition,
        transform,
        isDragging,
    } = useSortable({
        id,
        disabled: dialogOpen,
    });
    const { activeCardId } = useContext(KanbanContext) as KanbanContextProps;

    const [isPointerDown, setIsPointerDown] = useState(false);

    const pointerDownPos = useRef<{ x: number; y: number } | null>(null);

    // Handle pointer down/up for "clicking" vs "dragging"
    const handlePointerDown = () => setIsPointerDown(true);
    const handlePointerUp = () => {
        setIsPointerDown(false);
        // const down = pointerDownPos.current;
        // pointerDownPos.current = null;
        // const moved = down
        //     ? Math.hypot(e.clientX - down.x, e.clientY - down.y)
        //     : 0;
        // const CLICK_THRESHOLD = 6; // px
        // // open dialog only if not dragging and movement < threshold
        // if (!isDragging && moved < CLICK_THRESHOLD) {
        //     openDialog();
        // }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        // Allow Enter or Space to open dialog (only if not dragging)
        if ((!isDragging && e.key === "Enter") || e.key === " ") {
            e.preventDefault();
            onclick;
        }
    };

    const composedListeners = {
        ...listeners,
        onKeyDown: (e: React.KeyboardEvent) => {
            handleKeyDown(e);
            // Also preserve dnd-kit keyboard listener if present
            (listeners as any).onKeyDown?.(e);
        },
    };

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    // console.log("isDragging", isDragging); //only triggers when the draggable is being moved
    // console.log("isSorting", isSorting);

    return (
        <>
            <div
                style={style}
                {...composedListeners} //used composedListeners instead of listeners
                {...attributes}
                ref={setNodeRef}
                tabIndex={0} // focusable for keyboard open
                onKeyDown={handleKeyDown}
                onPointerDown={handlePointerDown}
                onPointerOver={handlePointerUp}
                onPointerCancel={handlePointerUp}
            >
                {/* sortable item card in its list position */}
                <Card
                    className={cn(
                        // "cursor-grab gap-4 rounded-md p-3 shadow-sm",
                        // isDragging &&
                        //     "pointer-events-none cursor-grabbing opacity-30",
                        "gap-4 rounded-md p-3 shadow-sm select-none transition-colors",
                        // Handle cursor state logic:
                        // - if isDragging, set cursor to "grabbing" and opacity to 30%
                        // - if isPointerDown, set cursor to "grab"
                        // - otherwise, set cursor to "pointer"
                        isDragging //if dragging, automatically set cursor to "grabbing"
                            ? "cursor-grabbing opacity-30 pointer-events-none"
                            : isPointerDown //if pointer is not dragging, check if pointer is held down. If it is, set cursor to "grab", else set to "pointer"
                            ? "cursor-grab"
                            : "hover:cursor-pointer cursor-pointer",
                        className
                    )}
                >
                    {/* <div className="cursor-pointer"> */}
                    {children ?? (
                        <p className="m-0 font-medium text-sm">{name}</p>
                    )}
                    {/* </div> */}
                </Card>
            </div>

            {/* duplicate overlay card that appears only while dragging */}
            {activeCardId === id && (
                <t.In>
                    <Card
                        className={cn(
                            // "cursor-grab gap-4 rounded-md p-3 shadow-sm ring-2 ring-primary",
                            // isDragging && "cursor-grabbing",
                            "gap-4 rounded-md p-3 shadow-sm ring-2 ring-primary",
                            isDragging && "cursor-grabbing",
                            className
                        )}
                    >
                        {children ?? (
                            <p className="m-0 font-medium text-sm">{name}</p>
                        )}
                    </Card>
                </t.In>
            )}
        </>
    );
};

export type KanbanCardsProps<T extends KanbanItemProps = KanbanItemProps> =
    Omit<HTMLAttributes<HTMLDivElement>, "children" | "id"> & {
        children: (item: T) => ReactNode;
        id: string;
    };

export const KanbanCards = <T extends KanbanItemProps = KanbanItemProps>({
    children,
    className,
    ...props
}: KanbanCardsProps<T>) => {
    const { data } = useContext(KanbanContext) as KanbanContextProps<T>;
    const filteredData = data.filter((item) => item.column === props.id);
    const items = filteredData.map((item) => item.id);

    return (
        <ScrollArea className="overflow-hidden">
            <SortableContext items={items}>
                <div
                    className={cn(
                        "flex flex-grow flex-col gap-2 p-2",
                        className
                    )}
                    {...props}
                >
                    {filteredData.map(children)}
                </div>
            </SortableContext>
            <ScrollBar orientation="vertical" />
        </ScrollArea>
    );
};

export type KanbanHeaderProps = HTMLAttributes<HTMLDivElement>;

export const KanbanHeader = ({ className, ...props }: KanbanHeaderProps) => (
    <div
        className={cn("m-0 p-2 font-semibold text-sm", className)}
        {...props}
    />
);

export type KanbanProviderProps<
    T extends KanbanItemProps = KanbanItemProps,
    C extends KanbanColumnProps = KanbanColumnProps
> = Omit<DndContextProps, "children"> & {
    children: (column: C) => ReactNode;
    className?: string;
    columns: C[];
    data: T[];
    onDataChange?: (data: T[]) => void;
    onDragStart?: (event: DragStartEvent) => void;
    onDragEnd?: (event: DragEndEvent) => void;
    onDragOver?: (event: DragOverEvent) => void;
};

export const KanbanProvider = <
    T extends KanbanItemProps = KanbanItemProps,
    C extends KanbanColumnProps = KanbanColumnProps
>({
    children,
    onDragStart,
    onDragEnd,
    onDragOver,
    className,
    columns,
    data,
    onDataChange,
    ...props
}: KanbanProviderProps<T, C>) => {
    const [activeCardId, setActiveCardId] = useState<string | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor)
    );

    const handleDragStart = (event: DragStartEvent) => {
        const card = data.find((item) => item.id === event.active.id);
        if (card) {
            setActiveCardId(event.active.id as string);
        }
        onDragStart?.(event);
    };

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;

        if (!over) {
            return;
        }

        const activeItem = data.find((item) => item.id === active.id);
        const overItem = data.find((item) => item.id === over.id);

        if (!activeItem) {
            return;
        }

        const activeColumn = activeItem.column;
        const overColumn =
            overItem?.column ||
            columns.find((col) => col.id === over.id)?.id ||
            columns[0]?.id;

        if (activeColumn !== overColumn) {
            let newData = [...data];
            const activeIndex = newData.findIndex(
                (item) => item.id === active.id
            );
            const overIndex = newData.findIndex((item) => item.id === over.id);

            newData[activeIndex].column = overColumn;
            newData = arrayMove(newData, activeIndex, overIndex);

            onDataChange?.(newData);
        }

        onDragOver?.(event);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        setActiveCardId(null);

        onDragEnd?.(event);

        const { active, over } = event;

        if (!over || active.id === over.id) {
            return;
        }

        let newData = [...data];

        const oldIndex = newData.findIndex((item) => item.id === active.id);
        const newIndex = newData.findIndex((item) => item.id === over.id);

        newData = arrayMove(newData, oldIndex, newIndex);

        onDataChange?.(newData);
    };

    const announcements: Announcements = {
        onDragStart({ active }) {
            const { name, column } =
                data.find((item) => item.id === active.id) ?? {};

            return `Picked up the card "${name}" from the "${column}" column`;
        },
        onDragOver({ active, over }) {
            const { name } = data.find((item) => item.id === active.id) ?? {};
            const newColumn = columns.find(
                (column) => column.id === over?.id
            )?.name;

            return `Dragged the card "${name}" over the "${newColumn}" column`;
        },
        onDragEnd({ active, over }) {
            const { name } = data.find((item) => item.id === active.id) ?? {};
            const newColumn = columns.find(
                (column) => column.id === over?.id
            )?.name;

            return `Dropped the card "${name}" into the "${newColumn}" column`;
        },
        onDragCancel({ active }) {
            const { name } = data.find((item) => item.id === active.id) ?? {};

            return `Cancelled dragging the card "${name}"`;
        },
    };

    return (
        <KanbanContext.Provider value={{ columns, data, activeCardId }}>
            <DndContext
                accessibility={{ announcements }}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDragStart={handleDragStart}
                sensors={sensors}
                {...props}
            >
                <div
                    className={cn(
                        "flex size-full auto-cols-fr grid-flow-col gap-4 px-6",
                        className
                    )}
                >
                    {columns.map((column) => children(column))}
                </div>
                {typeof window !== "undefined" &&
                    createPortal(
                        <DragOverlay>
                            <t.Out />
                        </DragOverlay>,
                        document.body
                    )}
            </DndContext>
        </KanbanContext.Provider>
    );
};
