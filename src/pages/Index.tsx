
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-brand-blue to-brand-teal text-white py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              Create Powerful Personas & Mood Boards
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 text-gray-100">
              Transform your user research into actionable insights and give visual direction to your project.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <Button 
                onClick={() => navigate('/persona-interview')}
                size="lg"
                className="text-lg font-medium bg-white text-brand-blue hover:bg-gray-100"
              >
                Create Persona
              </Button>
              <Button 
                onClick={() => navigate('/mood-board')}
                size="lg"
                className="text-lg font-medium bg-secondary hover:bg-secondary/90"
              >
                Create Mood Board
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-accent">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16 text-brand-blue">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {/* Feature 1 */}
              <div className="card-shadow">
                <div className="bg-brand-blue text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold mb-3 text-brand-blue">Input Interview Data</h3>
                <p className="text-gray-600">
                  Enter your user research notes or interview statements to generate key personality traits.
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="card-shadow">
                <div className="bg-brand-blue text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold mb-3 text-brand-blue">Group Adjectives</h3>
                <p className="text-gray-600">
                  Our AI analyzes your input and identifies common patterns and personality traits for your personas.
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="card-shadow">
                <div className="bg-brand-blue text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold mb-3 text-brand-blue">Create & Export</h3>
                <p className="text-gray-600">
                  Fill out the persona details or create a mood board, then export as a professional PDF.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 text-brand-blue">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              Create your first persona or mood board today and transform how you communicate user needs to your team.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <Button 
                onClick={() => navigate('/persona-interview')}
                size="lg"
                className="text-lg font-medium"
              >
                Create Persona
              </Button>
              <Button 
                onClick={() => navigate('/mood-board')}
                size="lg" 
                variant="outline"
                className="text-lg font-medium"
              >
                Create Mood Board
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
