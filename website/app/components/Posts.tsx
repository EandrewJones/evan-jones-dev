import urlBuilder from '@sanity/image-url'
import { client } from '~/sanity/client'
import { Link } from '@remix-run/react'
import { getImageDimensions } from '@sanity/asset-utils'
import { calendarDate, cn } from '~/lib/utils'
import type { PostPreview } from '~/sanity/types'

type Props = {
    posts: PostPreview[]
}

export default function Posts({ posts }: Props) {
    return (
        <ul className="my-8 flex list-none flex-col gap-8 p-0">
            {posts?.length > 0 ? (
                posts.map(post => {
                    const { width, height } = getImageDimensions(post.mainImage)
                    return (
                        <li
                            key={post._id}
                            className={cn([
                                'm-0 p-0',
                                'border border-primary-outline bg-card/40',
                                'hover:-translate-y-2 ease-in-out duration-500 cursor-pointer',
                                'transition-all shadow-lg hover:shadow-primary/30 dark:hover:shadow-primary/10',
                            ])}
                        >
                            <div className="relative overflow-hidden">
                                <Link
                                    to={post.slug.current}
                                    className="flex flex-col items-center gap-3 p-4 no-underline md:flex-row md:gap-6"
                                >
                                    <div className="w-full md:w-1/3">
                                        <img
                                            className="mx-auto overflow-hidden rounded border-2 border-ring/60 "
                                            src={urlBuilder(client)
                                                .image(post.mainImage)
                                                .width(150)
                                                .fit('max')
                                                .auto('format')
                                                .url()}
                                            alt=""
                                            loading="lazy"
                                            style={{
                                                aspectRatio: width / height,
                                            }}
                                        />
                                    </div>
                                    <div className="flex w-full flex-col gap-2 md:w-2/3">
                                        <span className="flex flex-col gap-2 sm:flex-row sm:items-center">
                                            <time className="text-xs font-bold text-primary">
                                                {calendarDate(post.publishedAt)}
                                            </time>
                                        </span>
                                        <strong className="block font-serif text-xl">
                                            {post.title}
                                        </strong>
                                        <p className="my-0 text-sm font-light">
                                            {post.description}
                                        </p>
                                        {post.categories.length > 0 && (
                                            <ul className="m-0 mt-2 flex list-none flex-wrap gap-2 p-0">
                                                {post.categories.map(
                                                    category => (
                                                        <li
                                                            key={category._id}
                                                            className="border-primary-outline mx-0 border bg-card/60 px-2 py-1 text-xs font-medium text-primary"
                                                        >
                                                            {category.title}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        )}
                                    </div>
                                </Link>
                            </div>
                        </li>
                    )
                })
            ) : (
                <div className="mx-auto my-8 text-red-500">No posts found.</div>
            )}
        </ul>
    )
}
