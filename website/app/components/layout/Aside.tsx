type Props = object

export default function Aside({ children }: React.PropsWithChildren<Props>) {
    return (
        <aside className="fixed bottom-0 right-[max(0px,calc(50%-45rem))] top-[72px] z-10 hidden w-[19.5rem] flex-col gap-8 overflow-y-auto px-8 py-6 lg:py-10 xl:flex">
            {children}
        </aside>
    )
}
