import PoemView from "@/features/poem/public/views/poem";

interface PageProps {
    params: Promise<{
        poemId: string;
    }>;
    searchParams: Promise<{
        [key: string]: string | string[] | undefined;
    }>;
}

export default async function PoemPage({ searchParams, params }: PageProps) {

    return (
        <PoemView searchParams={searchParams} params={params} />
    )
}
