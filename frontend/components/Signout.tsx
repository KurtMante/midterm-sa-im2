import { signOut } from "@/lib/auth"

const Signout = () => {
  return (
     <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button className="hover:text-yellow-500 transiton" type="submit">Sign Out</button>
    </form>
  )
}

export default Signout