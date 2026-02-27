import Image from "next/image";
import Menu from "../sidebar";

export default function Header() {


  return (
    <>
      <header className="w-full h-20 lg:h-40 justify-between flex items-center p-1">
        <Image
          src={"/images/bird.webp"}
          alt={"flower"}
          width={200} height={200}
          className="absolute w-auto h-80 top-0 right-0 "
          loading="eager"
          fetchPriority="high"
        />
        <Image
          src={"/images/bird.webp"}
          alt={"flower"}
          width={200} height={200}
          className="absolute w-auto h-80 top-0 left-0 -scale-x-100"
          loading="eager"
          fetchPriority="high"
        />
      </header>
    </>
  )
}
