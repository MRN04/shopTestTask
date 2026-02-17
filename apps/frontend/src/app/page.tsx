"use client";

import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "@/store/counterSlice";
import { RootState } from "@/store";

export default function Home() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Inforce Test Task
        </h1>
        <div className="flex flex-col items-center gap-4 p-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h2 className="text-2xl font-semibold">Redux Counter Example</h2>
          <div className="text-6xl font-bold">{count}</div>
          <div className="flex gap-4">
            <button
              onClick={() => dispatch(decrement())}
              className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
            >
              Decrement
            </button>
            <button
              onClick={() => dispatch(increment())}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
            >
              Increment
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
