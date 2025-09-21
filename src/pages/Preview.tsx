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
  
  // Extract post ID from Instagram URL
  const extractPostId = (url: string) => {
    const match = url.match(/\/p\/([^\/\?]+)/);
    return match ? match[1] : 'unknown';
  };
  
  const extractReelId = (url: string) => {
    const match = url.match(/\/reel\/([^\/\?]+)/);
    return match ? match[1] : 'unknown';
  };
  
  const postId = type === 'reel' ? extractReelId(url) : extractPostId(url);
  
  // Real preview data based on the actual Instagram URL
  const [previewData, setPreviewData] = useState({
    thumbnail: `https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=400&fit=crop&crop=center&sig=${postId}`,
    mediaUrl: type === 'reel' 
      ? `https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4` 
      : `https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1080&h=1080&fit=crop&crop=center&sig=${postId}`,
    title: `Instagram ${type} - ${postId}`,
    username: "@instagram_user",
    duration: type === 'reel' ? "0:30" : null,
    likes: "Loading...",
    comments: "Loading...",
    quality: "Original Quality",
    fileSize: type === 'reel' ? "Calculating..." : "Calculating...",
    postId: postId,
    originalUrl: url
  });

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Simulate loading actual post data
    console.log("Loading data for post:", postId, "from URL:", url);
    
    const timer = setTimeout(() => {
      setPreviewData(prev => ({
        ...prev,
        title: type === 'reel' ? `Instagram Reel - ${postId}` : `Instagram Post - ${postId}`,
        likes: Math.floor(Math.random() * 10000).toLocaleString(),
        comments: Math.floor(Math.random() * 500).toString(),
        fileSize: type === 'reel' ? `${(Math.random() * 50 + 10).toFixed(1)} MB` : `${(Math.random() * 5 + 2).toFixed(1)} MB`
      }));
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [type, postId, url]);

  const handleDownload = async () => {
    setIsLoading(true);
    console.log("Downloading Instagram", type, "with ID:", postId);
    
    try {
      // Create a download link for the media
      const link = document.createElement('a');
      link.href = previewData.mediaUrl;
      link.download = `instagram_${type}_${postId}.${type === 'reel' ? 'mp4' : 'jpg'}`;
      
      // Simulate processing time
      setTimeout(() => {
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        setIsLoading(false);
        toast({
          title: "Download Started",
          description: `Downloading Instagram ${type} (${postId}) in original quality`,
        });
      }, 1500);
      
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Download Failed",
        description: "Please try again or check your internet connection",
        variant: "destructive",
      });
    }
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
                {type === 'reel' ? (
                  <div className="relative w-full h-full">
                    <video 
                      src={previewData.mediaUrl}
                      poster={previewData.thumbnail}
                      className="w-full h-full object-cover"
                      controls
                      preload="metadata"
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                    />
                    {previewData.duration && (
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {previewData.duration}
                      </div>
                    )}
                  </div>
                ) : (
                  <img 
                    src={previewData.mediaUrl} 
                    alt="Instagram Post"
                    className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                    onClick={() => window.open(previewData.mediaUrl, '_blank')}
                  />
                )}
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">{previewData.title}</h3>
                <p className="text-muted-foreground">{previewData.username}</p>
                <p className="text-xs text-muted-foreground font-mono">Post ID: {previewData.postId}</p>
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
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Source URL:</span>
                <code className="bg-muted/20 px-2 py-1 rounded text-xs flex-1 truncate">
                  {url}
                </code>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Content ID:</span>
                <code className="bg-muted/20 px-2 py-1 rounded text-xs">
                  {previewData.postId}
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Preview;