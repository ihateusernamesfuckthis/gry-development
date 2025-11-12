"use client";

import { useEffect, useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ArchiveCategorySection from "@/components/ArchiveCategorySection";

interface ArchiveImage {
  id: string;
  url: string;
  altText: string;
  width: number;
  height: number;
}

interface ArchiveData {
  findYourSmile: { images: ArchiveImage[] };
  behindTheScenes: { images: ArchiveImage[] };
  events: { images: ArchiveImage[] };
}

export default function ArchivePage() {
  const [archiveData, setArchiveData] = useState<ArchiveData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArchiveData = async () => {
      try {
        const response = await fetch("/api/archive");
        if (!response.ok) {
          throw new Error("Failed to fetch archive data");
        }
        const data = await response.json();
        setArchiveData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchArchiveData();
  }, []);

  if (loading) {
    return (
      <main className="lg:flex lg:h-screen">
        <Nav />
        <div className="w-full lg:flex-1 lg:overflow-y-auto flex flex-col gap-12 items-center justify-center min-h-screen">
          <p className="text-black text-lg font-['Archivo']">Loading...</p>
        </div>
      </main>
    );
  }

  if (error || !archiveData) {
    return (
      <main className="lg:flex lg:h-screen">
        <Nav />
        <div className="w-full lg:flex-1 lg:overflow-y-auto flex flex-col gap-12 items-center justify-center min-h-screen">
          <p className="text-black text-lg font-['Archivo']">
            Error loading archive: {error}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="lg:flex lg:h-screen">
      <Nav />
      <div className="w-full lg:flex-1 lg:overflow-y-auto flex flex-col gap-12 pt-14 lg:pt-0">
        <ArchiveCategorySection
          title="FIND YOUR SMILE"
          images={archiveData.findYourSmile.images}
          sectionId="find-your-smile"
        />
        <ArchiveCategorySection
          title="EVENTS"
          images={archiveData.events.images}
          sectionId="events"
        />
        <ArchiveCategorySection
          title="BEHIND THE SCENES"
          images={archiveData.behindTheScenes.images}
          sectionId="behind-the-scenes"
        />
        <Footer />
      </div>
    </main>
  );
}
