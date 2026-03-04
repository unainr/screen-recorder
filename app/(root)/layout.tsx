import Footer from "@/components/layouts/footer";
import { Header } from "@/components/layouts/header";
import { MainHeader } from "@/components/layouts/main-header";
import { RootLayout } from "@/types";

const Layout = ({ children }: RootLayout) => {
	return (
		<>
			<MainHeader />
			{children}
			<Footer/>
		</>
	);
};

export default Layout;
