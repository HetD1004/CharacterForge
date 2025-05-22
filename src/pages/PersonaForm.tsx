import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from "@/hooks/use-toast";

interface PersonaData {
  [x: string]: string | number | readonly string[];
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

const archetypes = [
  { value: "explorer", label: "Explorer" },
  { value: "creator", label: "Creator" },
  { value: "caregiver", label: "Caregiver" },
  { value: "ruler", label: "Ruler" },
  { value: "jester", label: "Jester" },
  { value: "sage", label: "Sage" },
  { value: "innocent", label: "Innocent" },
  { value: "outlaw", label: "Outlaw" },
  { value: "magician", label: "Magician" },
  { value: "hero", label: "Hero" },
  { value: "everyperson", label: "Everyperson" },
  { value: "lover", label: "Lover" }
];

const defaultPersonaData: PersonaData = {
  name: "",
  age: "",
  education: "",
  languages: "",
  location: "",
  occupation: "",
  archetype: "",
  goals: "",
  personality: "",
  frustrations: "",
  painPoints: "",
  profileImage: "",
};

const PersonaForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [personaData, setPersonaData] = useState<PersonaData>(defaultPersonaData);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPersonaData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setPersonaData(prev => ({ ...prev, archetype: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPersonaData(prev => ({ ...prev, profileImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGeneratePersona = () => {
    // Basic validation
    if (!personaData.name || !personaData.age) {
      toast({
        title: "Missing information",
        description: "Please fill in at least the name and age fields.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Store the persona data in localStorage
    localStorage.setItem('personaData', JSON.stringify(personaData));
    
    // After a short delay, navigate to the output
    setTimeout(() => {
      setIsGenerating(false);
      navigate('/persona-output');
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <div className="page-container">
          <div className="max-w-3xl mx-auto">
            <h1 className="section-heading">Step 3: Create Your Persona</h1>
            <p className="text-gray-600 mb-8">
              Fill in the details below to create a comprehensive persona. This information will be used
              to generate your persona profile.
            </p>

            <div className="card-shadow mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left column */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="e.g., Sarah Johnson"
                      value={personaData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="age">Age *</Label>
                    <Input
                      id="age"
                      name="age"
                      placeholder="e.g., 32"
                      value={personaData.age}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="education">Education</Label>
                    <Input
                      id="education"
                      name="education"
                      placeholder="e.g., Bachelor's in Marketing"
                      value={personaData.education}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <Label htmlFor="languages">Languages</Label>
                    <Input
                      id="languages"
                      name="languages"
                      placeholder="e.g., English, Spanish"
                      value={personaData.languages}
                      onChange={handleInputChange}
                    />
                  </div>

                </div>
                
                {/* Right column */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="e.g., San Francisco, CA"
                      value={personaData.location}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="occupation">Occupation</Label>
                    <Input
                      id="occupation"
                      name="occupation"
                      placeholder="e.g., Marketing Manager"
                      value={personaData.occupation}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="archetype">Archetype</Label>
                    <Input
                      id="archetype"
                      name="archetype"
                      placeholder="e.g., Explorer, Creator, Sage"
                      value={personaData.archetype}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <Label htmlFor="personality">Personality</Label>
                    <Input
                      id="personality"
                      name="personality"
                      placeholder="e.g., Extroverted, analytical"
                      value={personaData.personality}
                      onChange={handleInputChange}
                    />
                  </div>
                
                  <div>
                    <Label htmlFor="profileImage">Profile Image</Label>
                    <Input
                      id="profileImage"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="cursor-pointer"
                    />
                    {personaData.profileImage && (
                      <div className="mt-2 relative w-32 h-32 rounded-full overflow-hidden">
                        <img 
                          src={personaData.profileImage} 
                          alt="Profile preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div>
                  <Label htmlFor="goals">Goals</Label>
                  <Textarea
                    id="goals"
                    name="goals"
                    placeholder="What are this persona's main goals and motivations?"
                    value={personaData.goals}
                    onChange={handleInputChange}
                    className="min-h-[100px]"
                  />
                </div>
                
                <div>
                  <Label htmlFor="frustrations">Frustrations</Label>
                  <Textarea
                    id="frustrations"
                    name="frustrations"
                    placeholder="What frustrates this persona? What are their pain points?"
                    value={personaData.frustrations}
                    onChange={handleInputChange}
                    className="min-h-[100px]"
                  />
                </div>
                
                <div>
                  <Label htmlFor="painPoints">Pain Points</Label>
                  <Textarea
                    id="painPoints"
                    name="painPoints"
                    placeholder="What specific problems does this persona face?"
                    value={personaData.painPoints}
                    onChange={handleInputChange}
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button 
                onClick={handleGeneratePersona}
                disabled={isGenerating}
              >
                {isGenerating ? 'Generating...' : 'Generate Persona'}
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PersonaForm;
