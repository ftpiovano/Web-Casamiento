import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      
      <section id="home" className="h-screen flex items-center justify-center bg-accent/10">
        <h1 className="text-6xl font-heading text-center">Alexita & Chico</h1>
      </section>

      <section id="couple" className="h-screen flex items-center justify-center bg-background">
        <h2 className="text-4xl font-heading">The Couple</h2>
      </section>

      <section id="ceremony" className="h-screen flex items-center justify-center bg-accent/10">
        <h2 className="text-4xl font-heading">Ceremony</h2>
      </section>

      <section id="reception" className="h-screen flex items-center justify-center bg-background">
        <h2 className="text-4xl font-heading">Reception</h2>
      </section>

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
