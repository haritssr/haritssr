import { createContext, useContext, useState } from "react";
import LayoutToExperiments from "@/components/LayoutToExperiments";

export default function Context() {
  return (
    <LayoutToExperiments domain="React" title="HOC">
      <ContextCard />
    </LayoutToExperiments>
  );
}

interface HidableCardContextType {
  hidden: boolean;
  toggle: () => void;
}

const HidableCardContext = createContext<HidableCardContextType | null>(null);

function HidableCardContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hidden, setHidden] = useState(false);
  function toggle() {
    setHidden((prev) => !prev);
  }
  return (
    <HidableCardContext.Provider value={{ hidden, toggle }}>
      {children}
    </HidableCardContext.Provider>
  );
}

const useHidableContext = () => {
  const context = useContext(HidableCardContext);

  if (!context) {
    throw new Error("User inside the provider lol");
  }

  return context;
};

//HidableCard
function HidableCard({
  className,
  ...rest
}: Pick<React.ComponentPropsWithoutRef<"div">, "className" | "children">) {
  return (
    <HidableCardContextProvider>
      <div className={className} {...rest} />
    </HidableCardContextProvider>
  );
}

//HidableCardTitle
function HidableCardTitle({
  className,
  children,
}: Pick<React.ComponentPropsWithoutRef<"h3">, "className" | "children">) {
  const { hidden } = useHidableContext();
  return (
    <h3 className={className}>{hidden ? <span>------</span> : children}</h3>
  );
}

//HidableCardSubTitle
function HidableCardSubTitle({
  className,
  children,
}: Pick<React.ComponentPropsWithoutRef<"p">, "className" | "children">) {
  const { hidden } = useHidableContext();
  return <p className={className}>{hidden ? <span>------</span> : children}</p>;
}

//HidableCardHideButton
function HidableCardHideButton({ className }: { className?: string }) {
  const { hidden, toggle } = useHidableContext();
  return (
    <button
      className={className}
      disabled={hidden}
      onClick={toggle}
      type="button"
    >
      Button
    </button>
  );
}

//Compose them all together
function ContextCard() {
  return (
    <HidableCard className="flex items-start justify-between">
      <div className="space-y-1">
        <HidableCardTitle>Title</HidableCardTitle>
        <HidableCardSubTitle>SubTitle</HidableCardSubTitle>
      </div>
      <HidableCardHideButton />
    </HidableCard>
  );
}
