export default function Home() {
  return (
    <main>
      대시보드임
    </main>
  );
}

/* Redux 사용할 때 아래 주석에서 코드 가져갈 것 */
// "use client";
// import { decrement, increment, reset } from "../redux/features/counter/counterSlice";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks";

// export default function Home() {
//   const count = useAppSelector((state) => state.counterReducer.value);
//   const dispatch = useAppDispatch();

//   return (
//     <main style={{ maxWidth: 1200, marginInline: "auto", padding: 20 }}>
//       <div style={{ marginBottom: "4rem", textAlign: "center" }}>
//         <h4 style={{ marginBottom: 16 }}>{count}</h4>
//         <button onClick={() => dispatch(increment())}>increment</button>
//         <button
//           onClick={() => dispatch(decrement())}
//           style={{ marginInline: 16 }}
//         >
//           decrement
//         </button>
//         <button onClick={() => dispatch(reset())}>reset</button>
//       </div>
//     </main>
//   );
// }
