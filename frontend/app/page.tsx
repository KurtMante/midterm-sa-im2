import GoogleSignin from "@/components/GoogleSignin";
import LoginForm from "@/components/LoginForm";
import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  console.log("homepage", session);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 to-teal-200 p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <LoginForm />

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-1 border-teal-300" />
          <span className="px-3 text-sm text-teal-600">OR</span>
          <hr className="flex-1 border-teal-300" />
        </div>

        {/* Google Signin */}
        <GoogleSignin />

        {/* Register Link */}
        <div className="flex justify-center mt-4">
          <Link
            href={"/register"}
            className="text-xs text-teal-600 hover:underline"
          >
            Don’t have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
}
