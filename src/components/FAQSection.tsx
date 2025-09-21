import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

export const FAQSection = () => {
  const faqs = [
    {
      question: "Is it free to download Instagram Reels?",
      answer: "Yes, our Instagram Reels downloader is completely free to use. There are no hidden costs, subscription fees, or premium features. You can download unlimited Reels without any restrictions."
    },
    {
      question: "What video quality can I download?",
      answer: "You can download Instagram Reels in their original quality, which is typically up to 1080p HD. Our service preserves the original video quality without any compression or loss."
    },
    {
      question: "Do I need to install any software?",
      answer: "No, our service works directly in your web browser. You don't need to download or install any software, apps, or browser extensions. Just visit our website and start downloading."
    },
    {
      question: "Is it legal to download Instagram Reels?",
      answer: "Downloading Instagram content for personal use is generally acceptable, but you should respect copyright laws and the content creator's rights. Always ensure you have permission before using downloaded content commercially."
    },
    {
      question: "Does this work on mobile devices?",
      answer: "Yes, our downloader works perfectly on all devices including Android phones, iPhones, tablets, and desktop computers. The interface is fully responsive and optimized for mobile use."
    },
    {
      question: "Do you store the downloaded videos?",
      answer: "No, we do not store any videos or personal data on our servers. All downloads are processed in real-time and delivered directly to your device. Your privacy and security are our top priorities."
    },
    {
      question: "Can I download private Instagram Reels?",
      answer: "No, you can only download public Instagram Reels that are accessible without logging in. Private content cannot be downloaded due to Instagram's privacy settings and our respect for user privacy."
    },
    {
      question: "How fast is the download process?",
      answer: "Download speeds depend on your internet connection and the video file size. Typically, most Instagram Reels download within 10-30 seconds. Our optimized servers ensure the fastest possible download speeds."
    }
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about our Instagram Reels downloader
          </p>
        </div>

        <Card className="p-6 md:p-8 bg-gradient-card backdrop-blur-glass shadow-soft border-white/20">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border/50">
                <AccordionTrigger className="text-left hover:text-primary transition-colors duration-300">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>

        {/* Additional Help */}
        <div className="mt-12 text-center">
          <Card className="inline-block p-6 bg-accent/10 border-accent/20">
            <h3 className="text-lg font-semibold text-foreground mb-2">Still have questions?</h3>
            <p className="text-muted-foreground">
              Can't find the answer you're looking for? Our support team is here to help you with any questions about downloading Instagram Reels.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};