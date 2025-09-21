import { Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gradient-hero border-t border-border/50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-4">
              Instagram Reels Downloader
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              The fastest and most reliable way to download Instagram Reels in HD quality. 
              Free, secure, and works on all devices.
            </p>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Features</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>HD Quality Downloads</li>
              <li>No Registration Required</li>
              <li>Works on All Devices</li>
              <li>Lightning Fast Processing</li>
              <li>100% Safe & Secure</li>
              <li>Unlimited Downloads</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Supported Content</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>Instagram Reels</li>
              <li>Instagram Stories</li>
              <li>Instagram Photos</li>
              <li>Instagram Videos</li>
              <li>IGTV Content</li>
              <li>Instagram Highlights</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 pt-8 text-center">
          <p className="text-muted-foreground flex items-center justify-center gap-1">
            Made with <Heart className="h-4 w-4 text-red-500 fill-current" /> for Instagram content creators
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            © 2024 Instagram Reels Downloader. This service is not affiliated with Instagram or Meta.
          </p>
        </div>
      </div>
    </footer>
  );
};