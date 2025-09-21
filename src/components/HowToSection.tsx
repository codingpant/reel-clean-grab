import { Card } from "@/components/ui/card";
import { Copy, Link, Download } from "lucide-react";

export const HowToSection = () => {
  const steps = [
    {
      icon: <Copy className="h-8 w-8" />,
      title: "Copy the URL",
      description: "Open Instagram, go to the Reels video you want to download, and copy the URL from the address bar or share button.",
      step: "01"
    },
    {
      icon: <Link className="h-8 w-8" />,
      title: "Paste the Link",
      description: "Return to our website and paste the Instagram Reels URL into the input field at the top of the page.",
      step: "02"
    },
    {
      icon: <Download className="h-8 w-8" />,
      title: "Download Video",
      description: "Click the 'Download' button and your Instagram Reel will be saved to your device in HD quality.",
      step: "03"
    }
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How to Download Instagram Reels?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Follow these simple steps to download any Instagram Reel in just a few clicks
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="relative p-8 bg-gradient-card backdrop-blur-glass shadow-soft border-white/20 hover:shadow-glass transition-all duration-300 group">
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-lg shadow-soft">
                {step.step}
              </div>
              
              {/* Icon */}
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <Card className="inline-block p-6 bg-accent/5 border-accent/20">
            <p className="text-accent font-medium">
              💡 <strong>Pro Tip:</strong> Works with all Instagram content types including Reels, Stories, Photos, and IGTV videos
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};