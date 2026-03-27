import { poemService } from "@/features/poem/public/services";
import ListFilter from "./filter";
import Link from "next/link";
import { PoemTypeResponse } from "@/shared/types/poemType.type";
import { CategoryResponse } from "@/shared/types/category.type";
import PaginationSection from "./paginiation";

type Props = {
    searchParams: Promise<{
        [key: string]: string | string[] | undefined;
    }>
}

export default async function PoemListView({ searchParams }: Props) {

    console.log(await searchParams);

    const poems = await poemService.getAll(searchParams)

    return (
        <div className="flex w-full p-4 flex-col bg-background/20">
            <ListFilter />

            <hr />

            <div className="flex w-full flex-col gap-4 p-5 h-96 lg:h-140">
                {
                    poems.success &&
                    poems.data?.map(poem =>
                        <Link key={poem._id} className="hover:text-primary-foreground" href={`/poem/${poem._id}`}>
                            {poem.title} - {(poem?.poemType as PoemTypeResponse).name} - {(poem.category as CategoryResponse).title}
                        </Link>
                    )
                }
            </div>

            <hr />
            <PaginationSection totalPages={poems.meta?.totalPage as number} />

        </div>
    )
}