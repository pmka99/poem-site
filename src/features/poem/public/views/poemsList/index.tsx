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

    const querySearchParams = await searchParams;

    const poems = await poemService.getAll({ ...querySearchParams })

    return (
        <div className="flex w-full p-4 flex-col">

            <div className="flex lg:w-1/3 mx-auto text-2xl rounded-xl h-16 p-6 text-primary-foreground items-center justify-center">
                <span>
                    فهرست
                </span>
            </div>
            <br></br>

            <hr className="border-primary lg:mx-80" />

            <ListFilter />

            <hr className="border-primary lg:mx-80" />

            <div className="w-full p-5 lg:h-140">
                <div className="grid w-full items-start lg:grid-cols-5 h-fit gap-4 ">
                    {
                        poems.success &&
                        poems.data?.map(poem =>
                            <Link key={poem._id}
                                className="flex self-start h-28 rounded-md hover:shadow-2xl shadow-primary gap-4 text-center flex-col bg-primary-foreground  p-5 text-muted hover:text-primary-foreground hover:bg-primary" href={`/poem/${poem._id}`}>
                                <div className="txt-4xl text-">{poem.title}</div>
                                <div className="txt-xl">
                                    {(poem?.poemType as PoemTypeResponse).name}
                                    -
                                    {(poem.category as CategoryResponse).title}
                                </div>
                            </Link>
                        )
                    }
                </div>
                
            </div>

            <hr className="border-primary lg:mx-80" />

            <PaginationSection totalPages={poems.meta?.totalPage as number} />

        </div>
    )
}