import { NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify/storefront";
import { GET_ARCHIVE_METAOBJECTS } from "@/lib/shopify/queries/archive";

interface MediaImage {
  id: string;
  image: {
    url: string;
    altText: string | null;
    width: number;
    height: number;
  };
}

interface MetaobjectField {
  key: string;
  type: string;
  references?: {
    edges: Array<{
      node: MediaImage;
    }>;
  };
}

interface Metaobject {
  handle: string;
  type: string;
  fields: MetaobjectField[];
}

interface ArchiveMetaobjectsResponse {
  data: {
    findYourSmile: Metaobject | null;
    behindTheScenes: Metaobject | null;
    events: Metaobject | null;
  };
}

export async function GET() {
  try {
    const response = await shopifyFetch<ArchiveMetaobjectsResponse["data"]>(
      GET_ARCHIVE_METAOBJECTS
    );

    if (!response.data) {
      return NextResponse.json(
        { error: "No data returned from Shopify" },
        { status: 500 }
      );
    }

    // Debug: Log the raw response
    console.log("Raw Shopify response:", JSON.stringify(response, null, 2));

    // Transform the data to extract images
    const transformMetaobject = (metaobject: Metaobject | null, fieldKey: string) => {
      if (!metaobject) return { images: [] };

      const imagesField = metaobject.fields.find(
        (field) => field.key === fieldKey
      );

      const images =
        imagesField?.references?.edges.map((edge) => ({
          id: edge.node.id,
          url: edge.node.image.url,
          altText: edge.node.image.altText || "",
          width: edge.node.image.width,
          height: edge.node.image.height,
        })) || [];

      return { images };
    };

    const archiveData = {
      findYourSmile: transformMetaobject(response.data.findYourSmile, "findyoursmile"),
      behindTheScenes: transformMetaobject(response.data.behindTheScenes, "behindthescenes"),
      events: transformMetaobject(response.data.events, "events"),
    };

    return NextResponse.json(archiveData);
  } catch (error) {
    console.error("Error fetching archive metaobjects:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to fetch archive data",
      },
      { status: 500 }
    );
  }
}