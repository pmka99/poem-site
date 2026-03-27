import PoemListView from "@/features/poem/public/views/poemsList";

interface PageProps {
    params: Promise<{
        slug: string[];
    }>;
    searchParams: Promise<{
        [key: string]: string | string[] | undefined;
    }>;
}

export default async function PoemListPage({ searchParams }: PageProps) {

    return (
        <PoemListView searchParams={searchParams} />
    )
}
