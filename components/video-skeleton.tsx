import { Skeleton } from "./ui/skeleton";

export function VideoGridSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-3">
                    <Skeleton className="w-full aspect-video rounded-xl bg-zinc-800/50" />
                    <div className="flex items-start gap-2.5">
                        <Skeleton className="w-7 h-7 rounded-full shrink-0 bg-zinc-800/50" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-3.5 w-3/4 rounded-md bg-zinc-800/50" />
                            <Skeleton className="h-3 w-1/2 rounded-md bg-zinc-800/50" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}