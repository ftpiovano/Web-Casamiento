import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Welcome } from '@/components/Welcome';
import { Countdown } from '@/components/Countdown';
import { EventDetails } from '@/components/EventDetails';
import { GiftGrid } from '@/components/GiftGrid';
import { RSVPForm } from '@/components/RSVPForm';
import { Guestbook } from '@/components/Guestbook';

/**
 * The main landing page for the wedding website.
 * @return {JSX.Element} The rendered home page.
 */
export default function Home() {
  return (
    <main className='relative'>
      <Navbar />
      <Hero />
      <Welcome />
      <Countdown />
      
      <section id='couple' className='h-[50vh] flex items-center justify-center bg-background'>
        <h2 className='text-4xl font-heading'>The Couple</h2>
      </section>

      <EventDetails />
      <GiftGrid />
      <RSVPForm />
      <Guestbook />
    </main>
  );
}
