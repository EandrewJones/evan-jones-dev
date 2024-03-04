import { useLocation } from "@remix-run/react";
import React from "react";
import { ModeToggle } from "./ModeToggle";

type Props = {};

export default function Layout({ children }: React.PropsWithChildren<Props>) {
  const { pathname } = useLocation();

  return (
    <div className='bg-background dark:bg-background'>
      <ModeToggle />
      <h1>{pathname}</h1>
      {children}
    </div>
  );
}
