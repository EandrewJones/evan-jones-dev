import { cn } from '~/lib/utils'
import { Tag } from '~/components/ui/tag'
import { Separator } from '~/components/ui/separator'

interface CategorySearchAndFilterProps {
    tags: Array<string>
    toggleTag: (tag: string) => void
    queryValue: string
    searchQuery: string
    setQuery: React.Dispatch<React.SetStateAction<string>>
    visibleTags: Set<string>
    searchPlaceholder?: string
}

export default function CategorySearchAndFilter({
    tags,
    toggleTag,
    queryValue,
    searchQuery,
    setQuery,
    visibleTags,
    searchPlaceholder = 'Search posts',
}: CategorySearchAndFilterProps) {
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
                    Search & Filter
                </h5>
                <form
                    action="/blog"
                    method="GET"
                    onSubmit={e => e.preventDefault()}
                >
                    <div className="relative">
                        <input
                            className={cn([
                                'w-full p-2',
                                'border border-primary-outline bg-card',
                                'text-secondary-foreground',
                                'focus:bg-card focus:outline-none hover:border-ring/60 focus:border-ring',
                            ])}
                            type="search"
                            value={queryValue}
                            onChange={event =>
                                setQuery(
                                    event.currentTarget.value.toLowerCase()
                                )
                            }
                            name="q"
                            placeholder={searchPlaceholder}
                        />
                    </div>
                </form>
                <Separator className="mx-auto my-2 w-3/4" />
                {/* About */}
                <ul className="m-0 flex list-none flex-wrap gap-1 p-0">
                    {tags.map(tag => {
                        const selected = searchQuery.includes(tag)
                        return (
                            <Tag
                                key={tag}
                                tag={tag}
                                onClick={() => toggleTag(tag)}
                                selected={selected}
                                disabled={
                                    !visibleTags.has(tag) ? !selected : false
                                }
                            />
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
