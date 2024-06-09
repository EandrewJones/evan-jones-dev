import { useLocation } from '@remix-run/react'

// TODO: Find a way to remove this hard-coding
export const pathToTitleMap: { [x: string]: string } = {
    '/': 'Home',
    '/about': 'About',
    '/blog': 'Blog',
    '/open-source': 'Open Source',
    '/research': 'Research',
}

export default function BreadcrumbHeader() {
    const location = useLocation()

    return (
        <div className="flex flex-col">
            {/* <div className='inline-flex items-center'>
        <Database className='text-primary' size={20} />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbList.map((path, idx) => {
              if (path === "")
                return (
                  <BreadcrumbSeparator key={`${path}-${idx}`}>
                    <Slash className='text-primary' size={20} />
                  </BreadcrumbSeparator>
                );
              else
                return (
                  <BreadcrumbItem key={`${path}-${idx}`}>
                    <BreadcrumbLink href={breadcrumbList.slice(0, idx).join()}>
                      {path}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div> */}
            <h1 className="text- font-serif">
                {pathToTitleMap[location.pathname]}
            </h1>
        </div>
    )
}
