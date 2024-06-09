import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
} from '@remix-run/react'
import { PreventFlashOnWrongTheme, ThemeProvider, useTheme } from 'remix-themes'
import { Suspense, lazy } from 'react'
import stylesheet from './tailwind.css'
import Layout from '~/components/layout/Layout'
const VisualEditing = lazy(() => import('~/components/VisualEditing'))
import { Toaster } from '~/components/ui/toaster'
import { themeSessionResolver } from '~/sessions.server'
import { cn } from './lib/utils'

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: stylesheet },
]

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const { getTheme } = await themeSessionResolver(request)
    return json({
        ENV: {
            SANITY_STUDIO_PROJECT_ID: process.env.SANITY_STUDIO_PROJECT_ID,
            SANITY_STUDIO_DATASET: process.env.SANITY_STUDIO_DATASET,
            SANITY_STUDIO_URL: process.env.SANITY_STUDIO_URL,
            SANITY_STUDIO_STEGA_ENABLED:
                process.env.SANITY_STUDIO_STEGA_ENABLED,
        },
        theme: getTheme(),
    })
}

export function App() {
    const data = useLoaderData<typeof loader>()
    const [theme] = useTheme()

    return (
        <html lang="en" className={cn(theme)}>
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
                <Links />
            </head>
            <body className="prose max-w-none bg-background text-foreground dark:prose-invert prose-headings:font-serif dark:bg-background">
                <Layout>
                    <Outlet />
                </Layout>
                <ScrollRestoration />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
                    }}
                />
                {data.ENV.SANITY_STUDIO_STEGA_ENABLED && (
                    <Suspense>
                        <VisualEditing />
                    </Suspense>
                )}
                <Scripts />
                <LiveReload />
                <Toaster />
            </body>
        </html>
    )
}

export default function AppWithProviders() {
    const { theme } = useLoaderData<typeof loader>()
    return (
        <ThemeProvider specifiedTheme={theme} themeAction="/action/set-theme">
            <App />
        </ThemeProvider>
    )
}
