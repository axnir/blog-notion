'use client';

import { usePathname } from 'next/navigation';
import NextLink from 'next/link';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';

const NAV_LIST = [
  {
    title: '首页',
    href: '/',
  },
  {
    title: '文章',
    href: '/post',
  },
  {
    title: '关于',
    href: '/about',
  },
];

const Link = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
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
    <div className="sticky top-0 w-full flex items-center justify-center backdrop-blur-sm bg-white bg-opacity-60">
      <NextLink
        href="/"
        className="mr-40 flex items-center text-violet12 font-medium"
      >
        🐱 Axnir's Blog
      </NextLink>
      <NavigationMenu.Root
        className={classNames('z-[99] flex justify-center h-[80px]', className)}
      >
        <NavigationMenu.List className="h-full flex items-center">
          {NAV_LIST.map((nav) => (
            <NavigationMenu.Item
              key={nav.href}
              className="flex justify-center items-center h-[30%] w-[60px]"
            >
              <Link href={nav.href}>{nav.title}</Link>
            </NavigationMenu.Item>
          ))}
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </div>
  );
}
