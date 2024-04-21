import Image from "next/image";
import { signIn } from "next-auth/react";

export default async function Home() {
  return (
    <>
      <div className="flex flex-col z-10 w-full max-w-5xl items-center justify-between font-mono text-sm backdrop-blur-2xl">
        <p className="flex w-full justify-center  from-gray-200 pb-6 pt-8 dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          at 10:00:00 AM EDT on 04-21-2024, connect virtually with one other
          student on dartmouth&apos;s campus. 60 seconds. zero stakes.
        </p>
        <span className="font-bold">log in to sign up.</span>
      </div>
    </>
  );
}
