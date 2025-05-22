
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from "@/hooks/use-toast";

interface AdjectiveGroup {
  title: string;
  adjectives: string[];
}

const AdjectiveGrouping = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [adjectiveGroups, setAdjectiveGroups] = useState<AdjectiveGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Try to fetch the adjective groups from localStorage
    try {
      const storedGroups = localStorage.getItem('adjectiveGroups');
      if (storedGroups) {
        const parsedGroups = JSON.parse(storedGroups);
        setAdjectiveGroups(Array.isArray(parsedGroups) ? parsedGroups : []);
      } else {
        // If no adjective groups were found, use fallback mock data
        const fallbackGroups: AdjectiveGroup[] = [
          {
            title: "Organized & Methodical",
            adjectives: ["Organized", "Meticulous", "Structured", "Detail-oriented", "Systematic"]
          },
          {
            title: "Creative & Innovative",
            adjectives: ["Creative", "Innovative", "Original", "Imaginative", "Visionary"]
          },
          {
            title: "Collaborative & Communicative",
            adjectives: ["Team-player", "Communicative", "Cooperative", "Engaging", "Friendly"]
          },
          {
            title: "Analytical & Strategic",
            adjectives: ["Analytical", "Strategic", "Critical-thinking", "Logical", "Precise"]
          }
        ];
        setAdjectiveGroups(fallbackGroups);
        
        toast({
          title: "Using default adjectives",
          description: "No generated adjectives were found. Using default examples instead.",
        });
      }
    } catch (error) {
      console.error("Error parsing adjective groups:", error);
      toast({
        title: "Error loading adjectives",
        description: "Failed to load the generated adjectives. Using default examples instead.",
        variant: "destructive",
      });
      
      // Set fallback data in case of an error
      const fallbackGroups: AdjectiveGroup[] = [
        {
          title: "Organized & Methodical",
          adjectives: ["Organized", "Meticulous", "Structured", "Detail-oriented", "Systematic"]
        },
        {
          title: "Creative & Innovative",
          adjectives: ["Creative", "Innovative", "Original", "Imaginative", "Visionary"]
        }
      ];
      setAdjectiveGroups(fallbackGroups);
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const handleNext = () => {
    // Save the adjective groups to localStorage again (in case they were fallback data)
    localStorage.setItem('adjectiveGroups', JSON.stringify(adjectiveGroups));
    navigate('/persona-form');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <div className="page-container">
          <div className="max-w-4xl mx-auto">
            <h1 className="section-heading">Step 2: Adjective Grouping</h1>
            <p className="text-gray-600 mb-8">
              Below are the personality traits extracted from your interview statements, 
              grouped by similarity. These will help you identify distinct persona types.
            </p>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-pulse">
                  <p className="text-lg text-gray-500">Analyzing interview text and grouping adjectives...</p>
                </div>
              </div>
            ) : (
              <>
                {adjectiveGroups.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {adjectiveGroups.map((group, index) => (
                      <Card key={index} className="overflow-hidden border-t-4 border-t-brand-teal">
                        <CardContent className="p-6">
                          <h3 className="text-lg font-semibold mb-3 text-brand-blue">{group.title}</h3>
                          <div className="flex flex-wrap gap-2">
                            {group.adjectives.map((adj, idx) => (
                              <span 
                                key={idx} 
                                className="bg-accent px-3 py-1 rounded-full text-sm text-gray-700"
                              >
                                {adj}
                              </span>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-lg text-gray-500">No adjectives were generated. Try again or proceed to the next step.</p>
                  </div>
                )}
                <div className="flex justify-end">
                  <Button onClick={handleNext}>
                    Next: Create Persona
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdjectiveGrouping;
