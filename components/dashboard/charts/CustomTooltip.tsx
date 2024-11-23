interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

export function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload) return null;
  
  return (
    <div className="bg-background border border-border p-2 rounded-lg shadow-lg">
      <p className="font-medium">{label}</p>
      {payload.map((entry, index) => (
        <p key={index} className="text-sm" style={{ color: entry.color }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
}