
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { useEffect } from 'react';
import { Excalidraw } from '@excalidraw/excalidraw';

const MoodBoard = () => {
  useEffect(() => {
    toast({
      title: "Mood Board Loaded",
      description: "You can now start creating your mood board."
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <div className="page-container">
          <div className="max-w-5xl mx-auto">
            <h1 className="section-heading">Create Mood Board</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Use Mood Board to give visual direction for your projects.
              Draw, add shapes, insert text and images to visualize your ideas.
            </p>

            <Card className="border-0 shadow-lg overflow-hidden mb-8">
              <CardContent className="p-0">
                <div className="w-full h-[600px] rounded-md">
                  <Excalidraw 
                    initialData={{
                      appState: { 
                        viewBackgroundColor: "var(--excalidraw-bg, #ffffff)",
                        currentItemFontFamily: 1
                      }
                    }}
                    UIOptions={{
                      canvasActions: {
                        saveToActiveFile: true,
                        export: {
                          saveFileToDisk: true
                        },
                        loadScene: true
                      }
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="bg-accent dark:bg-accent p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-brand-blue dark:text-primary">How to use Mood Board</h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Use the drawing tools in the top toolbar to create shapes, lines, and text</li>
                <li>Insert images by using the image icon or dragging and dropping from your computer</li>
                <li>Change colors and styles using the properties panel on the right</li>
                <li>Save your work by clicking the export button in the menu</li>
                <li>Share your mood board by exporting it as an image or sharing the link</li>
              </ol>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MoodBoard;
