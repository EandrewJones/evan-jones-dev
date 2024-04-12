import { Link } from "@remix-run/react";
import BannerLight from "~/images/evan-jones-logo-light.png";
import BannerDark from "~/images/evan-jones-logo-dark.png";
import { useTheme } from "remix-themes";
import { useEffect, useState } from "react";

export function Logo() {
  const [theme] = useTheme();
  const [banner, setBanner] = useState<string>(
    theme === "dark" ? BannerDark : BannerLight
  );

  useEffect(() => {
    if (theme === "dark") {
      setBanner(BannerDark);
    } else {
      setBanner(BannerLight);
    }
  }, [theme]);

  return (
    <Link to='/' className='flex items-center' aria-current='page'>
      <span className='sr-only'>{"Evan Jones's Site"}</span>
      <img
        src={banner}
        alt='evan jones.dev logo'
        className='w-52 -translate-x-1'
      />
    </Link>
  );
}
