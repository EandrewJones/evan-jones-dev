import { cn } from 'app/lib/utils'
import { Separator } from '~/components/ui/separator'
import Headshot from '~/images/evan-headshot.jpg'
import Coco from '~/images/coco-headshot.jpg'
import Bryce from '~/images/bryce-headshot.jpg'

export default function ProfileInset() {
    return (
        <div className="border-primary-outline flex-col border bg-card/40">
            <div className="grid gap-4 px-4 py-8 sm:px-6">
                {/* Personal Profile */}
                <img
                    className="m-0 mx-auto block size-16 rounded-full border-2 border-ring/60"
                    src={Headshot}
                    alt="Evan Jones"
                    width="60"
                    height="60"
                    loading="lazy"
                    decoding="async"
                />

                {/* About */}
                <div>
                    <h5
                        className={cn([
                            'mb-0.5 leading-6',
                            'text-base text-center text-primary',
                            'font-serif font-semibold uppercase',
                        ])}
                    >
                        Evan Jones
                    </h5>
                    <p className="m-0 my-2 text-center text-sm text-foreground">
                        Full-Stack Software Engineer & PI{' '}
                        <span className="font-bold">@</span>{' '}
                        <a
                            href="https://www.arlis.umd.edu"
                            className={cn([
                                'text-accent-foreground/70 hover:text-accent-foreground',
                                'focus:text-accent-foreground font-bold',
                            ])}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            ARLIS
                        </a>
                    </p>
                    <p className="my-3 text-center text-xs text-muted-foreground">
                        Former cofounder at QuestStudio, animal dad, bonafide
                        political science nerd.
                    </p>
                </div>

                <Separator className="mx-auto my-2 w-3/4" />

                {/* Family photos */}
                <div className="flex flex-row justify-items-center">
                    <img
                        className="m-0 mx-auto block size-16 rounded-full border-2 border-ring/60"
                        src={Coco}
                        alt="Coco"
                        width="60"
                        height="60"
                        loading="lazy"
                        decoding="async"
                    />
                    <img
                        className="m-0 mx-auto block size-16 rounded-full border-2 border-ring/60"
                        src={Bryce}
                        alt="Bryce"
                        width="60"
                        height="60"
                        loading="lazy"
                        decoding="async"
                    />
                </div>
            </div>
        </div>
    )
}
