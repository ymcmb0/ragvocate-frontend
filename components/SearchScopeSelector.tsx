'use client';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Scale, BookOpen, Search, BrainCircuit, FileText } from 'lucide-react';

interface SearchScopeSelectorProps {
  selectedSource: 'precedents' | 'statutes' | 'both';
  selectedRoute: 'default' | 'langgraph' | 'generate-report';
  onSourceChange: (source: 'precedents' | 'statutes' | 'both') => void;
  onRouteChange: (route: 'default' | 'langgraph' | 'generate-report') => void;
  precedentCount: number;
  statuteCount: number;
}

export default function SearchScopeSelector({
  selectedSource,
  selectedRoute,
  onSourceChange,
  onRouteChange,
  precedentCount,
  statuteCount,
}: SearchScopeSelectorProps) {
  return (
    <div className="space-y-4">
      {/* Source selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Search className="w-4 h-4" />
            Document Source
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedSource}
            onValueChange={(value) => onSourceChange(value as 'precedents' | 'statutes' | 'both')}
            className="space-y-3"
          >
            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-50">
              <RadioGroupItem value="precedents" id="source-precedents" />
              <Label htmlFor="source-precedents" className="cursor-pointer flex items-center gap-2 flex-1">
                <Scale className="w-4 h-4 text-amber-600" />
                <span>Legal Precedents</span>
                <span className="text-xs text-slate-500">({precedentCount} docs)</span>
              </Label>
            </div>

            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-50">
              <RadioGroupItem value="statutes" id="source-statutes" />
              <Label htmlFor="source-statutes" className="cursor-pointer flex items-center gap-2 flex-1">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>Statutes & Regulations</span>
                <span className="text-xs text-slate-500">({statuteCount} docs)</span>
              </Label>
            </div>

            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-50">
              <RadioGroupItem value="both" id="source-both" />
              <Label htmlFor="source-both" className="cursor-pointer flex items-center gap-2 flex-1">
                <div className="flex items-center gap-1">
                  <Scale className="w-3 h-3 text-amber-600" />
                  <BookOpen className="w-3 h-3 text-blue-600" />
                </div>
                <span>Both Sources</span>
                <span className="text-xs text-slate-500">({precedentCount + statuteCount} docs)</span>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Route selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <BrainCircuit className="w-4 h-4" />
            Query Mode
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedRoute}
            onValueChange={(value) =>
              onRouteChange(value as 'default' | 'langgraph' | 'generate-report')
            }
            className="space-y-3"
          >
            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-50">
              <RadioGroupItem value="default" id="route-default" />
              <Label htmlFor="route-default" className="cursor-pointer flex items-center gap-2 flex-1">
                <Search className="w-4 h-4 text-slate-600" />
                <span>Basic Search</span>
              </Label>
            </div>

            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-50">
              <RadioGroupItem value="langgraph" id="route-langgraph" />
              <Label htmlFor="route-langgraph" className="cursor-pointer flex items-center gap-2 flex-1">
                <BrainCircuit className="w-4 h-4 text-purple-600" />
                <span>LangGraph Enhanced</span>
              </Label>
            </div>

            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-50">
              <RadioGroupItem value="generate-report" id="route-report" />
              <Label htmlFor="route-report" className="cursor-pointer flex items-center gap-2 flex-1">
                <FileText className="w-4 h-4 text-green-600" />
                <span>Generate Legal Report</span>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
}
