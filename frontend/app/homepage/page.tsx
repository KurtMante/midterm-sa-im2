import { auth } from "@/lib/auth";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Link from "next/link";

export default async function HomePage() {
  const session = await auth();

  const cookieStore = cookies() as any;
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

  if (!session?.user && !jwtUser) {
    return (
      <p className="text-center mt-10 text-red-500 text-lg font-semibold">
        Not authenticated
      </p>
    );
  }

  return (
    <div className="mx-auto mt-10 max-w-3xl space-y-6 px-4">
      {/* Section for JWT user */}
      {jwtUser && (
        <div className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-2xl p-6 text-black shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
              <p className="text-lg font-medium">
                {jwtUser.firstname}{" "}
                {jwtUser.middlename && (
                  <span className="text-teal-200">{jwtUser.middlename}</span>
                )}{" "}
                {jwtUser.lastname}
              </p>
              <p className="text-sm mt-1 text-teal-100">{jwtUser.email}</p>
            </div>
            <div>
              <img
                className="rounded-full w-20 h-20 object-cover border-2 border-white shadow-md"
                src="/default-avatar.png"
                alt="profile"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-2">
            <Link
              href="/profile_management"
              className="bg-white text-teal-800 text-sm px-4 py-2 rounded-lg font-semibold shadow hover:bg-teal-100 transition"
            >
              Profile Management
            </Link>
            <Link
              href="/change_password"
              className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg font-semibold shadow transition"
            >
              Change Password
            </Link>
          </div>
        </div>
      )}

      {/* Section for AuthJS session user */}
      {session?.user && (
        <div className="bg-teal-700 rounded-2xl p-6 text-white shadow-xl flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold mb-2">Session Info (Auth.js)</h2>
            <p className="text-lg font-medium">{session.user.name}</p>
            <p className="text-sm text-teal-100">{session.user.email}</p>
          </div>
          <div>
            <img
              className="rounded-full w-20 h-20 object-cover border-2 border-white shadow"
              src={session.user.image || "/default-avatar.png"}
              alt="profile"
            />
          </div>
        </div>
      )}
    </div>
  );
}
