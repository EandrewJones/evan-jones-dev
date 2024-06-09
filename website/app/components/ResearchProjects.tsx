import { getImageDimensions } from '@sanity/asset-utils'
import { calendarDate, cn } from '~/lib/utils'
import type { ResearchProject } from '~/sanity/types'
import { PortableText, PortableTextBlockComponent } from '@portabletext/react'
import urlBuilder from '@sanity/image-url'
import { client } from '~/sanity/client'
import { Separator } from '~/components/ui/separator'

type Props = {
    projects: ResearchProject[]
}

export default function ResearchProjects({ projects }: Props) {
    const ParagraphComponent: PortableTextBlockComponent = props => (
        <p className="my-0 text-sm font-light">{props.children}</p>
    )

    const components = {
        block: {
            normal: ParagraphComponent,
        },
    }
    return (
        <ul className="my-8 flex list-none flex-col gap-8 p-0">
            {projects?.length > 0 ? (
                projects.map(project => {
                    const { width, height } = getImageDimensions(
                        project.mainImage
                    )
                    return (
                        <li
                            key={project._id}
                            className={cn([
                                'm-0 p-0',
                                'border border-primary-outline bg-card/40',
                                'hover:-translate-y-2 ease-in-out duration-300',
                                'transition-all shadow-lg hover:shadow-primary/30 dark:hover:shadow-primary/10',
                            ])}
                        >
                            <div className="relative overflow-hidden">
                                <div className="flex flex-col items-center gap-3 p-4 md:flex-row md:gap-6">
                                    <div className="w-full md:w-1/3">
                                        <img
                                            className="mx-auto overflow-hidden rounded border-2 border-ring/60 "
                                            src={urlBuilder(client)
                                                .image(project.mainImage)
                                                .width(500)
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
                                                {calendarDate(
                                                    project.datePublished
                                                )}
                                            </time>
                                            <span className="ml-auto text-xs text-muted-foreground">
                                                {project.status ===
                                                'Published' ? (
                                                    project.link ? (
                                                        <a
                                                            href={project.link}
                                                            className="text-muted-foreground transition-all duration-300 hover:text-primary/70 focus:text-primary/70"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            {
                                                                project.publication
                                                            }
                                                        </a>
                                                    ) : (
                                                        project.publication
                                                    )
                                                ) : (
                                                    'Working Paper'
                                                )}
                                            </span>
                                        </span>
                                        <strong className="block font-serif text-xl">
                                            {project.title}
                                        </strong>
                                        {project.subtitle && (
                                            <span className="block text-lg italic text-secondary-foreground">
                                                {project.subtitle}
                                            </span>
                                        )}
                                        <PortableText
                                            value={project.description as any}
                                            components={components}
                                        />
                                        <div className="flex flex-row items-center space-x-4 text-xs">
                                            {project.manuscriptURL && (
                                                <a
                                                    className="text-muted-foreground transition-all duration-300 hover:text-primary/70 focus:text-primary/70"
                                                    href={`${project.manuscriptURL}?dl=`}
                                                >
                                                    PDF
                                                </a>
                                            )}
                                            {project.slidesURL && (
                                                <>
                                                    <Separator
                                                        orientation="vertical"
                                                        className="h-4"
                                                    />
                                                    <a
                                                        className="text-muted-foreground transition-all duration-300 hover:text-primary/70 focus:text-primary/70"
                                                        href={`${project.slidesURL}?dl=`}
                                                    >
                                                        Slides
                                                    </a>
                                                </>
                                            )}
                                        </div>
                                        {project.categories.length > 0 && (
                                            <ul className="m-0 mt-2 flex list-none flex-wrap gap-2 p-0">
                                                {project.categories.map(
                                                    category => (
                                                        <li
                                                            key={category._id}
                                                            className="border-primary-outline m-0 border bg-card/60 px-2 py-1 text-xs font-medium text-primary"
                                                        >
                                                            {category.title}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </li>
                    )
                })
            ) : (
                <div className="mx-auto my-8 text-red-500">
                    No projects found.
                </div>
            )}
        </ul>
    )
}
