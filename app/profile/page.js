"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }

    if (session) {
      fetch("/api/snippets")
        .then((res) => res.json())
        .then((data) => setSnippets(data));
    }
  }, [status, router, session]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>Loading...</p>
      </div>
    );
  }

  if (session) {
    return (
      <div className="min-h-screen bg-background text-foreground py-10">
        <div className="container mx-auto px-4">
          <div className="glass rounded-lg shadow-lg p-8 mb-8 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <img
              src={
                session.user.image ||
                `https://ui-avatars.com/api/?name=${session.user.name || session.user.email}`
              }
              alt="Profile Picture"
              className="w-32 h-32 rounded-full border-4 border-primary object-cover"
            />
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold text-primary-foreground mb-2">
                {session.user.name || session.user.email}
              </h1>
              <p className="text-muted-foreground text-lg mb-4">
                Welcome to your personalized dashboard!
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <Link
                  href="/editor"
                  className="px-6 py-3 btn-primary rounded-lg shadow-md transition duration-300"
                >
                  Create New Snippet
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-300 focus-ring"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass rounded-lg shadow-lg p-6 card-hover">
              <h2 className="text-2xl font-bold text-primary-foreground mb-4">
                My Snippets
              </h2>
              {snippets.length > 0 ? (
                <div className="space-y-4">
                  {snippets.map((snippet) => (
                    <div
                      key={snippet.id}
                      className="bg-secondary p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300"
                    >
                      <h3 className="text-xl font-semibold text-accent">
                        {snippet.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Language: {snippet.language_id}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        Created:{" "}
                        {new Date(snippet.createdAt).toLocaleDateString()}
                      </p>
                      {/* Add more snippet details or actions here */}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  You haven't saved any snippets yet. Start by creating one!
                </p>
              )}
            </div>

            <div className="glass rounded-lg shadow-lg p-6 card-hover">
              <h2 className="text-2xl font-bold text-primary-foreground mb-4">
                Account Settings
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Manage your profile information, password, and preferences.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Link href="/profile/edit" className="w-full px-4 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-muted transition duration-300 text-center font-semibold focus-ring">
                                    Edit Profile
                                </Link>
                                <Link href="/profile/change-password" className="w-full px-4 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-muted transition duration-300 text-center font-semibold focus-ring">
                                    Change Password
                                </Link>
                                <Link href="/profile/notifications" className="w-full px-4 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-muted transition duration-300 text-center font-semibold focus-ring">
                                    Notification Settings
                                </Link>
                </div>
              </div>
            </div>

            <div className="glass rounded-lg shadow-lg p-6 card-hover">
              <h2 className="text-2xl font-bold text-primary-foreground mb-4">
                Integrations
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Connect with other services to enhance your coding experience.
                </p>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <Link
                  href="/profile/integrations/github"
                  className="w-full px-4 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-muted transition duration-300 text-center font-semibold focus-ring"
                >
                  Connect GitHub
                </Link>
                <Link
                  href="/profile/integrations/vscode"
                  className="w-full px-4 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-muted transition duration-300 text-center font-semibold focus-ring"
                >
                  Link VS Code
                </Link>
               </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
