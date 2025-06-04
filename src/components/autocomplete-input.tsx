import React, {
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  MouseEvent,
  ChangeEvent,
} from "react";
import { Input } from "@/components/ui/input";

type Suggestion = {
  label: string;
  change: string | number;
};

interface AutocompleteInputProps {
  suggestions?: Suggestion[];
  placeholder?: string;
  onSelect?: (label: string) => void;
  className?: string;
  value?: string | number;
  onChange?: (change: string | number) => void;
}

interface SuggestionItemProps {
  suggestion: string;
  isActive: boolean;
  onClick: (suggestion: string) => void;
  onMouseEnter: () => void;
}

const SuggestionItem: React.FC<SuggestionItemProps> = ({
  suggestion,
  isActive,
  onClick,
  onMouseEnter,
}) => {
  return (
    <div
      className={`px-4 py-2 cursor-pointer hover:bg-zinc-100 ${
        isActive ? "bg-zinc-50 text-zinc-600" : ""
      }`}
      onClick={() => onClick(suggestion)}
      onMouseEnter={onMouseEnter}
    >
      {suggestion}
    </div>
  );
};

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  suggestions = [],
  placeholder = "Digite algo...",
  onSelect,
  className = "",
  value,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<
    string | number | undefined
  >(value);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] =
    useState<number>(-1);
  const [isUserTyping, setIsUserTyping] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Sincroniza valor externo
  useEffect(() => {
    if (value !== selectedValue) {
      setSelectedValue(value);
      const match = suggestions.find((s) => s.change === value);
      setInputValue(match?.label || "");
    }
  }, [value, suggestions, selectedValue]);

  // Filtra sugestões conforme input
  useEffect(() => {
    if (inputValue && isUserTyping) {
      const filtered = suggestions
        .map((s) => s.label)
        .filter((label) =>
          label.toLowerCase().includes(inputValue.toLowerCase()),
        );

      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
      setActiveSuggestionIndex(-1);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  }, [inputValue, suggestions, isUserTyping]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newLabel = e.target.value;
    setInputValue(newLabel);
    setIsUserTyping(true);
    setSelectedValue(undefined); // resetar valor selecionado

    if (onChange) {
      onChange(""); // ou null/undefined
    }
  };

  const handleSuggestionClick = (label: string) => {
    const selected = suggestions.find((s) => s.label === label);
    if (!selected) return;

    setInputValue(selected.label);
    setSelectedValue(selected.change);
    setShowSuggestions(false);
    setActiveSuggestionIndex(-1);
    setIsUserTyping(false);

    inputRef.current?.focus();

    if (onChange) {
      onChange(selected.change);
    }

    if (onSelect) {
      onSelect(selected.label);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveSuggestionIndex((prev) =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveSuggestionIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (activeSuggestionIndex >= 0) {
          const selectedLabel = filteredSuggestions[activeSuggestionIndex];
          handleSuggestionClick(selectedLabel);
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        setActiveSuggestionIndex(-1);
        break;
    }
  };

  const handleMouseEnterSuggestion = (index: number) => {
    setActiveSuggestionIndex(index);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent<Document> | Event) => {
      const target = event.target as Node;

      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(target) &&
        inputRef.current &&
        !inputRef.current.contains(target)
      ) {
        setShowSuggestions(false);
        setActiveSuggestionIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={className}>
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsUserTyping(true)}
          className="w-full"
        />

        {showSuggestions && filteredSuggestions.length > 0 && (
          <div
            ref={suggestionsRef}
            className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto mt-1"
          >
            {filteredSuggestions.map((label, index) => (
              <SuggestionItem
                key={`${label}-${index}`}
                suggestion={label}
                isActive={index === activeSuggestionIndex}
                onClick={handleSuggestionClick}
                onMouseEnter={() => handleMouseEnterSuggestion(index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AutocompleteInput;
