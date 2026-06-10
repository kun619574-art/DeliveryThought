import { Search } from "lucide-react";

type SearchPanelProps = {
  query: string;
  onQueryChange: (value: string) => void;
  onLocate: () => void;
};

export function SearchPanel({ query, onQueryChange, onLocate }: SearchPanelProps) {
  return (
    <form
      className="search-panel"
      onSubmit={(event) => {
        event.preventDefault();
        onLocate();
      }}
    >
      <Search className="search-icon" size={19} />
      <input
        aria-label="取件码或货柜号"
        inputMode="numeric"
        placeholder="输入 9 或 9-5-2513"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
      />
      <button type="submit">定位</button>
    </form>
  );
}
