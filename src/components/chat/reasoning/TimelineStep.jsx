import { CheckCircle2 } from "lucide-react";

const TimelineStep = ({ title, description, active = true }) => {
  return (
    <div className="flex gap-3">
      <div className="mt-1">
        <CheckCircle2
          size={18}
          className={active ? "text-violet-600" : "text-gray-300"}
        />
      </div>

      <div className="flex-1">
        <h4 className="text-sm font-semibold text-gray-800">{title}</h4>

        {description && (
          <p className="mt-1 text-xs text-gray-500">{description}</p>
        )}
      </div>
    </div>
  );
};

export default TimelineStep;
