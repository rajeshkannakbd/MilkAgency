import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div style={{ padding: "15px" }}>{children}</div>
    </>
  );
};

export default Layout;