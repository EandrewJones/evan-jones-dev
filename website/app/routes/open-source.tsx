import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { json, useLoaderData, useSearchParams } from '@remix-run/react'
import { SanityDocument } from '@sanity/client'
import { useMemo, useState } from 'react'
import OpenSourceProjects from '~/components/OpenSourceProjects'
import CategorySearchAndFilter from '~/components/CategorySearchAndFilter'
import Aside from '~/components/layout/Aside'
import { filterDocuments } from '~/lib/utils'
import { useQuery } from '~/sanity/loader'
import { loadQuery } from '~/sanity/loader.server'
import { OPEN_SOURCE_QUERY } from '~/sanity/queries'
import type { OpenSourceProject } from '~/sanity/types'

export const meta: MetaFunction = () => {
    return [
        { title: 'Open Source | Evan Jones dot dev' },
        {
            name: 'keywords',
            content:
                'open source software, user instrumentation, Kubernetes, telemetry, rust, python, bayesian non-parametrics',
        },
    ]
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
    const initial =
        await loadQuery<SanityDocument<OpenSourceProject>[]>(OPEN_SOURCE_QUERY)

    const tags = new Set<string>()
    for (const project of initial.data) {
        for (const category of project.categories ?? []) {
            tags.add(category.title.replace(/[\u{0080}-\u{FFFF}]/gu, ''))
        }
    }

    return json({
        initial,
        tags: Array.from(tags),
        groqQuery: OPEN_SOURCE_QUERY,
        params,
    })
}

export default function OpenSource() {
    const { initial, tags, groqQuery, params } = useLoaderData<typeof loader>()
    const { data, loading } = useQuery<OpenSourceProject[]>(groqQuery, params, {
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
        return filterDocuments<OpenSourceProject>(data ?? [], query)
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
                Below are open source projects I&apos;ve either created myself
                or contribute to on a regular basis. Some, such as Apache
                Flagon, I maintain as part of my day job. Others I contribute to
                for pleasure.
            </p>
            {data && !loading ? (
                <OpenSourceProjects projects={matchingProjects} />
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
