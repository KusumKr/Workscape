import React, { useState } from 'react';
import './FilterBar.css';

interface FilterOptions {
  internetSpeed: string;
  budget: string;
  weather: string;
  state: string;
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
    state: 'all',
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
        <label>State/UT (India):</label>
        <select
          value={filters.state}
          onChange={(e) => handleChange('state', e.target.value)}
        >
          <option value="all">All India</option>
          <option value="Andhra Pradesh">Andhra Pradesh</option>
          <option value="Arunachal Pradesh">Arunachal Pradesh</option>
          <option value="Assam">Assam</option>
          <option value="Bihar">Bihar</option>
          <option value="Chhattisgarh">Chhattisgarh</option>
          <option value="Goa">Goa</option>
          <option value="Gujarat">Gujarat</option>
          <option value="Haryana">Haryana</option>
          <option value="Himachal Pradesh">Himachal Pradesh</option>
          <option value="Jharkhand">Jharkhand</option>
          <option value="Karnataka">Karnataka</option>
          <option value="Kerala">Kerala</option>
          <option value="Madhya Pradesh">Madhya Pradesh</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Manipur">Manipur</option>
          <option value="Meghalaya">Meghalaya</option>
          <option value="Mizoram">Mizoram</option>
          <option value="Nagaland">Nagaland</option>
          <option value="Odisha">Odisha</option>
          <option value="Punjab">Punjab</option>
          <option value="Rajasthan">Rajasthan</option>
          <option value="Sikkim">Sikkim</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
          <option value="Telangana">Telangana</option>
          <option value="Tripura">Tripura</option>
          <option value="Uttar Pradesh">Uttar Pradesh</option>
          <option value="Uttarakhand">Uttarakhand</option>
          <option value="West Bengal">West Bengal</option>
          <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
          <option value="Chandigarh">Chandigarh</option>
          <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
          <option value="Delhi">Delhi</option>
          <option value="Jammu and Kashmir">Jammu and Kashmir</option>
          <option value="Ladakh">Ladakh</option>
          <option value="Lakshadweep">Lakshadweep</option>
          <option value="Puducherry">Puducherry</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Budget Range:</label>
        <select
          value={filters.budget}
          onChange={(e) => handleChange('budget', e.target.value)}
        >
          <option value="all">All Budgets</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
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