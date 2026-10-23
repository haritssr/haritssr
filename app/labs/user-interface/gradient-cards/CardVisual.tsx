import Image from "next/image";

import type { CardRecipe } from "./catalog";
import { imagePath, layersFor } from "./styles";

export default function CardVisual({
  card,
  preview = false,
}: {
  card: CardRecipe;
  preview?: boolean;
}) {
  return (
    <figure
      aria-label={`${card.id} · ${card.name}`}
      className={`gradient-card gc-${card.id} gc-composition-${card.composition}${preview ? " gc-preview" : ""}`}
      data-card-id={preview ? undefined : card.id}
      data-motion={card.motion ? "" : undefined}
      data-visible={preview ? "true" : undefined}
      id={preview ? undefined : `card-${card.id}`}
    >
      {card.image ? (
        <div className="gc-photo">
          <Image
            alt=""
            fill
            loading="lazy"
            sizes={
              preview
                ? "(min-width: 768px) 420px, 90vw"
                : `(min-width: 1024px) ${Math.round((card.columns / 4) * 1024)}px, (min-width: 640px) ${Math.min(card.columns, 2) * 50}vw, 100vw`
            }
            src={imagePath(card.image)}
          />
        </div>
      ) : null}
      <div aria-hidden="true" className="gc-scrim" />
      <div aria-hidden="true" className="gc-art-viewport">
        <div className="gc-art">
          {layersFor(card).map((_, index) => (
            <div
              className={`gc-layer gc-layer-${index}`}
              key={`${card.id}-${index}`}
            />
          ))}
        </div>
      </div>
      {card.family === "Tactile textures" ? (
        <div aria-hidden="true" className="gc-grain" />
      ) : null}
      <div className="gc-content">
        <div className="gc-topline">
          <span>{card.name}</span>
          <span>{card.id}</span>
        </div>
        <div className="gc-main">
          {card.composition === "player" ? (
            <div aria-hidden="true" className="gc-record" />
          ) : null}
          {card.composition === "product" ? (
            <div aria-hidden="true" className="gc-product-mark">
              ✳
            </div>
          ) : null}
          <p className="gc-title">{card.title}</p>
          <p className="gc-body">{card.body}</p>
          {card.composition === "weather" ? (
            <div aria-hidden="true" className="gc-weather-line" />
          ) : null}
          {card.composition === "player" ? (
            <div aria-hidden="true" className="gc-player-line">
              <span>Ⅱ</span>
              <div className="gc-progress" />
              <span>↗</span>
            </div>
          ) : null}
          {card.composition === "ticket" ? (
            <div aria-hidden="true" className="gc-barcode" />
          ) : null}
        </div>
        <p className="gc-detail">{card.detail}</p>
      </div>
      {preview ? null : (
        <button
          aria-label={`Inspect ${card.id}: ${card.name}`}
          className="gc-inspect"
          data-inspect-card={card.id}
          type="button"
        >
          <svg
            aria-hidden="true"
            fill="none"
            height="14"
            viewBox="0 0 20 20"
            width="14"
          >
            <path
              d="M7 3H3v4M13 3h4v4M3 13v4h4M17 13v4h-4"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </svg>
        </button>
      )}
    </figure>
  );
}
