import React from 'react'
import { Header } from './Header'
import Sidebar from './Sidebar'
import BreadcrumbHeader from './BreadcrumbHeader'

type Props = object

export default function Layout({ children }: React.PropsWithChildren<Props>) {
    return (
        <div>
            <Header />
            <div className="relative">
                <div className="mx-auto max-w-8xl px-4 pt-[72px] sm:px-6 md:px-8">
                    <Sidebar />
                    <main className="lg:pl-56">
                        <section className="mx-auto max-w-none px-0 py-6 lg:px-16 lg:py-10 xl:ml-0 xl:mr-[15.5rem]">
                            <article className="min-h-[calc(100vh-19rem)] max-w-none">
                                <BreadcrumbHeader />
                                {children}
                            </article>
                        </section>
                    </main>
                </div>
            </div>
        </div>
    )
}
