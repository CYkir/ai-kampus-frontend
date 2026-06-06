const PromptSuggestionCard = ({ icon: Icon, title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group relative text-left rounded-2xl glass p-4 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-glass)] focus:outline-none focus:ring-2 focus:ring-primary/40"
    >
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
          <Icon className="h-4 w-4" />
        </span>

        <span className="text-sm font-medium text-gray-800 leading-snug">
          {title}
        </span>
      </div>
    </button>
  );
};

export default PromptSuggestionCard;
