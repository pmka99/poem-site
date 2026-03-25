// "use client";

// import { useRef } from "react";
// import { useVirtualizer } from "@tanstack/react-virtual";
// import { HemistichResponse } from "@/shared/types/hemistich.type";
// import HemistichItem from "./HemistichItem";

// type Props = {
//     hemistichs: HemistichResponse[];

//     onEdit?: (id: string) => void;
//     onDelete?: (id: string) => void;
//     onAddBefore?: (id: string) => void;
//     onAddAfter?: (id: string) => void;
// };

// export default function HemistichVirtualList({
//     hemistichs,
//     onEdit,
//     onDelete,
//     onAddBefore,
//     onAddAfter,
// }: Props) {

//     const parentRef = useRef<HTMLDivElement>(null);

//     const rowVirtualizer = useVirtualizer({
//         count: hemistichs.length,
//         getScrollElement: () => parentRef.current,
//         estimateSize: () => 60,
//         overscan: 10,
//     });

//     return (
//         <div
//             ref={parentRef}
//             className="h-[600px] overflow-auto"
//         >
//             <div
//                 style={{
//                     height: rowVirtualizer.getTotalSize(),
//                     position: "relative",
//                 }}
//             >
//                 {rowVirtualizer.getVirtualItems().map((virtualRow) => {

//                     const hemistich = hemistichs[virtualRow.index];

//                     return (
//                         <div
//                             key={hemistich._id}
//                             style={{
//                                 position: "absolute",
//                                 top: 0,
//                                 left: 0,
//                                 width: "100%",
//                                 transform: `translateY(${virtualRow.start}px)`,
//                             }}
//                         >
//                             <HemistichItem
//                                 hemistich={hemistich}
//                                 onEdit={onEdit}
//                                 onDelete={onDelete}
//                                 onAddBefore={onAddBefore}
//                                 onAddAfter={onAddAfter}
//                             />
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// }
