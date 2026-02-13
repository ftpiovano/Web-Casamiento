"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Section, Typography, Card, Button } from "./Base";

interface Message {
  name: string;
  text: string;
  date: string;
}

export function Guestbook() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [formData, setFormData] = useState({ name: "", text: "" });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("wedding_messages") || "[]");
    setMessages(saved);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.text) return;

    const newMessage = {
      ...formData,
      date: new Date().toLocaleDateString("pt-BR"),
    };

    const updated = [newMessage, ...messages];
    setMessages(updated);
    localStorage.setItem("wedding_messages", JSON.stringify(updated));
    setFormData({ name: "", text: "" });
  };

  return (
    <Section id="messages" className="bg-accent/5">
      <Typography as="h2">Mural de Mensagens</Typography>
      
      <div className="max-w-4xl mx-auto">
        <Card className="mb-12">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              required
              placeholder="Seu Nome"
              className="w-full bg-accent/5 border border-accent/20 rounded-lg px-4 py-3 outline-none focus:border-primary/50"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <textarea
              required
              placeholder="Deixe uma mensagem para o casal..."
              className="w-full bg-accent/5 border border-accent/20 rounded-lg px-4 py-3 outline-none focus:border-primary/50 min-h-[100px]"
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
            />
            <Button type="submit">Enviar Mensagem</Button>
          </form>
        </Card>

        <div className="grid gap-6">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="py-6 px-8">
                <div className="flex justify-between items-center mb-4">
                  <Typography as="h4" className="mb-0 text-primary">{msg.name}</Typography>
                  <span className="text-xs text-foreground/40">{msg.date}</span>
                </div>
                <Typography className="italic">"{msg.text}"</Typography>
              </Card>
            </motion.div>
          ))}
          {messages.length === 0 && (
            <Typography className="text-center opacity-40 py-12">Seja o primeiro a deixar uma mensagem!</Typography>
          )}
        </div>
      </div>
    </Section>
  );
}
