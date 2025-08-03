// "use client";

// import { getUserDetails } from "@/lib/utils/utils";
// import type { User } from "@prisma/client";
// import { useSession } from "next-auth/react";
// import { createContext, useContext, useEffect, useState } from "react";

// export type UserContextValue = {
//   user: User | null;
//   stripeID: string | null;
//   firstName: string | null;
//   lastName: string | null;
//   email: string | null;
//   image: string | null;
// };

// export const UserContext = createContext<UserContextValue>({
//   user: null,
//   stripeID: null,
//   firstName: null,
//   lastName: null,
//   email: null,
//   image: null,
// });

// export const useUser = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error("useUser must be used within a UserProvider");
//   }
//   return context;
// };

// export const UserProvider = ({ children }: { children: React.ReactNode }) => {
//   const { data: session } = useSession();
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       if (session?.user?.id) {
//         const userData = await getUserDetails(session.user.id);
//         setUser(userData);
//       }
//     };
//     fetchUser();
//   }, [session?.user?.id]);

//   const stripeID = user?.stripeCustomerId || null;
//   const firstName = user?.name?.split(" ")[0] || null;
//   const lastName = user?.name?.split(" ")[1] || null;
//   const email = user?.email || null;
//   const image = user?.image || null;

//   return (
//     <UserContext.Provider
//       value={{
//         user,
//         stripeID,
//         firstName,
//         lastName,
//         email,
//         image,
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };
