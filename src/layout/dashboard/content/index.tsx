


export default function DashboardContent({ title, children }: { title: string, children: React.ReactNode }) {



    return (
        <div className="w-full h-[calc(100vh-1rem)] overflow-hidden max-h-[calc(100vh-1rem)] flex flex-col bg-background/90 backdrop-blur p-4 rounded ">
            <div className="h-8">
                <h2 className="text-2xl">{title}</h2>
                <hr className="text-border" />
            </div>

            <div className="overflow-y-hidden grow pt-3">
                {children}
            </div>
        </div>
    )
}