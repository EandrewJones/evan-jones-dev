import { TocHeader } from '~/lib/types'
import { cn } from '~/lib/utils'

interface TableOfContentsProps {
    headers: TocHeader[]
}

export default function TableOfContents({ headers }: TableOfContentsProps) {
    const headerSize = (style: string) => Number(style?.replace('h', ''))
    return (
        <div className="border-primary-outline flex-col border bg-card/40">
            <div className="grid gap-4 px-4 py-8 sm:px-6">
                <h5
                    className={cn([
                        'leading-6',
                        'text-base text-center text-secondary-foreground',
                        'font-serif font-semibold uppercase',
                    ])}
                >
                    On this page
                </h5>
                <div className="flex flex-col">
                    {headers.map(header => {
                        return (
                            <a
                                key={header._key}
                                href={`#${header._key}`}
                                className={cn([
                                    'h-6 leading-4 text-md',
                                    //   headerSizeToTextSize[headerSize(header.style)],
                                    'text-sm',
                                    'text-accent-foreground/70 hover:text-accent-foreground',
                                    'transition-all duration-300',
                                    'no-underline',
                                    'group',
                                ])}
                            >
                                <span className="text-primary/70 group-hover:text-primary">
                                    {'.'.repeat(
                                        2 * (headerSize(header.style) - 2)
                                    )}{' '}
                                </span>
                                {header.value}
                            </a>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
