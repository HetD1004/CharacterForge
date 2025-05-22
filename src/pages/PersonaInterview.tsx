import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from "@/hooks/use-toast";

const PersonaInterview = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [interviewText, setInterviewText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInterviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInterviewText(e.target.value);
  };

  const generateAdjectiveGroups = async (text: string) => {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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'
        },
        body: JSON.stringify({
          model: "llama3-70b-8192",
          messages: [
            {
              role: "system",
              content: "You are a UX researcher assisting in persona development."
            },
            {
              role: "user",
              content: `Analyze the user interview transcript provided below and extract key personality traits and characteristics.

Return ONLY 2-4 distinct groups of adjectives that represent core personality dimensions identified in the transcript. Each group should contain 3-5 similar adjectives that reflect a cohesive personality trait.

Guidelines:
- Each group should represent a clearly distinct personality dimension
- Adjectives within a group must be semantically related and non-contradictory
- Focus on traits that would be most relevant for designing user experiences
- Prioritize traits that appear most prominent or frequently expressed in the transcript
- Include traits related to decision-making, social interaction, emotional responses, and motivations

Format the response as a JSON object with a key named "traits" containing an array of objects. Each object should have a 'trait_category' field containing a single word that summarizes the trait group, and an 'adjectives' field containing an array of 3-5 related adjectives. Here's the interview text:\n\n${text}`
            }
          ],
          response_format: { type: "json_object" }
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to generate adjectives');
      }

      try {
        const contentString = data.choices[0]?.message?.content;
        console.log("API Response content:", contentString);
        
        if (contentString) {
          const parsedContent = JSON.parse(contentString);
          console.log("Parsed content:", parsedContent);
          
          if (parsedContent.traits) {
            return parsedContent.traits;
          } else {
            console.error("No traits found in response:", parsedContent);
            throw new Error('Invalid response format: no traits found');
          }
        } else {
          throw new Error('Empty response from LLM');
        }
      } catch (e) {
        console.error('Error parsing LLM response:', e);
        throw new Error('Failed to parse LLM response');
      }
    } catch (error) {
      console.error('Error generating adjectives:', error);
      throw error;
    }
  };

  const handleGenerateAdjectives = async () => {
    if (!interviewText.trim()) {
      toast({
        title: "Interview text is empty",
        description: "Please enter some interview statements or skip this step.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const adjectiveGroups = await generateAdjectiveGroups(interviewText);
      localStorage.setItem('interviewText', interviewText);
      localStorage.setItem('adjectiveGroups', JSON.stringify(adjectiveGroups));
      navigate('/adjective-grouping');
    } catch (error) {
      toast({
        title: "Error generating adjectives",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    navigate('/persona-form');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <div className="page-container">
          <div className="max-w-3xl mx-auto">
            <h1 className="section-heading">Step 1: Input Interview Statements</h1>
            <p className="text-gray-600 mb-8">
              Enter notes from your user interviews or research. Our AI will analyze this text to identify
              personality traits and group similar adjectives. This helps you create more accurate personas.
            </p>

            <div className="card-shadow mb-8">
              <label htmlFor="interviewText" className="block text-sm font-medium text-gray-700 mb-2">
                Interview Text
              </label>
              <Textarea
                id="interviewText"
                placeholder="Enter interview statements or research notes here..."
                className="min-h-[250px]"
                value={interviewText}
                onChange={handleInterviewChange}
              />
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={handleSkip}
              >
                Skip this step
              </Button>
              <Button 
                onClick={handleGenerateAdjectives}
                disabled={isLoading}
              >
                {isLoading ? 'Generating...' : 'Generate Adjectives'}
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PersonaInterview;
