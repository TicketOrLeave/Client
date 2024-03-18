'use client'
import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from '@/components/ui/breadcrumb'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function BreadcrumbComponent() {
  const path = usePathname()

  return (
    <Breadcrumb className="">
      <BreadcrumbList className="text-black text-xl font-mono">
        {path.split('/').map((p, i) => {
          if (p === '') return null
          return (
            <React.Fragment key={i}>
              <BreadcrumbItem>
                {p.length < 20 ? (
                  <BreadcrumbLink asChild={true} className="hover:text-green-500">
                    <Link
                      href={`${path
                        .split('/')
                        .splice(0, i + 1)
                        .join('/')}`}
                    >
                      {p}
                    </Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbEllipsis />
                )}
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
