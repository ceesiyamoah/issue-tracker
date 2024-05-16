import Link from 'next/link';
import { BsBugFill } from 'react-icons/bs';

const links = [
	{ label: 'Dashboard', href: '/dashboard' },
	{ label: 'Issues', href: '/issues' },
];

const Navbar = () => {
	return (
		<nav className='flex px-5 h-14 items-center space-x-6 border-b mb-5'>
			<Link href='/'>
				<BsBugFill className='fill-blue-700' />
			</Link>
			<ul className='flex gap-6'>
				{links.map((link) => (
					<Link href={link.href} className='text-zinc-500 hover:text-zinc-800 transition-colors' key={link.href}>
						{link.label}
					</Link>
				))}
			</ul>
		</nav>
	);
};

export default Navbar;
