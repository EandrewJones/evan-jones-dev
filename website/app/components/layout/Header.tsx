import { cn } from '~/lib/utils'
import { Logo } from '~/components/brand/Logo'
import { ModeToggle } from '~/components/brand/ModeToggle'

export function Header() {
    return (
        <header
            className={cn([
                'fixed top-0 w-full h-[72px] z-30',
                'bg-background lg:bg-transparent backdrop-blur-md',
                // "transition-all duration-300",
                'border-b border-primary-outline',
            ])}
        >
            <div className="mx-auto h-full max-w-8xl">
                <div className="mx-4 h-full lg:mx-0 lg:px-8">
                    <div className="relative flex h-full items-center justify-between">
                        <Logo />
                        <ModeToggle />
                    </div>
                </div>
            </div>
        </header>
    )
}
