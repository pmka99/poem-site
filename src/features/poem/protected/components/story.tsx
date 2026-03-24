import { Button, TextField } from "@mui/material";
import { useState } from "react";

type Props = {
    story: string[],
    onChangeStory: (story: string[]) => void;
}

export default function StoryBox({ story, onChangeStory }: Props) {

    const [paragraph, setParagraph] = useState<string>("")

    const addToStories = () => {
        onChangeStory([...story, paragraph])
        setParagraph("")
    }

    return (
        <div className="flex flex-col gap-1 w-full">
            <div className="text-foreground">
                <p> داستان شعر </p>
                <hr className="text-border" />
            </div>
            <div className="max-h-80 overflow-y-auto">
                {
                    story.map(item => (
                        <p>
                            {item}
                        </p>
                    ))
                }
            </div>
            <div className="flex gap-1">
                <TextField className="w-5/6" size="small" multiline rows={3} onChange={(event) => setParagraph(event.target.value)} value={paragraph} />
                <Button variant="contained" onClick={addToStories} >افزودن</Button>
            </div>
        </div>
    )
}