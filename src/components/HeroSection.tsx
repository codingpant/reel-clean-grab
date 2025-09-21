import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Download, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const HeroSection = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "URL Pasted",
        description: "Instagram URL has been pasted successfully",
      });
    } catch (err) {
      toast({
        title: "Paste Failed",
        description: "Please manually paste the URL",
        variant: "destructive",
      });
    }
  };

  const detectUrlType = (url: string) => {
    if (url.includes('/p/')) return 'post';
    if (url.includes('/reel/')) return 'reel';
    if (url.includes('instagram.com/') && !url.includes('/p/') && !url.includes('/reel/')) {
      // Profile URL
      return 'profile';
    }
    return 'post'; // default
  };

  const handleDownload = async () => {
    console.log("Download button clicked, URL:", url);
    
    if (!url.trim()) {
      console.log("No URL provided");
      toast({
        title: "URL Required",
        description: "Please enter an Instagram URL",
        variant: "destructive",
      });
      return;
    }

    if (!url.includes("instagram.com")) {
      console.log("Invalid URL - not an Instagram URL:", url);
      toast({
        title: "Invalid URL",
        description: "Please enter a valid Instagram URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    console.log("Processing URL...");
    
    const urlType = detectUrlType(url);
    console.log("Detected URL type:", urlType);
    
    // Simulate processing
    setTimeout(() => {
      setIsLoading(false);
      console.log("Redirecting to:", urlType === 'profile' ? '/profile' : '/preview');
      
      if (urlType === 'profile') {
        navigate(`/profile?url=${encodeURIComponent(url)}`);
      } else {
        navigate(`/preview?url=${encodeURIComponent(url)}&type=${urlType}`);
      }
    }, 1500);
  };

  return (
    <section className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto text-center">
        {/* Hero Title */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 tracking-tight">
            Instagram
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Downloader</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Download Instagram posts, reels, stories & profiles in HD quality. Fast, secure, and works on all devices.
          </p>
        </div>

        {/* Download Form */}
        <Card className="p-6 md:p-8 bg-gradient-card backdrop-blur-glass shadow-glass border-white/20 mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Input
                type="url"
                placeholder="Paste Instagram URL here (posts, reels, or profiles)..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="h-14 text-lg bg-input/50 border-border/50 focus:border-primary/50 transition-all duration-300"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePaste}
                className="absolute right-2 top-2 h-10 px-3 text-muted-foreground hover:text-foreground"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Pasted" : "Paste"}
              </Button>
            </div>
            <Button
              onClick={handleDownload}
              disabled={isLoading}
              className="h-14 px-8 bg-gradient-primary hover:shadow-glass transition-all duration-300 text-lg font-semibold"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Download className="h-5 w-5 mr-2" />
                  Continue
                </>
              )}
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Simply paste any Instagram URL above - posts, reels, or profiles - and we'll help you download the content
          </p>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-soft">
              <Download className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">HD Quality</h3>
            <p className="text-muted-foreground">Download Instagram content in full HD quality without any loss</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-soft">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
            <p className="text-muted-foreground">Download your favorite content in seconds with our optimized servers</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-soft">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Safe & Secure</h3>
            <p className="text-muted-foreground">Your privacy is protected with secure downloads and no data storage</p>
          </div>
        </div>
      </div>
    </section>
  );
};