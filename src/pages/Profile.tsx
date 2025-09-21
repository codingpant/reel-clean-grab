import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Download, 
  ArrowLeft, 
  User, 
  Grid3X3, 
  Video, 
  Camera, 
  Bookmark,
  Play,
  Image
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Profile = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { toast } = useToast();
  
  const url = searchParams.get('url') || '';
  
  // Mock profile data
  const [profileData, setProfileData] = useState({
    username: "johndoe",
    fullName: "John Doe",
    bio: "Photography enthusiast 📸 | Travel blogger ✈️",
    followers: "15.2K",
    following: "892",
    posts: "156",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    verified: false
  });

  const mockContent = {
    posts: Array.from({ length: 12 }, (_, i) => ({
      id: `post-${i}`,
      thumbnail: `https://images.unsplash.com/photo-${1500000000000 + i}?w=300&h=300&fit=crop`,
      type: 'image',
      likes: Math.floor(Math.random() * 1000) + 100
    })),
    reels: Array.from({ length: 8 }, (_, i) => ({
      id: `reel-${i}`,
      thumbnail: `https://images.unsplash.com/photo-${1600000000000 + i}?w=300&h=300&fit=crop`,
      type: 'video',
      duration: `0:${15 + Math.floor(Math.random() * 45)}`,
      views: Math.floor(Math.random() * 10000) + 1000
    })),
    stories: Array.from({ length: 5 }, (_, i) => ({
      id: `story-${i}`,
      thumbnail: `https://images.unsplash.com/photo-${1700000000000 + i}?w=300&h=300&fit=crop`,
      type: 'story',
      timestamp: `${i + 1}h ago`
    })),
    highlights: Array.from({ length: 6 }, (_, i) => ({
      id: `highlight-${i}`,
      name: ['Travel', 'Food', 'Photography', 'Nature', 'Sunset', 'Adventure'][i],
      thumbnail: `https://images.unsplash.com/photo-${1800000000000 + i}?w=300&h=300&fit=crop`,
      count: Math.floor(Math.random() * 20) + 5
    }))
  };

  useEffect(() => {
    // Simulate loading profile data
    const timer = setTimeout(() => {
      setProfileData(prev => ({
        ...prev,
        username: url.split('/').pop() || 'johndoe'
      }));
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [url]);

  const handleItemSelect = (itemId: string, checked: boolean) => {
    setSelectedItems(prev => 
      checked 
        ? [...prev, itemId]
        : prev.filter(id => id !== itemId)
    );
  };

  const handleSelectAll = (type: string, checked: boolean) => {
    const items = mockContent[type as keyof typeof mockContent];
    const itemIds = items.map(item => item.id);
    
    setSelectedItems(prev => 
      checked 
        ? [...prev, ...itemIds]
        : prev.filter(id => !itemIds.includes(id))
    );
  };

  const handleDownload = async () => {
    if (selectedItems.length === 0) {
      toast({
        title: "No Items Selected",
        description: "Please select at least one item to download",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate download
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Download Started",
        description: `Downloading ${selectedItems.length} items from @${profileData.username}`,
      });
      setSelectedItems([]);
    }, 2000);
  };

  const ContentGrid = ({ items, type }: { items: any[], type: string }) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <div key={item.id} className="relative group">
          <div className="aspect-square rounded-lg overflow-hidden bg-muted relative">
            <img 
              src={item.thumbnail} 
              alt={`${type} thumbnail`}
              className="w-full h-full object-cover"
            />
            
            {/* Overlay for videos */}
            {(item.type === 'video' || type === 'reels') && (
              <div className="absolute top-2 right-2">
                <Video className="h-4 w-4 text-white drop-shadow-lg" />
              </div>
            )}
            
            {/* Duration for reels */}
            {item.duration && (
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1 py-0.5 rounded">
                {item.duration}
              </div>
            )}
            
            {/* Engagement stats overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="text-white text-sm font-medium">
                {item.likes && `❤️ ${item.likes}`}
                {item.views && `👁️ ${item.views}`}
                {item.count && `${item.count} items`}
              </div>
            </div>
            
            {/* Selection checkbox */}
            <div className="absolute top-2 left-2">
              <Checkbox
                checked={selectedItems.includes(item.id)}
                onCheckedChange={(checked) => handleItemSelect(item.id, checked as boolean)}
                className="bg-white/80 border-white data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
            </div>
          </div>
          
          {/* Highlight name */}
          {type === 'highlights' && (
            <p className="text-center text-sm mt-2 font-medium truncate">{item.name}</p>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-hero p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="outline" size="sm" className="bg-background/10 border-white/20 text-foreground hover:bg-background/20">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Profile Download</h1>
        </div>

        {/* Profile Header */}
        <Card className="bg-gradient-card backdrop-blur-glass border-white/20 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <img 
                  src={profileData.avatar} 
                  alt={`@${profileData.username}`}
                  className="w-24 h-24 rounded-full object-cover"
                />
                {profileData.verified && (
                  <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl font-bold">@{profileData.username}</h2>
                </div>
                <h3 className="text-lg text-muted-foreground mb-2">{profileData.fullName}</h3>
                <p className="text-muted-foreground mb-4">{profileData.bio}</p>
                
                <div className="flex gap-6 text-sm">
                  <div className="text-center">
                    <div className="font-bold">{profileData.posts}</div>
                    <div className="text-muted-foreground">Posts</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold">{profileData.followers}</div>
                    <div className="text-muted-foreground">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold">{profileData.following}</div>
                    <div className="text-muted-foreground">Following</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Tabs */}
        <div className="space-y-6">
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-background/10 backdrop-blur-glass">
              <TabsTrigger value="posts" className="flex items-center gap-2">
                <Grid3X3 className="h-4 w-4" />
                Posts
              </TabsTrigger>
              <TabsTrigger value="reels" className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                Reels
              </TabsTrigger>
              <TabsTrigger value="stories" className="flex items-center gap-2">
                <Camera className="h-4 w-4" />
                Stories
              </TabsTrigger>
              <TabsTrigger value="highlights" className="flex items-center gap-2">
                <Bookmark className="h-4 w-4" />
                Highlights
              </TabsTrigger>
            </TabsList>

            {['posts', 'reels', 'stories', 'highlights'].map((type) => (
              <TabsContent key={type} value={type} className="space-y-4">
                <Card className="bg-gradient-card backdrop-blur-glass border-white/20">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {type === 'posts' && <Grid3X3 className="h-5 w-5" />}
                      {type === 'reels' && <Video className="h-5 w-5" />}
                      {type === 'stories' && <Camera className="h-5 w-5" />}
                      {type === 'highlights' && <Bookmark className="h-5 w-5" />}
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                      <Badge variant="secondary" className="ml-2">
                        {mockContent[type as keyof typeof mockContent].length} items
                      </Badge>
                    </CardTitle>
                    
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={mockContent[type as keyof typeof mockContent].every(item => selectedItems.includes(item.id))}
                        onCheckedChange={(checked) => handleSelectAll(type, checked as boolean)}
                      />
                      <label className="text-sm font-medium">Select All</label>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ContentGrid items={mockContent[type as keyof typeof mockContent]} type={type} />
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>

          {/* Download Section */}
          {selectedItems.length > 0 && (
            <Card className="bg-gradient-card backdrop-blur-glass border-white/20 sticky bottom-4">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary" className="text-base px-3 py-1">
                      {selectedItems.length} items selected
                    </Badge>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedItems([])}
                      className="bg-background/10 border-white/20 text-foreground hover:bg-background/20"
                    >
                      Clear Selection
                    </Button>
                  </div>
                  
                  <Button 
                    onClick={handleDownload}
                    disabled={isLoading}
                    className="bg-gradient-primary hover:shadow-glass transition-all duration-300 font-semibold px-8"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white mr-2"></div>
                        Downloading...
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4 mr-2" />
                        Download Selected
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;