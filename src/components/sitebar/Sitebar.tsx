import {
	Employees,
	Groups,
	Kub,
	Rashods,
	Settings,
	Statistic,
	Zone,
} from '@/assets/sitebar/SitebarSvgIcons';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sitebar: React.FC = () => {
	const [isHovered, setIsHovered] = useState(false);
	const [activeLink, setActiveLink] = useState<string>('');
	const navigate = useNavigate();

	const handleMouseEnter = () => {
		setIsHovered(true);
	};
	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	const handleLinkClick = (to: string, label: string) => {
		setActiveLink(label);
		navigate(to);
	};

	const links = [
		{ to: '/', label: 'Xodimlar', icon: <Employees /> },
		{ to: '/statistika', label: 'Statistika', icon: <Statistic /> },
		{ to: '/rasxodlar', label: 'Rasxodlar', icon: <Rashods /> },
		// { to: '/oyliklar', label: 'Oyliklar', icon: <Money color="white" /> },
		{ to: '/sotuv', label: 'Sotuv bo’limi', icon: <Groups /> },
		{ to: '/ishlabchiqarish', label: 'Ishlab chiqarish', icon: <Kub /> },
		{ to: '/ombor', label: 'Ombor', icon: <Zone /> },
		{ to: '/sozlamalar', label: 'Sozlamalar', icon: <Settings /> },
	];
	return (
		<div
			className="w-[100px] h-[100%] bg-orange-400 transition-all flex flex-col justify-between"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			style={{
				width: isHovered ? '250px' : '100px',
				transition: 'width 0.3s ease',
			}}
		>
			<div className="w-full py-6 pt-[40px] px-5">
				<div className="flex flex-col justify-center items-center">
					<h1>Logo</h1>
				</div>
				<div className="">
					{links.map((link) => (
						<div
							key={link.label}
							onClick={() => handleLinkClick(link.to, link.label)}
							className={`flex gap-2 p-2 mt-2 cursor-pointer rounded-[5px] ${
								!isHovered ? 'justify-center' : 'justify-start'
							} ${
								activeLink === link.label
									? 'bg-orange-400 text-[#fff]'
									: 'text-[#9EA3B5]'
							} `}
						>
							<div className="w-[22px] h-[22px] flex justify-center items-center">
								{link.icon}
							</div>
							<div
								className={`text-base overflow-hidden whitespace-nowrap transition-all duration-500 ${
									isHovered ? 'opacity-100 max-w-[200px]' : 'opacity-0 max-w-0'
								}`}
							>
								{isHovered && <h3 className="text-[15px] ">{link.label}</h3>}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Sitebar;
