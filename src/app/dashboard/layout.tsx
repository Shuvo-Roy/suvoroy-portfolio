import LeftSidebar from "@/components/dashboard-components/left-sidebar";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { ClerkProvider, SignIn, SignInButton } from "@clerk/nextjs";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();

  if (!user) {
    // Not signed in: Show SignInButton directly (no redirect)
    return (
      <ClerkProvider>
      <div className="min-h-screen flex flex-col items-center justify-center text-center gap-4">
        <h1 className="text-2xl font-semibold">Welcome to your personal dashboard</h1>
        <p className="text-gray-600">Please sign in to continue</p>
        <SignInButton>
          <SignIn>SignIn</SignIn>
        </SignInButton>
      </div></ClerkProvider>
    );
  }

  // If signed in, check if the user exists in the DB
  const existingUser = await prisma.user.findUnique({
    where: { clerkUserId: user.id },
  });

  // If user doesn't exist, check if it's the first one
  const userCount = await prisma.user.count();

  if (!existingUser) {
    if (userCount > 0) {
      // Someone already signed up before – block new users
      return (
        <ClerkProvider>
        <div className="min-h-screen flex flex-col items-center justify-center text-center gap-4">
          <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
          <p className="text-gray-600">Only one user is allowed to access this dashboard.</p>
        </div></ClerkProvider>
      );
    }

    // First user: Create user in DB
    await prisma.user.create({
      data: {
        clerkUserId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: user.firstName || "Unnamed",
        imageUrl: user.imageUrl || "",
      },
    });
  }

  // User is signed in and in the DB: show dashboard
  return (
    <ClerkProvider>
    <div className="min-h-screen w-full flex">
      <LeftSidebar />
      <main className="flex-1">{children}</main>
    </div></ClerkProvider>
  );
};

export default DashboardLayout;
