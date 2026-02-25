import { Header } from "@/components/layouts/header";
import { RootLayout } from "@/types";

const Layout = ({ children }: RootLayout) => {
	return (
		<>
			<Header />
			{children}
		</>
	);
};

export default Layout;
