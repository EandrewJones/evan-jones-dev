type Props = {};

export default function Aside({ children }: React.PropsWithChildren<Props>) {
  return (
    <aside className='fixed top-[72px] bottom-0 right-[max(0px,calc(50%-45rem))] w-[19.5rem] py-6 lg:py-10 px-8 overflow-y-auto hidden xl:flex flex-col gap-8 z-10'>
      {children}
    </aside>
  );
}
