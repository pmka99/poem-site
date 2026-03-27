import { poemService } from "../services"

export function PoemInfoBox({ poemId }: { poemId: string }) {

    const poem = poemService.getById(poemId)

    return (
        <div>

        </div>
    )
}