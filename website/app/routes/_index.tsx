import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { json, useLoaderData } from '@remix-run/react'
import { SanityDocument } from '@sanity/client'
import CustomPortableText from '~/components/CustomPortableText'
import ProfileInset from '~/components/ProfileInset'
import Aside from '~/components/layout/Aside'
import { loadQuery } from '~/sanity/loader.server'
import { HOME_QUERY } from '~/sanity/queries'
import { useQuery } from '~/sanity/loader'

export const meta: MetaFunction = () => {
    return [
        { title: 'Evan Jones dot dev' },
        { name: "Evan Jones' Personal Site", content: '<FILL WITH SEO>' },
    ]
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
    const initial = await loadQuery<SanityDocument>(HOME_QUERY, params)

    return json({ initial, query: HOME_QUERY, params })
}

export default function Index() {
    const { initial, query, params } = useLoaderData<typeof loader>()
    const { data, loading } = useQuery<typeof initial.data>(query, params, {
        // @ts-expect-error loader returns initial with JsonifyObject as
        // the outerwrapper, but useQuery expects it as the inner wrapper
        initial,
    })

    return (
        <>
            {/* Page Content Here */}
            {loading && !data ? (
                'Loading...'
            ) : data ? (
                <CustomPortableText content={data.body} />
            ) : null}
            {/* Aside */}
            <Aside>
                <ProfileInset />
            </Aside>
        </>
    )
}
