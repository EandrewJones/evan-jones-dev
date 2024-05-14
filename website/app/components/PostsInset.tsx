import { cn } from "~/lib/utils";
import { Tag } from "~/components/ui/tag";
import { Separator } from "~/components/ui/separator";

interface CategorySearchAndFilterProps {
  tags: Array<string>;
  toggleTag: (tag: string) => void;
  queryValue: string;
  searchQuery: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  visibleTags: Set<string>;
}

export default function CategorySearchAndFilter({
  tags,
  toggleTag,
  queryValue,
  searchQuery,
  setQuery,
  visibleTags,
}: CategorySearchAndFilterProps) {
  return (
    <div className='border border-primary-outline bg-card/40 flex-col'>
      <div className='grid gap-4 px-4 sm:px-6 py-8'>
        <h5
          className={cn([
            "leading-6",
            "text-base text-center text-secondary-foreground",
            "font-serif font-semibold uppercase",
          ])}
        >
          Categories
        </h5>
        <form action='/blog' method='GET' onSubmit={(e) => e.preventDefault()}>
          <div className='relative'>
            <input
              className={cn([
                "w-full p-2",
                "border border-primary-outline bg-card",
                "text-secondary-foreground",
                "focus:bg-card focus:outline-none hover:border-ring/60 focus:border-ring",
              ])}
              type='search'
              value={queryValue}
              onChange={(event) =>
                setQuery(event.currentTarget.value.toLowerCase())
              }
              name='q'
              placeholder={"Search posts"}
            />
          </div>
        </form>
        <Separator className='w-3/4 my-2 mx-auto' />
        {/* About */}
        <ul className='flex flex-wrap gap-1 list-none m-0 p-0 mt-0 mb-0'>
          {tags.map((tag) => {
            const selected = searchQuery.includes(tag);
            return (
              <Tag
                key={tag}
                tag={tag}
                onClick={() => toggleTag(tag)}
                selected={selected}
                disabled={!visibleTags.has(tag) ? !selected : false}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}
