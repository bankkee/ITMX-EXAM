import { FC, ReactNode } from "react";
import Navbar from "./Components/Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = (props) => {
  return (
    <>
      <div className="w-screen max-w-full h-screen max-h-screen">
        <Navbar />
        {props.children}
      </div>
    </>
  );
};

export default Layout;
