
"use client";

import * as React from 'react';
import { StepIndicator } from '@/components/report-generator/step-indicator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ReportStep1Criteria } from '@/components/report-generator/step1-criteria';
import { ReportStep2Template } from '@/components/report-generator/step2-template';
import { ReportStep3Preview } from '@/components/report-generator/step3-preview';
import { ReportStep4Charts } from '@/components/report-generator/step4-charts';
import { ReportStep5Output } from '@/components/report-generator/step5-output';
import { useToast } from '@/hooks/use-toast';

const steps = [
  "Selection Criteria",
  "Template Selection",
  "Data Preview",
  "Chart Selection",
  "Output Options",
];

export default function ReportGeneratorPage() {
  const [currentStep, setCurrentStep] = React.useState(0);
  const { toast } = useToast();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGenerate = () => {
    toast({
      title: "Report Generation Started",
      description: "Your report is being generated and will be available shortly.",
    });
    // Reset to first step or navigate away
    setCurrentStep(0); 
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <ReportStep1Criteria />;
      case 1:
        return <ReportStep2Template />;
      case 2:
        return <ReportStep3Preview />;
      case 3:
        return <ReportStep4Charts />;
      case 4:
        return <ReportStep5Output />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-8 animate-fade-in">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-foreground">
            Report Generator
          </CardTitle>
          <StepIndicator steps={steps} currentStep={currentStep} className="mt-4" />
        </CardHeader>
        <CardContent className="min-h-[300px]">
          {renderStepContent()}
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>
            Back
          </Button>
          {currentStep < steps.length - 1 ? (
            <Button onClick={handleNext} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Next
            </Button>
          ) : (
            <Button onClick={handleGenerate} className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              Generate Report
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
