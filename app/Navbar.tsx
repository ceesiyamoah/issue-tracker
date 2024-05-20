'use client';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BsBugFill } from 'react-icons/bs';
import { useSession } from 'next-auth/react';
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';

const links = [
	{ label: 'Dashboard', href: '/' },
	{ label: 'Issues', href: '/issues' },
];

const Navbar = () => {
	classNames;
	return (
		<nav className='px-5 h-14 border-b mb-5 py-3'>
			<Container>
				<Flex align={'center'} justify={'between'}>
					<Flex align={'center'} gap='3'>
						<Link href='/'>
							<BsBugFill className='fill-blue-700' />
						</Link>
						<NavLinks />
					</Flex>
					<AuthStatus />
				</Flex>
			</Container>
		</nav>
	);
};

export default Navbar;

const AuthStatus = () => {
	const { status, data: session } = useSession();
	if (status === 'loading') return null;
	if (status === 'unauthenticated') {
		return (
			<Link href='/api/auth/signin' className='nav-link'>
				Sign In
			</Link>
		);
	}
	return (
		<Box>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<Avatar
						src={session!.user!.image!}
						fallback='?'
						size='2'
						radius='full'
						className='cursor-pointer'
						referrerPolicy='no-referrer'
					/>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Label>
						<Text size='2'>{session!.user!.email}</Text>
					</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>
						<Link href='/api/auth/signout'>Log Out</Link>
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</Box>
	);
};

const NavLinks = () => {
	const currentPath = usePathname();

	return (
		<ul className='flex gap-6'>
			{links.map((link) => (
				<li key={link.href}>
					<Link
						href={link.href}
						className={classNames({
							'nav-link': true,
							'text-blue-600': link.href === currentPath,
						})}
					>
						{link.label}
					</Link>
				</li>
			))}
		</ul>
	);
};
