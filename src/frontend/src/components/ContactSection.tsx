import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactSection() {
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSending(false);
    toast.success("Message sent! We'll be in touch.", {
      className: "bg-background border border-primary text-foreground",
    });
  };

  return (
    <section
      id="contact"
      className="relative py-24 px-4 border-t border-border"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-japanese text-xs tracking-[0.4em] text-primary mb-3 uppercase">
            お問い合わせ
          </p>
          <h2 className="font-display text-5xl md:text-6xl tracking-widest text-foreground">
            CONTACT
          </h2>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              placeholder="Your Name"
              required
              data-ocid="contact.input"
              className="bg-card border-border focus:border-primary font-body h-12"
            />
            <Input
              type="email"
              placeholder="Your Email"
              required
              data-ocid="contact.input"
              className="bg-card border-border focus:border-primary font-body h-12"
            />
          </div>
          <Input
            placeholder="Subject"
            data-ocid="contact.input"
            className="bg-card border-border focus:border-primary font-body h-12"
          />
          <Textarea
            placeholder="Your message..."
            rows={5}
            data-ocid="contact.textarea"
            className="bg-card border-border focus:border-primary font-body resize-none"
          />
          <Button
            type="submit"
            size="lg"
            disabled={sending}
            data-ocid="contact.submit_button"
            className="font-display tracking-widest bg-primary hover:bg-zen-red-bright text-primary-foreground h-12"
          >
            {sending ? "SENDING..." : "SEND MESSAGE"}
          </Button>
        </motion.form>
      </div>
    </section>
  );
}
