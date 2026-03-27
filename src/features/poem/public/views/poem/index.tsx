import { poemService } from "@/features/poem/public/services";
import { cookies } from "next/headers";
import PaginationHemistichView from "./paginitaion";
import InfiniteHemistichView from "./infinitScroll";

type Props = {
    params: Promise<{
        poemId: string;
    }>;
    searchParams: Promise<{
        [key: string]: string | string[] | undefined;
    }>;
}



export default async function PoemView({ searchParams, params }: Props) {

    const cookieStore = await cookies();
    const readTypeMode = cookieStore.get("read-type")?.value;

    const poemId = (await params).poemId;


    return (
        <div className="flex w-full py-20 flex-col bg-background/20">

            {readTypeMode === "pagination" ? (
                <PaginationHemistichView poemId={poemId}  />
            ) : (
                <InfiniteHemistichView />
            )}

        </div>
    )
}