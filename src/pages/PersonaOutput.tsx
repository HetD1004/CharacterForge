
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface PersonaData {
  name: string;
  age: string;
  education: string;
  languages: string;
  location: string;
  personality: string;
  occupation: string;
  archetype: string;
  goals: string;
  frustrations: string;
  painPoints: string;
  profileImage: string;
}

const defaultPersonaData: PersonaData = {
  name: "Sarah Johnson",
  age: "32",
  education: "Bachelor's in Marketing",
  languages: "English, Spanish",
  location: "San Francisco, CA",
  personality: "Creative, Analytical",
  occupation: "Marketing Manager",
  archetype: "creator",
  goals: "Looking to streamline marketing campaigns and improve team collaboration.",
  frustrations: "Struggles with disjointed marketing tools and lack of visibility into campaign performance.",
  painPoints: "Difficulty in coordinating across departments, measuring ROI, and meeting tight deadlines.",
  profileImage: "",
};

const PersonaOutput = () => {
  const [personaData, setPersonaData] = useState<PersonaData>(defaultPersonaData);
  
  useEffect(() => {
    // Retrieve the persona data from localStorage
    const storedData = localStorage.getItem('personaData');
    if (storedData) {
      setPersonaData(JSON.parse(storedData));
    }
  }, []);

  const getArchetypeLabel = (value: string): string => {
    const archetypes: Record<string, string> = {
      "explorer": "Explorer",
      "creator": "Creator",
      "caregiver": "Caregiver",
      "ruler": "Ruler",
      "jester": "Jester",
      "sage": "Sage",
      "innocent": "Innocent",
      "outlaw": "Outlaw",
      "magician": "Magician",
      "hero": "Hero",
      "everyperson": "Everyperson",
      "lover": "Lover"
    };
    
    return archetypes[value] || value;
  };
  
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    // In a real implementation, this would generate and download a PDF
    // For now, we'll just use the print functionality
    window.print();
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Use a div wrapper with the className for print hiding */}
      <div className="print:hidden">
        <Header />
      </div>
      
      <main className="flex-grow">
        <div className="page-container">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8 print:hidden">
              <h1 className="section-heading mb-0">Persona Profile</h1>
              <div className="space-x-4">
                <Button variant="outline" onClick={handlePrint}>
                  Print
                </Button>
                <Button onClick={handleDownloadPDF}>
                  Download PDF
                </Button>
              </div>
            </div>

            {/* Persona Card - This is what will be printed */}
            <Card className="overflow-hidden border-0 shadow-xl mb-8 print:shadow-none print:m-0">
              <div className="bg-gradient-to-r from-brand-blue to-brand-teal p-6 text-white">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-white flex items-center justify-center border-4 border-white">
                    {personaData.profileImage ? (
                      <img 
                        src={personaData.profileImage} 
                        alt={personaData.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-4xl font-bold">
                          {personaData.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">{personaData.name}</h2>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                        {personaData.age} years old
                      </span>
                      {personaData.occupation && (
                        <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                          {personaData.occupation}
                        </span>
                      )}
                      {personaData.archetype && (
                        <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                          {getArchetypeLabel(personaData.archetype)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                {/* Personal Details Section */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-brand-blue mb-3">Personal Details</h3>
                  <Separator className="mb-4" />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {personaData.education && (
                      <div>
                        <h4 className="font-medium text-gray-700">Education</h4>
                        <p className="text-gray-600">{personaData.education}</p>
                      </div>
                    )}
                    {personaData.languages && (
                      <div>
                        <h4 className="font-medium text-gray-700">Languages</h4>
                        <p className="text-gray-600">{personaData.languages}</p>
                      </div>
                    )}
                    {personaData.location && (
                      <div>
                        <h4 className="font-medium text-gray-700">Location</h4>
                        <p className="text-gray-600">{personaData.location}</p>
                      </div>
                    )}
                    {personaData.personality && (
                      <div>
                        <h4 className="font-medium text-gray-700">Personality</h4>
                        <p className="text-gray-600">{personaData.personality}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Goals, Frustrations, and Pain Points */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Goals Section */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-brand-blue">Goals</h3>
                    <Separator />
                    <p className="text-gray-700 whitespace-pre-line">
                      {personaData.goals || "No goals specified"}
                    </p>
                  </div>
                  
                  {/* Frustrations Section */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-brand-blue">Frustrations</h3>
                    <Separator />
                    <p className="text-gray-700 whitespace-pre-line">
                      {personaData.frustrations || "No frustrations specified"}
                    </p>
                  </div>
                  
                  {/* Pain Points Section */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-brand-blue">Pain Points</h3>
                    <Separator />
                    <p className="text-gray-700 whitespace-pre-line">
                      {personaData.painPoints || "No pain points specified"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center print:hidden">
              <Button variant="outline" onClick={() => window.history.back()}>
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Use a div wrapper with the className for print hiding */}
      <div className="print:hidden">
        <Footer />
      </div>

      {/* Add print-specific styles at the document level */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            @page {
              size: auto;
              margin: 0;
            }
            body {
              margin: 1cm;
            }
            .print\\:hidden {
              display: none !important;
            }
            /* Center the card when printing */
            .page-container {
              padding: 0 !important;
            }
            
            /* Ensure gradients print properly */
            .from-brand-blue.to-brand-teal {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
          }
        `
      }} />
    </div>
  );
};

export default PersonaOutput;
