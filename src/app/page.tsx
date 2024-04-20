import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <p className="flex w-full justify-center  from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          at 10:00:00 AM EDT on 04-21-2024, connect virtually with one other student on dartmouth&apos;s campus. 60 seconds. zero stakes.
        </p>
        <a className="text-blue-500 underline" href="https://airtable.com/appHwqkYW9y7HPKoQ/pag3mTpSXQ7122Nwt/form">lol why not</a>
      </div>
    </main>
  );
}
