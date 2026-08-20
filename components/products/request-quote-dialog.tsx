"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type RequestQuoteDialogProps = { productId: string; productName: string };

export function RequestQuoteDialog({ productId, productName }: RequestQuoteDialogProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const response = await fetch("/api/request-quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, email, message }),
    });
    setStatus(response.ok ? "success" : "error");
    if (response.ok) setEmail("");
  }

  return (
    <Dialog open={open} onOpenChange={(value) => { setOpen(value); if (!value) setStatus("idle"); }}>
      <DialogTrigger render={<Button className="bg-brand text-brand-foreground hover:opacity-90" />}>
        Request quote
      </DialogTrigger>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>Request a quote</DialogTitle>
          <DialogDescription>Tell us where to send pricing and product information for {productName}.</DialogDescription>
        </DialogHeader>
        {status === "success" ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <CheckCircle2 className="size-10 text-brand" aria-hidden="true" />
            <p className="font-medium text-foreground">Request received</p>
            <p className="text-sm text-muted-foreground">A confirmation has been sent to your email address.</p>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Close</Button>
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="quote-email">Email address</Label>
              <Input id="quote-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@company.com" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="quote-message">More information <span className="text-muted-foreground">(optional)</span></Label>
              <Textarea id="quote-message" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Project details, quantities, or delivery requirements" rows={4} />
            </div>
            {status === "error" ? <p role="alert" className="text-sm text-destructive">We couldn&apos;t send your request. Please try again.</p> : null}
            <DialogFooter>
              <Button type="submit" disabled={status === "sending"} className="bg-brand text-brand-foreground hover:opacity-90">
                {status === "sending" ? <Loader2 className="animate-spin" data-icon="inline-start" aria-hidden="true" /> : null}
                Send request
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default RequestQuoteDialog;
