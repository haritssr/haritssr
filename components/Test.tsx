import { useState } from 'react';

function TextWithNumber({
  header,
  children,
}: {
  header: (num: number) => React.ReactNode;
  children: (num: number) => React.ReactNode;
}) {
  const [state, stateSet] = useState<number>(1);
  return (
    <div>
      {header && <h2>{header?.(state)}</h2>}
      <div>{children(state)}</div>
      <div>
        <button onClick={() => stateSet(state + 1)}>Add</button>
      </div>
    </div>
  );
}

export default function Tes() {
  return (
    <div>
      <TextWithNumber header={(num:number) => <span>Header {num}</span>}>
        {(num: number) => <div>Todays number is {num}</div>}
      </TextWithNumber>
    </div>
  );
}
