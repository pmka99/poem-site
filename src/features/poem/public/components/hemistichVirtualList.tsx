"use client";

import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { HemistichResponse } from "@/shared/types/hemistich.type";
import HemistichItem from "./hemistichItem";
import VerseLayout2 from "./verseLayout/2";
import VerseLayout4 from "./verseLayout/4";
import VerseLayout5 from "./verseLayout/5";
import { useReaderSetting } from "@/hooks";
import { TFontSize } from "@/contexts/readerSettingContext";

type Props = {
    hemistichs: HemistichResponse[][],
    averageLengthText: number;
    layout: number;
}

function calculateHeightSmall(windowWidth: number, layout: number) {
    let height = 60;
    switch (layout) {
        case 2:
            if (windowWidth >= 1520) {
                height = 60;
            } else if (windowWidth >= 768) {
                height = 128;
            } else if (windowWidth >= 430) {
                height = 128;
            } else if (windowWidth >= 350) {
                height = 120;
            } else {
                height = 112;
            }
            break;

        case 4:
            if (windowWidth >= 1520) {
                height = 136;
            } else if (windowWidth >= 768) {
                height = 272;
            } else if (windowWidth >= 430) {
                height = 272;
            } else if (windowWidth >= 350) {
                height = 256;
            } else {
                height = 240;
            }
            break;

        case 5:
            if (windowWidth >= 1520) {
                height = 196;
            } else if (windowWidth >= 768) {
                height = 332;
            } else if (windowWidth >= 430) {
                height = 332;
            } else if (windowWidth >= 350) {
                height = 312;
            } else {
                height = 292;
            }
            break;
    }



    return height;
}

function calculateHeightMedium(windowWidth: number, layout: number) {
    let height = 60;
    switch (layout) {
        case 2:
            if (windowWidth >= 1520) {
                height = 71;
            } else if (windowWidth >= 768) {
                height = 143;
            } else if (windowWidth >= 430) {
                height = 136;
            } else if (windowWidth >= 350) {
                height = 136;
            } else {
                height = 128;
            }
            break;

        case 4:
            if (windowWidth >= 1520) {
                height = 168;
            } else if (windowWidth >= 768) {
                height = 321;
            } else if (windowWidth >= 430) {
                height = 304;
            } else if (windowWidth >= 350) {
                height = 304;
            } else {
                height = 288;
            }
            break;

        case 5:
            if (windowWidth >= 1520) {
                height = 239;
            } else if (windowWidth >= 768) {
                height = 392;
            } else if (windowWidth >= 430) {
                height = 372;
            } else if (windowWidth >= 350) {
                height = 372;
            } else {
                height = 352;
            }
            break;
    }



    return height;
}

function calculateHeightLarge(windowWidth: number, layout: number) {
    let height = 60;
    switch (layout) {
        case 2:
            if (windowWidth >= 1520) {
                height = 96;
            } else if (windowWidth >= 768) {
                height = 160;
            } else if (windowWidth >= 430) {
                height = 151;
            } else if (windowWidth >= 350) {
                height = 144;
            } else {
                height = 144;
            }
            break;

        case 4:
            if (windowWidth >= 1520) {
                height = 216;
            } else if (windowWidth >= 768) {
                height = 424;
            } else if (windowWidth >= 430) {
                height = 408;
            } else if (windowWidth >= 350) {
                height = 392;
            } else {
                height = 392;
            }
            break;

        case 5:
            if (windowWidth >= 1520) {
                height = 304;
            } else if (windowWidth >= 768) {
                height = 516;
            } else if (windowWidth >= 430) {
                height = 496;
            } else if (windowWidth >= 350) {
                height = 476;
            } else {
                height = 476;
            }
            break;
    }



    return height;
}

function calculateHeight(windowWidth: number, layout: number, fontSize: TFontSize) {
    let height = 60;
    switch (fontSize) {
        case "small":
            height = calculateHeightSmall(windowWidth, layout)
            break;

        case "medium":
            height = calculateHeightMedium(windowWidth, layout)
            break;

        case "large":
            height = calculateHeightLarge(windowWidth, layout)
            break;
    }

    return height;
}

export default function HemistichVirtualList({ hemistichs, averageLengthText, layout }: Props) {

    const { fontSize } = useReaderSetting();

    const heightOfItem = calculateHeight(window.innerWidth, layout, fontSize)

    const parentRef = useRef<HTMLDivElement>(null);

    const rowVirtualizer = useVirtualizer({
        count: hemistichs.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => heightOfItem,
        overscan: 10,
    });

    return (
        <div
            ref={parentRef}
        // className="h-150 overflow-auto"
        >
            <div
                style={{
                    height: rowVirtualizer.getTotalSize(),
                    position: "relative",
                }}
            >
                {rowVirtualizer.getVirtualItems().map((virtualRow) => {

                    const hemistich = hemistichs[virtualRow.index];

                    return (
                        <div
                            key={"verses-" + hemistich[0]._id}
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                transform: `translateY(${virtualRow.start}px)`,
                            }}
                        >
                            <div className="flex flex-col px-2 overflow-hidden">
                                {
                                    layout === 2
                                        ? <VerseLayout2 fontSize={fontSize} hemistichs={hemistich as any} averageLengthText={averageLengthText} />
                                        : layout === 4 ? <VerseLayout4 fontSize={fontSize} hemistichs={hemistich as any} averageLengthText={averageLengthText} />
                                            : layout === 5 ? <VerseLayout5 fontSize={fontSize} hemistichs={hemistich as any} averageLengthText={averageLengthText} />
                                                : <></>
                                }
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
