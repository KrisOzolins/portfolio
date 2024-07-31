'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React, { ReactNode } from 'react';

import Icon from '@/app/admin/_components/Icon';

type TBreadCrumbProps = {
  homeElement: ReactNode;
  separator: ReactNode;
  containerClasses?: string;
  listClasses?: string;
  activeClasses?: string;
  capitalizeLinks?: boolean;
  startElement?: number;
};

const NextBreadcrumb = ({
  homeElement,
  separator,
  containerClasses,
  listClasses,
  activeClasses,
  capitalizeLinks,
  startElement = 0,
}: TBreadCrumbProps) => {
  const paths = usePathname() as string;
  const pathNames = paths.split('/').filter((path) => path);

  return (
    <ul className={containerClasses}>
      {startElement === 0 && (
        <li className={listClasses}>
          <Link href="/">{homeElement}</Link>
        </li>
      )}
      {startElement > 0 && (
        <li className={listClasses}>
          <Link href={`/${pathNames[0]}`}>{homeElement}</Link>
        </li>
      )}
      {pathNames.length > startElement && separator}
      {pathNames.slice(startElement).map((link, index) => {
        let adjustedIndex = index + startElement;
        let href = `/${pathNames.slice(0, adjustedIndex + 1).join('/')}`;
        let itemClasses = paths === href ? `${listClasses} ${activeClasses}` : listClasses;
        let itemLink = capitalizeLinks ? link[0].toUpperCase() + link.slice(1, link.length) : link;
        return (
          <React.Fragment key={adjustedIndex}>
            <li className={itemClasses}>
              <Link href={href}>{itemLink}</Link>
            </li>
            {pathNames.length !== adjustedIndex + 1 && separator}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default NextBreadcrumb;
