import Navbar from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Welcome } from "@/components/Welcome";
import { Countdown } from "@/components/Countdown";
import { EventDetails } from "@/components/EventDetails";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Welcome />
      <Countdown />
      
      <section id="couple" className="h-screen flex items-center justify-center bg-background">
        <h2 className="text-4xl font-heading">The Couple</h2>
      </section>

      <EventDetails />

      <section id="gifts" className="h-screen flex items-center justify-center bg-accent/10">
        <h2 className="text-4xl font-heading">Gift List</h2>
      </section>

      <section id="rsvp" className="h-screen flex items-center justify-center bg-background">
        <h2 className="text-4xl font-heading">RSVP</h2>
      </section>

      <section id="messages" className="h-screen flex items-center justify-center bg-accent/10">
        <h2 className="text-4xl font-heading">Messages</h2>
      </section>
    </main>
  );
}
