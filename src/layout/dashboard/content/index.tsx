


export default function DashboardContent({ title, children }: { title: string, children: React.ReactNode }) {



    return (
        <div className="w-full overflow-hidden max-h-[calc(100vh-1rem)] flex flex-col bg-background/90 backdrop-blur p-4 rounded ">
            <h2 className="text-3xl">{title}</h2>

            <div className="overflow-y-auto">
                {children}
            </div>
        </div>
    )
}