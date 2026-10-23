import LabPageHeader from "@/app/labs/_components/LabPageHeader";
import { getLabMetadata } from "@/app/labs/data";
import PageDescription from "@/components/PageDescription";

import CardVisual from "./CardVisual";
import { cards } from "./catalog";
import Gallery from "./Gallery";
import { baseCSS, recipeCSS } from "./styles";

export const metadata = getLabMetadata("user-interface", "gradient-cards");

export default function GradientCardsPage() {
  return (
    <>
      <LabPageHeader>
        <PageDescription>
          One hundred ways to explore color, light, texture, and composition.
        </PageDescription>
      </LabPageHeader>
      <style>{baseCSS + cards.map(recipeCSS).join("\n")}</style>
      <Gallery>
        {cards.map((card) => (
          <CardVisual card={card} key={card.id} />
        ))}
      </Gallery>
    </>
  );
}
