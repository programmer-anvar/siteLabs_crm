import React, { ReactNode } from 'react';
import Sitebar from './sitebar/Sitebar';

interface LayoutProps {
	children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		// eslint-disable-next-line react/jsx-filename-extension
		<>
			<div className="bg-[#203674] h-[100vh]  ">
				<div className="flex h-full bg-orange-400 ">
					<Sitebar />
					<div className="w-full bg-[#F1F5F8] overflow-hidden  px-8 py-[25px]">
						{children}
					</div>
				</div>
			</div>
		</>
	);
};

export default Layout;
