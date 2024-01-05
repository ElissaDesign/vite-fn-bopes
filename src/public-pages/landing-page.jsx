import Footer from "../components/commom/MainFooter";
import Hero from "../components/hero";
import Navbar from "../components/navBar";

export default function LandingPage() {
  return (
    <div className="h-screen dark:bg-dark-bg">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
}
