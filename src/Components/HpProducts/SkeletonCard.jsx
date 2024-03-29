import { Skeleton } from "../ui/skeleton"

export function SkeletonCard() {
  return (
    <div className="">
      <Skeleton className="w-12 h-12 bg-slate-300 rounded-full" />
      <Skeleton className="h-6 flex-grow bg-slate-300  " />
      <h3> </h3>
      <Skeleton className="h-4 flex-grow mt-4" />

      <Skeleton className="h-4 flex-grow mt-4" />

      <Skeleton className="h-4 flex-grow mt-4" />

    </div>
  )
}