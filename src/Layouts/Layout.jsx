import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="">
        <section>
          <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow">
            <Outlet />
          </div>
        </section>
      </div>
    </>
  );
};

export default Layout;
