import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target } from "lucide-react";
import { useMemo, useState } from "react";

// Utilitaire pour formater et coloriser le JSON
const formatJSON = (json, depth = 0) => {
  if (typeof json === "string") return json;
  if (typeof json === "number") return json.toString();
  if (Array.isArray(json)) {
    return json.map((item, index) => (
      <div key={index} className="pl-4 flex items-start">
        <span className="text-primary mr-2">•</span>
        <span>{formatJSON(item, depth + 1)}</span>
      </div>
    ));
  }
  if (typeof json === "object" && json !== null) {
    return Object.entries(json).map(([key, value]) => (
      <div key={key} className="pl-4">
        <span className="font-semibold text-primary mr-2">{key}:</span>
        {formatJSON(value, depth + 1)}
      </div>
    ));
  }
  return json?.toString() || "N/A";
};

// Calcul de la complexité
const calculateComplexity = (data) => {
  if (!data) return "basic";

  const countProperties = (obj) => {
    if (typeof obj !== "object" || obj === null) return 0;
    return Object.keys(obj).length;
  };

  const totalProps = countProperties(data);

  return totalProps > 10
    ? "advanced"
    : totalProps > 5
    ? "intermediate"
    : "basic";
};

const ProgramResponse = ({ response }) => {
  const [activeView, setActiveView] = useState("sections");

  // Parse la réponse JSON
  const parsedResponse = useMemo(() => {
    try {
      const jsonData = JSON.parse(response);

      // Transformation en sections
      const sections = [
        {
          id: "personal-info",
          title: "Informations Personnelles",
          data: jsonData.personalInfo,
          complexity: calculateComplexity(jsonData.personalInfo),
        },
        {
          id: "training-profile",
          title: "Profil d'Entraînement",
          data: jsonData.trainingProfile,
          complexity: calculateComplexity(jsonData.trainingProfile),
        },
        {
          id: "objectives",
          title: "Objectifs Principaux",
          data: { objectifs: jsonData.mainObjectives },
          complexity: calculateComplexity(jsonData.mainObjectives),
        },
        {
          id: "additional-info",
          title: "Informations Complémentaires",
          data: jsonData.additionalInfo,
          complexity: calculateComplexity(jsonData.additionalInfo),
        },
        {
          id: "training-plan",
          title: "Programme d'Entraînement",
          data: jsonData.recommendedProgram.trainingPlan,
          complexity: "advanced",
        },
        {
          id: "nutrition",
          title: "Recommandations Nutritionnelles",
          data: jsonData.recommendedProgram.nutritionalGuidelines,
          complexity: "advanced",
        },
        {
          id: "progress-tracking",
          title: "Suivi de Progression",
          data: jsonData.recommendedProgram.progressTracking,
          complexity: "intermediate",
        },
      ];

      return sections;
    } catch (error) {
      console.error("Erreur de parsing JSON", error);
      return [];
    }
  }, [response]);

  // Rendu des sections
  const renderSectionContent = (data) => {
    return <div className="space-y-4">{formatJSON(data)}</div>;
  };
  return (
    <Card className="mt-8 shadow-lg max-w-4xl mx-auto">
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="text-2xl font-bold text-center flex items-center justify-center space-x-4">
          <Target className="w-8 h-8 text-primary" />
          <span>Votre Programme Personnalisé</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {/* Barre de navigation */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveView("sections")}
            className={`flex-1 p-4 font-semibold ${
              activeView === "sections"
                ? "bg-primary text-white"
                : "hover:bg-gray-100"
            }`}
          >
            Sections Détaillées
          </button>
          <button
            onClick={() => setActiveView("overview")}
            className={`flex-1 p-4 font-semibold ${
              activeView === "overview"
                ? "bg-primary text-white"
                : "hover:bg-gray-100"
            }`}
          >
            Vue d&apos;Ensemble
          </button>
        </div>

        {/* Vue par Sections */}
        {activeView === "sections" && (
          <Tabs defaultValue={parsedResponse[0]?.id} className="w-full">
            {/* Liste des onglets */}
            <div className="bg-gray-50 p-4 ">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
                {parsedResponse.map((section) => (
                  <TabsTrigger
                    key={section.id}
                    value={section.id}
                    className="flex items-center justify-between truncate"
                  >
                    <span className="truncate">{section.title}</span>
                    <Badge
                      variant={
                        section.complexity === "advanced"
                          ? "destructive"
                          : section.complexity === "intermediate"
                          ? "warning"
                          : "default"
                      }
                      className="ml-2 text-xs"
                    >
                      {section.complexity}
                    </Badge>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Contenu des onglets */}
            {parsedResponse.map((section) => (
              <TabsContent key={section.id} value={section.id}>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-primary mb-6 border-b pb-3">
                    {section.title}
                  </h2>
                  <ScrollArea className="h-[500px] pr-4">
                    {renderSectionContent(section.data)}
                  </ScrollArea>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}

        {/* Vue d'Ensemble */}
        {activeView === "overview" && (
          <div className="p-6">
            <Accordion type="single" collapsible className="w-full">
              {parsedResponse.map((section, index) => (
                <AccordionItem key={section.id} value={`item-${index}`}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center justify-between w-full">
                      <span className="text-lg font-semibold truncate pr-4">
                        {section.title}
                      </span>
                      <Badge
                        variant={
                          section.complexity === "advanced"
                            ? "destructive"
                            : section.complexity === "intermediate"
                            ? "warning"
                            : "default"
                        }
                        className="ml-2 shrink-0"
                      >
                        {section.complexity}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-4 border-l-4 border-primary">
                      {renderSectionContent(section.data)}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProgramResponse;
