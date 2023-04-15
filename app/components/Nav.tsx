'use client';

import { usePathname } from 'next/navigation';
import NextLink from 'next/link';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';

const Link = ({
  href,
  ...props
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <NextLink href={href} passHref>
      <NavigationMenu.Link active={isActive} {...props} />
    </NextLink>
  );
};

export default function Nav({ className }: { className?: string }) {
  const handleItemClick = () => {
    console.log('clicked');
  };

  return (
    <NavigationMenu.Root className={className}>
      <NavigationMenu.List className="flex h-10">
        <NavigationMenu.Item className="flex justify-center items-center w-20">
          <Link href="/">文章</Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item className="flex justify-center items-center w-20">
          <Link href="/post">关于</Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item className="flex justify-center items-center w-20">
          <Link href="/about">订阅</Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
