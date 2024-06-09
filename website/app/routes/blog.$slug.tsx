import type { LoaderFunctionArgs } from '@remix-run/node'
import { json, useLoaderData } from '@remix-run/react'
import type { SanityDocument } from '@sanity/client'

import Aside from '~/components/layout/Aside'
import Post from '~/components/Post'
import TableOfContents from '~/components/TableOfContentsInset'
import { WORDS_PER_MINUTE } from '~/lib/const'
import type { TocHeader } from '~/lib/types'
import { blocksToText } from '~/lib/utils'
import { useQuery } from '~/sanity/loader'
import { loadQuery } from '~/sanity/loader.server'
import { POST_QUERY } from '~/sanity/queries'

export const loader = async ({ params }: LoaderFunctionArgs) => {
    const initial = await loadQuery<SanityDocument>(POST_QUERY, params)

    // Extract headers from the initial data
    const headers: TocHeader[] = []
    for (const block of initial.data.body) {
        if (block._type === 'block' && block.style?.startsWith('h')) {
            headers.push({
                _key: block._key,
                style: block.style,
                value: block.children[0].text,
            })
        }
    }
    // Calculate word count and reading time
    const options = Object.assign({}, { nonTextBehavior: 'remove' }, {})
    const plainText = blocksToText(initial.data.body, options)
    const wordTokens = plainText.split(/\w+/g).filter(Boolean)
    const wordCount = wordTokens.length
    const readingTime = Math.ceil(wordCount / WORDS_PER_MINUTE)

    return json({
        initial,
        headers,
        readingTime,
        wordCount,
        query: POST_QUERY,
        params,
    })
}

export default function BlogPost() {
    const { initial, headers, readingTime, wordCount, query, params } =
        useLoaderData<typeof loader>()
    const { data, loading } = useQuery<typeof initial.data>(query, params, {
        // @ts-expect-error loader returns initial with JsonifyObject as
        // the outerwrapper, but useQuery expects it as the inner wrapper
        initial,
    })

    return data && !loading ? (
        <>
            <Post post={data} readingTime={readingTime} wordCount={wordCount} />
            <Aside>
                <TableOfContents headers={headers} />
            </Aside>
        </>
    ) : (
        <div>Loading ...</div>
    )
}
