import { auth } from "@/lib/auth";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Signout from "./Signout";
import LogoutBtn from "./LogoutBtn";

const Navbar = async () => {
  const session = await auth();

  const cookieStore = await cookies(); 
  const token = cookieStore.get("token")?.value;

  let jwtUser: any = null;
  if (token) {
    try {
      const decoded: any = jwt.verify(token, "secret-key");
      jwtUser = decoded.user;
      console.log("homepage", jwtUser);
    } catch (error) {
      console.error("JWT decode failed:", error);
    }
  }

  return (
    <div className="bg-slate-950 p-6 text-slate-50 flex justify-end gap-4">
      {jwtUser && <LogoutBtn />}
      {session?.user && <Signout />}
    </div>
  );
};

export default Navbar;
