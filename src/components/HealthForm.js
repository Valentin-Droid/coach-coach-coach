"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Définition du schéma de validation avec Zod
const formSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  age: z
    .number()
    .min(16, "Vous devez avoir au moins 16 ans")
    .max(120, "Âge invalide"),
  taille: z
    .number()
    .min(100, "La taille minimum est de 100 cm")
    .max(250, "La taille maximum est de 250 cm"),
  poidsActuel: z
    .number()
    .min(30, "Le poids minimum est de 30 kg")
    .max(300, "Le poids maximum est de 300 kg"),
  poidsObjectif: z
    .number()
    .min(30, "Le poids minimum est de 30 kg")
    .max(300, "Le poids maximum est de 300 kg"),
  niveauForme: z.enum(["debutant", "intermediaire", "avance", "expert"], {
    required_error: "Veuillez sélectionner votre niveau",
  }),
  frequenceEntrainement: z.enum(["1-2", "3-4", "5+"], {
    required_error: "Veuillez sélectionner une fréquence",
  }),
  objectifs: z.array(z.string()).min(1, "Sélectionnez au moins un objectif"),
  lieuEntrainement: z.enum(
    ["Salle de sport", "À domicile", "En extérieur", "Mixte"],
    {
      required_error: "Veuillez sélectionner un lieu",
    }
  ),
  dureeSouhaitee: z.enum(["30 minutes", "45 minutes", "1 heure", "1h30+"], {
    required_error: "Veuillez sélectionner une durée",
  }),
  contraintesMedicales: z.string().optional(),
  equipementsDisponibles: z.string().optional(),
  sportsPreferences: z.string().optional(),
  niveauMotivation: z.number().min(1).max(10),
  niveauStress: z.number().min(1).max(10),
});

const HealthForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
      age: undefined,
      taille: undefined,
      poidsActuel: undefined,
      poidsObjectif: undefined,
      niveauForme: undefined,
      frequenceEntrainement: undefined,
      objectifs: [],
      lieuEntrainement: undefined,
      dureeSouhaitee: undefined,
      contraintesMedicales: "",
      equipementsDisponibles: "",
      sportsPreferences: "",
      niveauMotivation: 5,
      niveauStress: 5,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    // Ajoutez ici la logique pour traiter les données du formulaire
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Formulaire de Santé et Fitness
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Informations personnelles */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="nom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                          <Input placeholder="Votre nom" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Âge</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Votre âge"
                            {...field}
                            onChange={(e) =>
                              field.onChange(e.target.valueAsNumber)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="taille"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Taille (cm)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Votre taille"
                            {...field}
                            onChange={(e) =>
                              field.onChange(e.target.valueAsNumber)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="poidsActuel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Poids actuel (kg)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Votre poids actuel"
                            {...field}
                            onChange={(e) =>
                              field.onChange(e.target.valueAsNumber)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="poidsObjectif"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Poids objectif (kg)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Votre poids objectif"
                            {...field}
                            onChange={(e) =>
                              field.onChange(e.target.valueAsNumber)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Niveau et fréquence */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="niveauForme"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Niveau de forme physique</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez votre niveau" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="debutant">Débutant</SelectItem>
                          <SelectItem value="intermediaire">
                            Intermédiaire
                          </SelectItem>
                          <SelectItem value="avance">Avancé</SelectItem>
                          <SelectItem value="expert">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="frequenceEntrainement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Fréquence d&apos;entraînement souhaitée
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez la fréquence" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1-2">
                            1-2 fois par semaine
                          </SelectItem>
                          <SelectItem value="3-4">
                            3-4 fois par semaine
                          </SelectItem>
                          <SelectItem value="5+">
                            5+ fois par semaine
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Objectifs */}
              <FormField
                control={form.control}
                name="objectifs"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel>Objectifs</FormLabel>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "Perte de poids",
                        "Prise de muscle",
                        "Amélioration de l'endurance",
                        "Amélioration de la force",
                        "Souplesse",
                        "Rééducation",
                      ].map((objectif) => (
                        <FormField
                          key={objectif}
                          control={form.control}
                          name="objectifs"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={objectif}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(objectif)}
                                    onCheckedChange={(checked) => {
                                      const updatedList = checked
                                        ? [...field.value, objectif]
                                        : field.value?.filter(
                                            (value) => value !== objectif
                                          );
                                      field.onChange(updatedList);
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {objectif}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Lieu et durée */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="lieuEntrainement"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Lieu d&apos;entraînement</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="space-y-1"
                        >
                          {[
                            "Salle de sport",
                            "À domicile",
                            "En extérieur",
                            "Mixte",
                          ].map((lieu) => (
                            <FormItem
                              key={lieu}
                              className="flex items-center space-x-3 space-y-0"
                            >
                              <FormControl>
                                <RadioGroupItem value={lieu} />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {lieu}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dureeSouhaitee"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Durée souhaitée des séances</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="space-y-1"
                        >
                          {["30 minutes", "45 minutes", "1 heure", "1h30+"].map(
                            (duree) => (
                              <FormItem
                                key={duree}
                                className="flex items-center space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <RadioGroupItem value={duree} />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {duree}
                                </FormLabel>
                              </FormItem>
                            )
                          )}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Zones de texte */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="contraintesMedicales"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Contraintes médicales ou blessures à signaler
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Décrivez vos contraintes médicales ou blessures..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="equipementsDisponibles"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Équipements disponibles</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Listez vos équipements disponibles..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sportsPreferences"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sports ou activités préférés</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Décrivez vos sports ou activités préférés..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Échelles */}
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="niveauMotivation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Niveau de motivation (1-10)</FormLabel>
                      <FormControl>
                        <div className="pt-2">
                          <Slider
                            min={1}
                            max={10}
                            step={1}
                            value={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                          />
                        </div>
                      </FormControl>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>1</span>
                        <span>10</span>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="niveauStress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Niveau de stress quotidien (1-10)</FormLabel>
                      <FormControl>
                        <div className="pt-2">
                          <Slider
                            min={1}
                            max={10}
                            step={1}
                            value={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                          />
                        </div>
                      </FormControl>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>1</span>
                        <span>10</span>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Bouton de soumission */}
              <Button type="submit" className="w-full">
                Soumettre le formulaire
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthForm;
