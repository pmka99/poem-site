// "use client";

// import { useEffect, useRef } from "react";

// type Props = {
//   onLoadMore: () => void;
//   disabled?: boolean;
// };

// export default function InfiniteScrollTrigger({
//   onLoadMore,
//   disabled = false,
// }: Props) {
//   const ref = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     if (disabled) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting) {
//           onLoadMore();
//         }
//       },
//       {
//         rootMargin: "200px",
//       }
//     );

//     const el = ref.current;

//     if (el) observer.observe(el);

//     return () => {
//       if (el) observer.unobserve(el);
//     };
//   }, [onLoadMore, disabled]);

//   return <div ref={ref} style={{ height: 1 }} />;
// }
