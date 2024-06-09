import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { json, useLoaderData, useSearchParams } from '@remix-run/react'
import { useMemo, useState } from 'react'
import CategorySearchAndFilter from '~/components/CategorySearchAndFilter'
import ResearchProjects from '~/components/ResearchProjects'
import Aside from '~/components/layout/Aside'
import { filterDocuments } from '~/lib/utils'
import { useQuery } from '~/sanity/loader'
import { loadQuery } from '~/sanity/loader.server'
import { RESEARCH_QUERY } from '~/sanity/queries'
import { ResearchProject } from '~/sanity/types'

export const meta: MetaFunction = () => {
    return [
        { title: 'Research | Evan Jones dot dev' },
        {
            name: 'keywords',
            content:
                'research projects, manuscripts, political science, genomics, chinese foreign policy, bayesian statistics',
        },
    ]
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
    const initial = await loadQuery<ResearchProject[]>(RESEARCH_QUERY)

    const tags = new Set<string>()
    for (const project of initial.data) {
        for (const category of project.categories ?? []) {
            tags.add(category.title.replace(/[\u{0080}-\u{FFFF}]/gu, ''))
        }
    }

    return json({
        initial,
        tags: Array.from(tags),
        groqQuery: RESEARCH_QUERY,
        params,
    })
}

export default function Research() {
    const { initial, tags, groqQuery, params } = useLoaderData<typeof loader>()
    const { data, loading } = useQuery<ResearchProject[]>(groqQuery, params, {
        // @ts-expect-error loader returns initial with JsonifyObject as
        // the outerwrapper, but useQuery expects it as the inner wrapper
        initial,
    })

    const [searchParams] = useSearchParams()
    const [queryValue, setQuery] = useState<string>(() => {
        return searchParams.get('q') ?? ''
    })
    const query = queryValue.trim()

    const matchingProjects = useMemo(() => {
        return filterDocuments<ResearchProject>(data ?? [], query)
    }, [data, query])

    function toggleTag(tag: string) {
        setQuery(q => {
            // create a regexp so that we can replace multiple occurences (`react node react`)
            const expression = new RegExp(tag, 'ig')

            const newQuery = expression.test(q)
                ? q.replace(expression, '')
                : `${q} ${tag}`

            // trim and remove subsequent spaces
            return newQuery.replace(/\s+/g, ' ').trim()
        })
    }

    const isSearching = query.length > 0
    const visibleTags = isSearching
        ? new Set(
              matchingProjects
                  .flatMap(project => project.categories.map(c => c.title))
                  .filter(Boolean)
          )
        : new Set(tags)

    return (
        <>
            <p>
                As a PhD student, I studied the economic and media dimensions of
                China&apos;s growing influence and reactions to them by states
                and individuals. Some papers I saw through to publications.
                Others shall remain working papers forever.
            </p>
            <p>
                These days, I do not publish much. Although, on occasion, I
                contribute statistical firepower to my wife&apos;s publications
                in genomics and cancer biology.
            </p>
            {data && !loading ? (
                <ResearchProjects projects={matchingProjects} />
            ) : (
                <div>Loading ...</div>
            )}
            <Aside>
                <CategorySearchAndFilter
                    tags={tags}
                    toggleTag={toggleTag}
                    queryValue={queryValue}
                    setQuery={setQuery}
                    searchQuery={query}
                    visibleTags={visibleTags}
                    searchPlaceholder="Search projects"
                />
            </Aside>
        </>
    )
}
