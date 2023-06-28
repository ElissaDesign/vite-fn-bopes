import Hero from "../components/hero";
import Navbar from "../components/navBar";

export default function LandingPage() {
  return (
    <div className="dark:bg-dark-bg">
      <Navbar />

      <Hero />
    </div>
  );
}
