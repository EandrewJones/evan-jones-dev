import { cn } from '~/lib/utils'
import type { OpenSourceProject } from '~/sanity/types'
import { Github } from 'lucide-react'
import CNCFLogo from '~/images/cncf-stacked-logo.png'
import { PortableText, PortableTextBlockComponent } from '@portabletext/react'

type Props = {
    projects: OpenSourceProject[]
}

export default function OpenSourceProjects({ projects }: Props) {
    const orgLogo: { [key: string]: { value: string; alt: string } | null } = {
        0: {
            value: 'https://www.apache.org/foundation/press/kit/feather.svg ',
            alt: 'Apache Software Foundation',
        },
        1: { value: CNCFLogo, alt: 'Cloud Native Computing Foundation' },
        2: null,
    }
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
                    const imgSrc = orgLogo[project.organization]
                    return (
                        <li
                            key={project._id}
                            className={cn([
                                'm-0 p-0',
                                'border border-primary-outline bg-card/40',
                                'hover:-translate-y-2 ease-in-out duration-500',
                                'transition-all shadow-lg hover:shadow-primary/30 dark:hover:shadow-primary/10',
                            ])}
                        >
                            <div className="relative overflow-hidden">
                                <div className="flex flex-col items-center gap-3 p-8 no-underline md:flex-row md:gap-6">
                                    <div className="flex w-full flex-col gap-2">
                                        <strong className="block font-serif text-xl">
                                            {project.title}
                                        </strong>
                                        <PortableText
                                            value={project.description as any}
                                            components={components}
                                        />

                                        <div className="inline-flex items-center gap-10">
                                            <div className="inline-flex items-center gap-4">
                                                {imgSrc && (
                                                    <img
                                                        className="m-0"
                                                        src={imgSrc.value}
                                                        alt={imgSrc.alt}
                                                        width={
                                                            imgSrc.alt ===
                                                            'Cloud Native Computing Foundation'
                                                                ? '30'
                                                                : '20'
                                                        }
                                                        loading="lazy"
                                                        decoding="async"
                                                    />
                                                )}
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noreferrer noopener"
                                                >
                                                    <Github size={30} />
                                                </a>
                                            </div>
                                            {project.categories.length > 0 && (
                                                <ul className="m-0 mt-2 flex list-none flex-wrap gap-2 p-0">
                                                    {project.categories.map(
                                                        category => (
                                                            <li
                                                                key={
                                                                    category._id
                                                                }
                                                                className="border-primary-outline mx-0 border bg-card/60 px-2 py-1 text-xs font-medium text-primary"
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
