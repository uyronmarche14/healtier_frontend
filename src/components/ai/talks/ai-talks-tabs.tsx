import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Brain, Heart, Dumbbell, BrainCircuit, Sparkles } from 'lucide-react';
import type { AITalkTabConfig } from '@/types/ai-talks';

interface AITalkTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  newTabs?: string[];
  className?: string;
  messages?: any[];
}

const defaultTabs: AITalkTabConfig[] = [
  {
    id: 'general',
    label: 'General Health',
    icon: Brain,
    description: 'General health and wellness conversations',
    category: 'general',
    isNew: false,
    order: 1
  },
  {
    id: 'fitness',
    label: 'AI Fitness',
    icon: Dumbbell,
    description: 'Personalized fitness and exercise guidance',
    category: 'fitness',
    isNew: true,
    order: 2
  },
  {
    id: 'mental',
    label: 'Mental Health',
    icon: BrainCircuit,
    description: 'Mental wellness and emotional support',
    category: 'mental',
    isNew: true,
    order: 3
  },
  {
    id: 'nutrition',
    label: 'Nutrition',
    icon: Heart,
    description: 'Diet and nutrition advice',
    category: 'nutrition',
    isNew: false,
    order: 4
  }
];

export function AITalkTabs({
  activeTab,
  onTabChange,
  newTabs = ['fitness', 'mental'],
  className
}: AITalkTabsProps) {
  const initialTabs = defaultTabs.map(tab => ({
    ...tab,
    isNew: newTabs.includes(tab.id)
  }));
  const [tabs, setTabs] = useState<AITalkTabConfig[]>(initialTabs);
  const [showNewFeatureDialog, setShowNewFeatureDialog] = useState(false);

  const handleTabClick = (tabId: string) => {
    // Only trigger changes if the tab is actually changing
    if (tabId !== activeTab) {
      onTabChange(tabId);
      
      // Remove new badge when tab is clicked
      if (newTabs.includes(tabId)) {
        setTabs(prevTabs => 
          prevTabs.map(tab => 
            tab.id === tabId ? { ...tab, isNew: false } : tab
          )
        );
      }
    }
  };

  const handleNewFeatureClick = () => {
    setShowNewFeatureDialog(true);
  };

  return (
    <div className={className}>
      <Tabs value={activeTab} onValueChange={handleTabClick} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="relative data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </div>
                {tab.isNew && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 px-1 text-xs animate-pulse"
                  >
                    NEW
                  </Badge>
                )}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="space-y-4">
            <Card>
             
             
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {showNewFeatureDialog && (
        <Card className="fixed bottom-4 right-4 w-80 z-50 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              New Features Available!
            </CardTitle>
            <CardDescription>
              Check out our latest AI-powered health features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <Dumbbell className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-800">AI Fitness</h4>
                  <p className="text-sm text-green-700">
                    Get personalized workout recommendations and track your fitness journey
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                <BrainCircuit className="h-5 w-5 text-purple-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-purple-800">Mental Health</h4>
                  <p className="text-sm text-purple-700">
                    Access mental wellness tools and emotional support whenever you need it
                  </p>
                </div>
              </div>
            </div>
            
            <Button
              className="w-full mt-4"
              onClick={() => setShowNewFeatureDialog(false)}
            >
              Got it!
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}