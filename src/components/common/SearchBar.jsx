import React, { useRef, useEffect } from "react";

export const SearchBar = ({
  value,
  onChange,
  placeholder = "Search records...",
  autoFocus = false,
  className = ""
}) => {
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (autoFocus && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <div className={`search-input-wrapper ${className}`}>
      <span className="search-icon">🔍</span>
      <input
        ref={searchInputRef}
        type="text"
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search input"
      />
      {value && (
        <button
          style={{
            position: "absolute",
            right: "0.75rem",
            top: "50%",
            transform: "translateY(-50%)",
            color: "var(--text-muted)"
          }}
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
};
