import BrutalHeader from "@/components/Header/BrutalHeader";
// import Footer from "@/components/Footer/Footer";

export default function MainLayout({ children }) {
    return (
        <>
            <BrutalHeader />
            <main className="brutal-main">{children}</main>
            {/* Footer integrated into BrutalContact section */}
        </>
    );
}
