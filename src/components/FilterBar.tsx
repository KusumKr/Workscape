import React, { useState } from 'react';
import './FilterBar.css';

interface FilterOptions {
  internetSpeed: string;
  budget: string;
  weather: string;
  hasCoworking: boolean;
  hasLeisure: boolean;
}

interface FilterBarProps {
  onFilterChange: (filters: FilterOptions) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterOptions>({
    internetSpeed: 'all',
    budget: 'all',
    weather: 'all',
    hasCoworking: false,
    hasLeisure: false,
  });

  const handleChange = (name: keyof FilterOptions, value: string | boolean) => {
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label>Internet Speed:</label>
        <select
          value={filters.internetSpeed}
          onChange={(e) => handleChange('internetSpeed', e.target.value)}
        >
          <option value="all">All Speeds</option>
          <option value="very-fast">Very Fast (200+ Mbps)</option>
          <option value="fast">Fast (100-200 Mbps)</option>
          <option value="moderate">Moderate (50-100 Mbps)</option>
          <option value="slow">Slow (Below 50 Mbps)</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Budget Range:</label>
        <select
          value={filters.budget}
          onChange={(e) => handleChange('budget', e.target.value)}
        >
          <option value="all">All Budgets</option>
          <option value="low">Low ($500 or less)</option>
          <option value="medium">Medium ($500-$1000)</option>
          <option value="high">High ($1000+)</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Weather:</label>
        <select
          value={filters.weather}
          onChange={(e) => handleChange('weather', e.target.value)}
        >
          <option value="all">All Weather</option>
          <option value="tropical">Tropical</option>
          <option value="mild">Mild</option>
          <option value="cool">Cool</option>
          <option value="warm">Warm</option>
        </select>
      </div>

      <div className="filter-group checkbox">
        <label>
          <input
            type="checkbox"
            checked={filters.hasCoworking}
            onChange={(e) => handleChange('hasCoworking', e.target.checked)}
          />
          Has Coworking Spaces
        </label>
      </div>

      <div className="filter-group checkbox">
        <label>
          <input
            type="checkbox"
            checked={filters.hasLeisure}
            onChange={(e) => handleChange('hasLeisure', e.target.checked)}
          />
          Has Leisure Activities
        </label>
      </div>
    </div>
  );
};

export default FilterBar; 