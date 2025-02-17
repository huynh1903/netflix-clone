import Footer from "@/components/Footer";
import Header from "@/components/Header";

import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen w-full bg-slate-900 mt-16 flex justify-center py-6">
        <div className="w-11/12">
          <div className="flex justify-center bg-slate-800 rounded my-4">
            <h4 className="text-orange-500 text-sm font-medium uppercase p-2">Nếu không tải nội dung, vui lòng nhấn F5 hoặc tải lại trang bạn nhé.</h4>
          </div>
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
