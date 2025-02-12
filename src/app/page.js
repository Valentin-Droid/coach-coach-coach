import HealthForm from "@/components/HealthForm";

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Coach Virtuel - Votre Assistant Sportif
        </h1>

        {/* Version composant séparé */}
        <HealthForm />
      </div>
    </main>
  );
}
