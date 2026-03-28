import { IoMenu } from "react-icons/io5";


export default function PublicHeader({
    isOpenDrawer, setIsOpenDrawer
}: { isOpenDrawer: boolean, setIsOpenDrawer: (isOpenDrawer: boolean) => void }) {

    return (
        <div className="bg-primary-foreground/0 z-50 w-full">

            <button
                onClick={() => setIsOpenDrawer(true)}
                className={`
                        fixed top-2 right-2 z-50
                        text-2xl
                        hover:text-secondary-foreground hover:bg-secondary
                        text-primary-foreground bg-primary shadow-sm shadow-primary border-border
                        w-fit h-fit flex items-center justify-center
                        cursor-pointer rounded-full my-1 p-2
                        ${isOpenDrawer ? "invisible" : "visible"}    
                        `}
            >
                <IoMenu className="w-8 h-8" />
            </button>
        </div>
    )
}