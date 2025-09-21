import { Card } from "@/components/ui/card";
import { 
  Smartphone, 
  Shield, 
  Clock, 
  Download, 
  Users, 
  Star,
  Zap,
  Heart
} from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "All Devices Supported",
      description: "Works perfectly on Android, iPhone, iPad, Windows, Mac, and any device with a web browser."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "100% Safe & Private",
      description: "No registration required. We don't store your data or downloaded videos. Complete privacy guaranteed."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Lightning Fast",
      description: "Download Instagram Reels in seconds with our optimized servers and advanced processing technology."
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: "HD Quality Downloads",
      description: "Get the highest quality available - download videos in their original resolution up to 1080p."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "No Limits",
      description: "Download unlimited Instagram Reels without any restrictions. No daily limits or premium requirements."
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Always Free",
      description: "Our service is completely free forever. No hidden costs, no subscriptions, no premium features."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "No Software Required",
      description: "Works directly in your browser. No need to download or install any software or apps."
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "User Friendly",
      description: "Simple and intuitive interface. Just paste the URL and click download - it's that easy!"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-hero">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose Our Instagram Downloader?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The most reliable and feature-rich Instagram Reels downloader with everything you need
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 bg-gradient-card backdrop-blur-glass shadow-soft border-white/20 hover:shadow-glass transition-all duration-300 group">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                {feature.icon}
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="inline-block p-8 bg-gradient-primary text-white shadow-elevated">
            <h3 className="text-2xl font-bold mb-4">Ready to Download Instagram Reels?</h3>
            <p className="text-white/90 mb-6 max-w-md">
              Join millions of users who trust our service for downloading their favorite Instagram content
            </p>
            <a 
              href="#hero" 
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-white/90 transition-colors duration-300"
            >
              Start Downloading Now
              <Download className="h-5 w-5 ml-2" />
            </a>
          </Card>
        </div>
      </div>
    </section>
  );
};