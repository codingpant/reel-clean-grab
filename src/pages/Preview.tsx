import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, ArrowLeft, Play, Image, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Preview = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const url = searchParams.get('url') || '';
  const type = searchParams.get('type') || 'post';
  
  // Mock preview data - in real app this would come from API
  const [previewData, setPreviewData] = useState({
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=400&fit=crop&crop=center",
    title: "Amazing sunset view",
    username: "@johndoe",
    duration: type === 'reel' ? "0:30" : null,
    likes: "1,234",
    comments: "56",
    quality: "HD 1080p",
    fileSize: "15.2 MB"
  });

  useEffect(() => {
    // Simulate loading preview data
    const timer = setTimeout(() => {
      setPreviewData(prev => ({
        ...prev,
        title: type === 'reel' ? "Epic Instagram Reel" : "Beautiful Instagram Post"
      }));
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [type]);

  const handleDownload = async () => {
    setIsLoading(true);
    
    // Simulate download
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Download Complete",
        description: `Your Instagram ${type} has been downloaded successfully`,
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-hero p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="outline" size="sm" className="bg-background/10 border-white/20 text-foreground hover:bg-background/20">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Preview & Download</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Preview Card */}
          <Card className="bg-gradient-card backdrop-blur-glass border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {type === 'reel' ? <Video className="h-5 w-5" /> : <Image className="h-5 w-5" />}
                Content Preview
                <Badge variant="secondary" className="ml-auto">
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                <img 
                  src={previewData.thumbnail} 
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                {type === 'reel' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/50 rounded-full p-3">
                      <Play className="h-8 w-8 text-white" fill="white" />
                    </div>
                  </div>
                )}
                {previewData.duration && (
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {previewData.duration}
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">{previewData.title}</h3>
                <p className="text-muted-foreground">{previewData.username}</p>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span>❤️ {previewData.likes}</span>
                  <span>💬 {previewData.comments}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Download Info Card */}
          <Card className="bg-gradient-card backdrop-blur-glass border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Download Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Quality:</span>
                  <span className="font-medium">{previewData.quality}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">File Size:</span>
                  <span className="font-medium">{previewData.fileSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Format:</span>
                  <span className="font-medium">{type === 'reel' ? 'MP4' : 'JPG'}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-border/20">
                <p className="text-sm text-muted-foreground mb-4">
                  Ready to download? Click the button below to save this {type} to your device.
                </p>
                
                <Button 
                  onClick={handleDownload}
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-primary hover:shadow-glass transition-all duration-300 text-lg font-semibold"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white mr-2"></div>
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="h-5 w-5 mr-2" />
                      Download {type.charAt(0).toUpperCase() + type.slice(1)}
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Source URL */}
        <Card className="mt-8 bg-gradient-card backdrop-blur-glass border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Source:</span>
              <code className="bg-muted/20 px-2 py-1 rounded text-xs flex-1 truncate">
                {url}
              </code>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Preview;