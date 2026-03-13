import Image from "next/image";

export default function PublicFooter() {


    return (
        <footer className="w-full h-20 lg:h-40 justify-between flex items-center p-1">
            <Image
                src={"/images/bird-down.webp"}
                alt={"flower"}
                width={200} height={200}
                className="absolute w-auto h-80 bottom-0 right-0 -scale-x-100"
            />
            <Image
                src={"/images/bird-down.webp"}
                alt={"flower"}
                width={200} height={200}
                className="absolute w-auto h-80 bottom-0 left-0"
            />
        </footer>
    )
}
