import { useLocation } from "@remix-run/react";
import {
  GitBranch,
  GitFork,
  Github,
  Home,
  Linkedin,
  LucideIcon,
  Microscope,
  Pen,
  Twitter,
  UserRound,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import { cn } from "~/lib/utils";
import { Separator } from "../ui/separator";

const navLinks: {
  title: string;
  href: string;
  icon: LucideIcon;
  description: string;
}[] = [
  {
    title: "Home",
    icon: Home,
    href: "/",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "About",
    icon: UserRound,
    href: "/about",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Blog",
    icon: Pen,
    href: "/blog",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Open Source",
    icon: GitBranch,
    href: "/open-source",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Research",
    icon: Microscope,
    href: "/research",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
];

function NavigationList() {
  const { pathname } = useLocation();
  return (
    <NavigationMenuList className='flex-col items-start w-[200px] '>
      {navLinks.map((link) => {
        const activePath =
          link.href === "/"
            ? link.href === pathname
            : pathname.includes(link.href);

        return (
          <NavigationMenuItem
            key={link.href}
            className={cn([
              "px-0 py-2 m-0 w-full",
              {
                "border-l-2 border-ring bg-primary/10": activePath,
                "border-l-2 border-transparent hover:border-ring/60 hover:bg-secondary/70":
                  !activePath,
              },
            ])}
          >
            <NavigationMenuLink
              href={link.href}
              className={cn([
                navigationMenuTriggerStyle(),
                "bg-transparent gap-4",
                "font-bold",
                // "hover:outline hover:outline-1 hover:outline-border",

                {
                  "text-primary": activePath,
                  "text-accent-foreground/70 hover:text-accent-foreground focus:text-accent-foreground":
                    !activePath,
                },
              ])}
            >
              <link.icon size={18} />
              {link.title}
            </NavigationMenuLink>
          </NavigationMenuItem>
        );
      })}
    </NavigationMenuList>
  );
}

const socialLinks: {
  title: string;
  href: string;
  icon: LucideIcon;
  description: string;
}[] = [
  {
    title: "GitHub",
    icon: Github,
    href: "https://github.com/EandrewJones",
    description: "My personal github account",
  },
  {
    title: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/evan-jones-38b06869/",
    description: "My professional LinkedIn account",
  },
  {
    title: "Twitter/X",
    icon: Twitter,
    href: "https://twitter.com/EandrewJones",
    description: "A place I never go...",
  },
];

function SocialList() {
  return (
    <NavigationMenuList className='flex-col items-start w-[200px] '>
      {socialLinks.map((link) => (
        <NavigationMenuItem
          key={link.href}
          className={cn(["px-0 py-2 m-0 w-full", "hover:bg-secondary/70"])}
        >
          <NavigationMenuLink
            href={link.href}
            className={cn([
              navigationMenuTriggerStyle(),
              "bg-transparent gap-4",
              "font-bold",
              "text-accent-foreground/70 hover:text-accent-foreground focus:text-accent-foreground",
            ])}
          >
            <link.icon size={18} />
            {link.title}
          </NavigationMenuLink>
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  );
}
export default function Navigation() {
  return (
    <NavigationMenu
      className='border border-primary-outline bg-card/40 flex-col'
      orientation='vertical'
    >
      <NavigationList />
      <Separator className='w-3/4 my-4' />
      <SocialList />
    </NavigationMenu>
  );
}
