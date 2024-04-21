import Image from "next/image";
import { signIn } from "@/app/auth"
import { useSession } from "next-auth/react"

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col z-10 w-full max-w-5xl items-center justify-between font-mono text-sm backdrop-blur-2xl">
        <p className="flex w-full justify-center  from-gray-200 pb-6 pt-8 dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          at 10:00:00 AM EDT on 04-21-2024, connect virtually with one other student on dartmouth&apos;s campus. 60 seconds. zero stakes.
        </p>
        <a className="text-blue-500 pb-10 p-4 underline" href="https://airtable.com/appHwqkYW9y7HPKoQ/pag3mTpSXQ7122Nwt/form">lol why not</a>
        <form action={async () => {
          "use server" 
          await signIn("google")
          }}
        >
          <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
Sign In with Dartmouth Google Account
</button>
        </form>
      </div>
    </main>
  );
}
