import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Edit2, Trash2, Save, X, Settings, Brain } from 'lucide-react';
import type { AIInstruction } from '@/types/ai-talks';

interface AIInstructionManagerProps {
  instructions: AIInstruction[];
  onUpdateInstructions: (instructions: AIInstruction[]) => void;
  className?: string;
}

export function AIInstructionManager({ 
  instructions, 
  onUpdateInstructions, 
  className 
}: AIInstructionManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingInstruction, setEditingInstruction] = useState<AIInstruction | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    content: '',
    category: 'general' as AIInstruction['category'],
    priority: 1
  });

  const categoryColors = {
    general: 'bg-blue-100 text-blue-800',
    fitness: 'bg-green-100 text-green-800',
    mental: 'bg-purple-100 text-purple-800',
    nutrition: 'bg-orange-100 text-orange-800'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingInstruction) {
      // Update existing instruction
      const updated = instructions.map(inst => 
        inst.id === editingInstruction.id 
          ? { ...inst, ...formData, updatedAt: new Date() }
          : inst
      );
      onUpdateInstructions(updated);
    } else {
      // Create new instruction
      const newInstruction: AIInstruction = {
        id: Date.now().toString(),
        ...formData,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      onUpdateInstructions([...instructions, newInstruction]);
    }
    
    resetForm();
    setIsOpen(false);
  };

  const handleEdit = (instruction: AIInstruction) => {
    setEditingInstruction(instruction);
    setFormData({
      name: instruction.name,
      description: instruction.description,
      content: instruction.content,
      category: instruction.category,
      priority: instruction.priority
    });
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    onUpdateInstructions(instructions.filter(inst => inst.id !== id));
  };

  const handleToggleActive = (id: string) => {
    const updated = instructions.map(inst => 
      inst.id === id 
        ? { ...inst, isActive: !inst.isActive, updatedAt: new Date() }
        : inst
    );
    onUpdateInstructions(updated);
  };

  const resetForm = () => {
    setEditingInstruction(null);
    setFormData({
      name: '',
      description: '',
      content: '',
      category: 'general',
      priority: 1
    });
  };

  const activeInstructions = instructions.filter(inst => inst.isActive);

  return (
    <>
      <Card className={className}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle className="text-base flex items-center gap-2">
              <Brain className="h-4 w-4" />
              AI Instructions
            </CardTitle>
            <CardDescription>
              Manage AI behavior and responses
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(true)}
          >
            <Settings className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Active Rules</span>
              <Badge variant="secondary">{activeInstructions.length}</Badge>
            </div>
            
            <ScrollArea className="h-[200px] rounded-md border p-3">
              <div className="space-y-2">
                {activeInstructions.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No active instructions
                  </p>
                ) : (
                  activeInstructions.map((instruction) => (
                    <div
                      key={instruction.id}
                      className="flex items-start justify-between p-2 rounded-md bg-muted/50 hover:bg-muted/70 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium truncate">
                            {instruction.name}
                          </span>
                          <Badge 
                            variant="outline" 
                            className={categoryColors[instruction.category]}
                          >
                            {instruction.category}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {instruction.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 ml-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => handleEdit(instruction)}
                        >
                          <Edit2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>
              {editingInstruction ? 'Edit Instruction' : 'Create New Instruction'}
            </DialogTitle>
            <DialogDescription>
              Define how the AI should behave and respond in different scenarios.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Medical Record Analysis"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of what this instruction does"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as AIInstruction['category'] })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="general">General Health</option>
                  <option value="fitness">Fitness & Exercise</option>
                  <option value="mental">Mental Health</option>
                  <option value="nutrition">Nutrition & Diet</option>
                </select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
                <Input
                  id="priority"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) })}
                  placeholder="1-10 (higher = more important)"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="content">Instruction Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Enter the AI instruction/prompt here..."
                  className="min-h-[150px]"
                  required
                />
              </div>
            </div>
            
            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  resetForm();
                  setIsOpen(false);
                }}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button type="submit">
                <Save className="h-4 w-4 mr-2" />
                {editingInstruction ? 'Update' : 'Create'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}