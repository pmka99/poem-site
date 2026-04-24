import { cookies } from "next/headers";
import PaginationHemistichView from "./paginitaion";
import InfiniteHemistichView from "./infinitScroll";
import { poemService } from "@/features/poem/public/services";

type Props = {
    params: Promise<{
        poemId: string;
    }>;
    searchParams: Promise<{
        [key: string]: string | string[] | undefined;
    }>;
}


export default async function PoemView({ params, searchParams }: Props) {

    const cookieStore = await cookies();
    const readTypeMode = cookieStore.get("read-type")?.value ?? "pagination";

    const poemId = (await params).poemId;

    const poem = await poemService.getById(poemId);

    return (
        <div className="flex w-full lg:my-32 mb-16 flex-col py-5 bg-background/0">

            <div className="flex lg:w-1/3 mx-auto text-2xl rounded-xl h-16 p-6 text-primary-foreground items-center justify-center">
                <span>
                    {poem.data?.title}
                </span>
            </div>

            {readTypeMode === "pagination" ? (
                <PaginationHemistichView searchParams={searchParams} poemId={poemId} />
            ) : (
                <InfiniteHemistichView poemId={poemId} />
            )}
        </div>
    )
}