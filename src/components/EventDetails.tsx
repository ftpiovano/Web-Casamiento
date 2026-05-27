'use client';

import { MapPin, Clock, Calendar, Plane } from 'lucide-react';
import { siteConfig } from '@/site.config';
import { Section, Typography, Card, Button } from './Base';
import { useLanguage } from '@/context/LanguageContext';

/**
 * Props for the EventCard component.
 */
interface EventProps {
  title: string;
  dateTime: string;
  locationName: string;
  address: string;
  mapLink: string;
  flightPackagesUrl: string;
  id: string;
}

/**
 * Renders a single event information card.
 * @param {EventProps} props component properties.
 * @return {JSX.Element} The rendered event card.
 */
function EventCard({ title, dateTime, locationName, address, mapLink, flightPackagesUrl }: EventProps) {
  const { region } = useLanguage();
  
  const time = new Date(dateTime).toLocaleTimeString(region === 'br' ? 'pt-BR' : region === 'ar' ? 'es-AR' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  /**
   * Generates and downloads an .ics file for the event.
   */
  const handleAddToCalendar = () => {
    const event = {
      title: `${siteConfig.names.bride} & ${siteConfig.names.groom} Wedding - ${title}`,
      start: dateTime,
      duration: '0400', // 4 hours
      location: `${locationName}, ${address}`,
    };

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `SUMMARY:${event.title}`,
      `DTSTART:${event.start.replace(/[-:]/g, '')}`,
      'DURATION:PT4H',
      `LOCATION:${event.location}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${event.title}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const labels = {
    br: { map: 'Abrir Mapa', cal: 'Calendário', flights: 'Pacotes de Voo' },
    ar: { map: 'Abrir Mapa', cal: 'Calendario', flights: 'Paquetes de Vuelo' },
    en: { map: 'Open Map', cal: 'Calendar', flights: 'Flight Packages' },
  };

  const currentLabels = labels[region] || labels.en;

  return (
    <Card className='flex flex-col items-center text-center'>
      <Typography as='h3'>{title}</Typography>
      
      <div className='space-y-4 mb-8'>
        <div className='flex flex-col items-center'>
          <Clock className='text-primary/60 mb-2' size={20} />
          <Typography className='text-sm uppercase tracking-wider'>{time}</Typography>
        </div>
        
        <div className='flex flex-col items-center'>
          <MapPin className='text-primary/60 mb-2' size={20} />
          <Typography className='font-medium'>{locationName}</Typography>
          <Typography className='text-sm opacity-60'>{address}</Typography>
        </div>
      </div>

      <div className='flex flex-col gap-3 w-full'>
        <a href={mapLink} target='_blank' rel='noopener noreferrer' className='w-full'>
          <Button variant='outline' className='w-full'>
            <MapPin size={16} className='mr-2 inline' />
            {currentLabels.map}
          </Button>
        </a>
        <Button variant='secondary' onClick={handleAddToCalendar} className='w-full'>
          <Calendar size={16} className='mr-2 inline' />
          {currentLabels.cal}
        </Button>
        <a href={flightPackagesUrl} target='_blank' rel='noopener noreferrer' className='w-full'>
          <Button variant='outline' className='w-full'>
            <Plane size={16} className='mr-2 inline' />
            {currentLabels.flights}
          </Button>
        </a>
      </div>
    </Card>
  );
}

/**
 * Component displaying wedding event details for different locations.
 * @return {JSX.Element} The rendered event details section.
 */
export function EventDetails() {
  const { region } = useLanguage();
  
  const sectionTitles = {
    br: 'Onde & Quando',
    ar: 'Dónde & Cuándo',
    en: 'Where & When',
  };

  return (
    <Section id='ceremony' className='bg-background'>
      <Typography as='h2'>{sectionTitles[region]}</Typography>
      <div className='grid md:grid-cols-2 gap-8 mt-12'>
        <EventCard
          id='argentina'
          title={siteConfig.events.ar.title}
          dateTime={siteConfig.events.ar.dateTime}
          locationName={siteConfig.events.ar.locationName}
          address={siteConfig.events.ar.address}
          mapLink={siteConfig.events.ar.mapLink}
          flightPackagesUrl={siteConfig.events.ar.flightPackagesUrl}
        />
        <EventCard
          id='brasil'
          title={siteConfig.events.br.title}
          dateTime={siteConfig.events.br.dateTime}
          locationName={siteConfig.events.br.locationName}
          address={siteConfig.events.br.address}
          mapLink={siteConfig.events.br.mapLink}
          flightPackagesUrl={siteConfig.events.br.flightPackagesUrl}
        />
      </div>
    </Section>
  );
}
