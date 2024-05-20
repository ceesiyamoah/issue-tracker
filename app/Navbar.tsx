'use client';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BsBugFill } from 'react-icons/bs';
import { useSession } from 'next-auth/react';
import { Box } from '@radix-ui/themes';

const links = [
	{ label: 'Dashboard', href: '/' },
	{ label: 'Issues', href: '/issues' },
];

const Navbar = () => {
	const currentPath = usePathname();
	const { status, data: session } = useSession();
	classNames;
	return (
		<nav className='flex px-5 h-14 items-center space-x-6 border-b mb-5'>
			<Link href='/'>
				<BsBugFill className='fill-blue-700' />
			</Link>
			<ul className='flex gap-6'>
				{links.map((link) => (
					<li key={link.href}>
						<Link
							href={link.href}
							className={classNames({
								'text-zinc-500': true,
								'text-blue-600': link.href === currentPath,
								'hover:text-zinc-800 transition-colors': true,
							})}
						>
							{link.label}
						</Link>
					</li>
				))}
			</ul>
			<Box>
				{status === 'authenticated' && <Link href='/api/auth/signout'>Sign Out</Link>}
				{status === 'unauthenticated' && <Link href='/api/auth/signin'>Sign In</Link>}
			</Box>
		</nav>
	);
};

export default Navbar;
