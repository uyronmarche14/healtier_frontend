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
  const [tabs, setTabs] = useState<AITalkTabConfig[]>(defaultTabs);
  const [showNewFeatureDialog, setShowNewFeatureDialog] = useState(false);

  useEffect(() => {
    // Update tabs with new badges based on newTabs prop
    setTabs(prevTabs => 
      prevTabs.map(tab => ({
        ...tab,
        isNew: newTabs.includes(tab.id)
      }))
    );
  }, [newTabs]);

  const handleTabClick = (tabId: string) => {
    onTabChange(tabId);
    
    // Remove new badge when tab is clicked
    if (newTabs.includes(tabId)) {
      setTabs(prevTabs => 
        prevTabs.map(tab => 
          tab.id === tabId ? { ...tab, isNew: false } : tab
        )
      );
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
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <tab.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{tab.label}</CardTitle>
                      <CardDescription>{tab.description}</CardDescription>
                    </div>
                  </div>
                  {tab.isNew && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleNewFeatureClick}
                      className="gap-2"
                    >
                      <Sparkles className="h-4 w-4" />
                      What's New?
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {tab.id === 'fitness' && (
                    <div className="space-y-3">
                      <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                        <h4 className="font-medium text-green-800 mb-2">AI Fitness Features</h4>
                        <ul className="text-sm text-green-700 space-y-1">
                          <li>• Personalized workout recommendations</li>
                          <li>• Exercise form analysis and tips</li>
                          <li>• Progress tracking and goal setting</li>
                          <li>• Recovery and rest day optimization</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {tab.id === 'mental' && (
                    <div className="space-y-3">
                      <div className="p-4 rounded-lg bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200">
                        <h4 className="font-medium text-purple-800 mb-2">Mental Health Features</h4>
                        <ul className="text-sm text-purple-700 space-y-1">
                          <li>• Mood tracking and analysis</li>
                          <li>• Stress management techniques</li>
                          <li>• Mindfulness and meditation guidance</li>
                          <li>• Emotional support and coping strategies</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {tab.id === 'general' && (
                    <div className="space-y-3">
                      <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200">
                        <h4 className="font-medium text-blue-800 mb-2">General Health Features</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Symptom analysis and guidance</li>
                          <li>• Medication reminders and information</li>
                          <li>• Health record summaries</li>
                          <li>• Preventive care recommendations</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {tab.id === 'nutrition' && (
                    <div className="space-y-3">
                      <div className="p-4 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200">
                        <h4 className="font-medium text-orange-800 mb-2">Nutrition Features</h4>
                        <ul className="text-sm text-orange-700 space-y-1">
                          <li>• Personalized meal planning</li>
                          <li>• Nutritional analysis and tracking</li>
                          <li>• Dietary restriction management</li>
                          <li>• Healthy eating tips and guidance</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
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