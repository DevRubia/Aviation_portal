import { useState, useEffect } from 'react';

/**
 * Custom hook to fetch system options from the API
 * @param {string|null} category - Optional category to fetch specific options
 * @returns {object} - { options, loading, error }
 */
export function useSystemOptions(category = null) {
  const [options, setOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        setLoading(true);
        const endpoint = category 
          ? `/api/options/${category}` 
          : '/api/options';
        
        const response = await window.axios.get(endpoint);
        
        if (response.data.success) {
          setOptions(response.data.data);
        }
      } catch (err) {
        console.error('Error fetching system options:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [category]);

  return { options, loading, error };
}

/**
 * Helper to get options for a specific category from grouped options
 * @param {object} allOptions - All options grouped by category
 * @param {string} category - Category to extract
 * @returns {array} - Array of {value, label} objects
 */
export function getOptionsByCategory(allOptions, category) {
  if (!allOptions || !allOptions[category]) {
    return [];
  }

  return Object.entries(allOptions[category]).map(([value, label]) => ({
    value,
    label
  }));
}
