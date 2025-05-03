import Header from "@/components/global/header";
import AppProvider from "@/providers/AppProvider";
import DownTabs from "@components/global/downTabs";

export default function Layout({ children }: any) {
  return (
    <>
      <Header />
      <AppProvider>
        <main>{children}</main>
      </AppProvider>
      <DownTabs />
    </>
  );
}
