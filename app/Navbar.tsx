'use client';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BsBugFill } from 'react-icons/bs';

const links = [
	{ label: 'Dashboard', href: '/' },
	{ label: 'Issues', href: '/issues' },
];

const Navbar = () => {
	const currentPath = usePathname();
	classNames;
	return (
		<nav className='flex px-5 h-14 items-center space-x-6 border-b mb-5'>
			<Link href='/'>
				<BsBugFill className='fill-blue-700' />
			</Link>
			<ul className='flex gap-6'>
				{links.map((link) => (
					<Link
						href={link.href}
						className={classNames({
							'text-zinc-500': true,
							'text-blue-600': link.href === currentPath,
							'hover:text-zinc-800 transition-colors': true,
						})}
						key={link.href}
					>
						{link.label}
					</Link>
				))}
			</ul>
		</nav>
	);
};

export default Navbar;
