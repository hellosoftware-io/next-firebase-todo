import SignIn from "components/SignIn";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";

interface UserContextType {
  user?: User;
}

export const UserContext = createContext<UserContextType>({
  user: undefined,
});

interface Props {
  children: React.ReactNode;
}

export default function UserProvider(props: Props): JSX.Element {
  const [user, setUser] = useState<User>(undefined);
  const auth = getAuth();

  useEffect(() => {
    // Create a listener that is triggered every time a Firebase user is signed in and out
    // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#onauthstatechanged
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Auth state changed: logged in");

        setUser(user);
      } else {
        console.log("Auth state changed: not logged in");

        setUser(undefined);
      }
    });

    // Unsubscribe auth listener on unmount
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user: user,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

// Custom hook that shorhands the context. Makes it convenient to use in other functional componenets
export const useUser = (): UserContextType => useContext(UserContext);

type WrapperProps = {
  children: React.ReactNode;
};

// Wrap a page in this component to protect it
// Shows sign in componenet if not signed in or children if signed in
export const ProtectRoute = ({ children }: WrapperProps): JSX.Element => {
  const user = useUser();
  if (user.user === undefined) {
    return <SignIn />;
  }
  return <React.Fragment>{children}</React.Fragment>;
};

// Hides children if user isn't signed in
export const ProtectElement = ({ children }: WrapperProps): JSX.Element => {
  const user = useUser();
  if (user.user === undefined) {
    return <React.Fragment />;
  }
  return <React.Fragment>{children}</React.Fragment>;
};
