import { responseLabel } from "../services/storage";
import type { TradeoffQuestion } from "../types";

interface TradeoffSliderProps {
  question: TradeoffQuestion;
  value: number;
  onChange: (value: number) => void;
}

export default function TradeoffSlider({ question, value, onChange }: TradeoffSliderProps) {
  return (
    <div className="slider-card">
      <label htmlFor={question.id}>{question.prompt}</label>
      <input
        id={question.id}
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <div className="slider-row">
        <span>{question.leftLabel}</span>
        <strong>{value} - {responseLabel(value)}</strong>
        <span>{question.rightLabel}</span>
      </div>
      <div className="tag-row">
        {question.valueTags.map((tag) => (
          <span key={tag} className="soft-tag">{tag}</span>
        ))}
      </div>
    </div>
  );
}
