'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import NextLink from 'next/link';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import clsx from 'clsx';
import SITE_CONFIG from '../../site.config';

const Link = ({ href, children }: { href: string; children: ReactNode }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <NavigationMenu.Link asChild active={isActive}>
      <NextLink
        href={href}
        passHref
        className="focus:shadow-[0_0_0_2px] focus:shadow-violet7 hover:bg-mauve3 w-full text-center rounded-[6px] mr-2"
      >
        <span className="text-violet12 font-medium">{children}</span>
      </NextLink>
    </NavigationMenu.Link>
  );
};

export default function Nav({ className }: { className?: string }) {
  return (
    <header className="mx-40 sticky top-0 flex items-center justify-between backdrop-blur-sm bg-white bg-opacity-60">
      <NextLink
        href="/"
        className="flex items-center text-violet12 font-medium"
      >
        {SITE_CONFIG.title}
      </NextLink>
      <NavigationMenu.Root
        className={clsx('z-[99] flex justify-center h-[80px]', className)}
      >
        <NavigationMenu.List className="h-full flex items-center">
          {SITE_CONFIG.navList.map((nav) => (
            <NavigationMenu.Item
              key={nav.href}
              className="flex justify-center items-center h-[30%] w-[60px]"
            >
              <Link href={nav.href}>{nav.title}</Link>
            </NavigationMenu.Item>
          ))}
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </header>
  );
}
