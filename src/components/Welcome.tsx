import { Section, Typography } from "./Base";

export function Welcome() {
  return (
    <Section id="welcome" className="bg-background">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <Typography as="h2" className="text-left md:text-left">
            Bem-vindos
          </Typography>
          <Typography>
            Estamos muito felizes em compartilhar este momento tão especial com vocês. 
            Criamos este site para reunir todas as informações importantes para o nosso grande dia.
          </Typography>
          <Typography>
            Sua presença é o nosso maior presente!
          </Typography>
        </div>
        
        <div className="space-y-6 border-l border-accent/20 pl-12">
          <Typography as="h3" className="text-foreground/40 italic">
            Bienvenidos
          </Typography>
          <Typography className="text-foreground/60">
            Estamos muy felices de compartir este momento tan especial con ustedes. 
            Hemos creado este sitio para reunir toda la información importante para nuestro gran día.
          </Typography>
          <Typography className="text-foreground/60">
            ¡Su presencia es nuestro mayor regalo!
          </Typography>
        </div>
      </div>
    </Section>
  );
}
