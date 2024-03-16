import { cn } from "~/lib/utils";
import { Logo } from "~/components/brand/Logo";
import { ModeToggle } from "~/components/brand/ModeToggle";

export function Header() {
  return (
    <header
      className={cn([
        "fixed top-0 w-full h-[72px] z-30",
        "bg-background lg:bg-transparent backdrop-blur-md",
        // "transition-all duration-300",
        "border-b border-primary-outline",
      ])}
    >
      <div className='max-w-8xl mx-auto h-full'>
        <div className='mx-4 lg:px-8 lg:mx-0 h-full'>
          <div className='relative flex items-center justify-between h-full'>
            <Logo />
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
