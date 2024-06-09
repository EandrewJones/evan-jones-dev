import type { SanityDocument } from '@sanity/client'

export type SearchableDocument = SanityDocument<{
    title: string
    description: string | null
    categories: Array<
        SanityDocument<{
            title: string
        }>
    >
}>

export type PostPreview = SearchableDocument &
    SanityDocument<{
        slug: SanityDocument<{ current: string; _type: 'slug' }>
        mainImage: { _type: 'image'; asset: any }
        publishedAt: string
    }>

enum OSSRole {
    Contributor = 'Contributor',
    Committer = 'Committer',
    PMC = 'PMC',
    Author = 'Author',
    Member = 'Member',
}

enum OSSOrg {
    ASF = 'Apache Software Foundation',
    CNCF = 'Cloud Native Computing Foundation',
    None = '',
}
export type OpenSourceProject = SearchableDocument &
    SanityDocument<{
        slug: SanityDocument<{ current: string; _type: 'slug' }>
        mainImage: { _type: 'image'; asset: any }
        role: OSSRole
        organization: OSSOrg
        github: string
    }>

enum PublicationStatus {
    WorkingPaper = 'Working Paper',
    Published = 'Published',
}

export type ResearchProject = SearchableDocument &
    SanityDocument<{
        subtitle: string
        authors: string
        status: PublicationStatus
        publication: string
        datePublished: string
        slug: SanityDocument<{ current: string; _type: 'slug' }>
        mainImage: { _type: 'image'; asset: any }
        link: string | null
        manuscriptURL: string | null
        slidesURL: string | null
    }>
