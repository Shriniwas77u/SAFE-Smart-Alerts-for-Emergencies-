import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchForm = ({ 
  placeholder = "Search...", 
  onSearch, 
  className = "",
  buttonText = "Search",
  buttonIcon = "bi-search",
  size = "md",
  showButton = true,
  route = null,
  disabled = false
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    
    try {
      if (route) {
        // If route is provided, navigate to the route with search query as parameter
        navigate(`${route}?q=${encodeURIComponent(searchQuery)}`);
      } else if (onSearch) {
        // Otherwise, call the onSearch callback
        await onSearch(searchQuery);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          input: 'form-control-sm',
          button: 'btn-sm'
        };
      case 'lg':
        return {
          input: 'form-control-lg',
          button: 'btn-lg'
        };
      default:
        return {
          input: '',
          button: ''
        };
    }
  };

  const sizeClasses = getSizeClasses();

  return (
    <form onSubmit={handleSubmit} className={`d-flex ${className}`}>
      <div className="input-group">
        <input
          type="text"
          className={`form-control ${sizeClasses.input}`}
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          disabled={disabled || isLoading}
          aria-label="Search"
        />
        {showButton && (
          <button
            className={`btn btn-primary ${sizeClasses.button}`}
            type="submit"
            disabled={disabled || isLoading || !searchQuery.trim()}
          >
            {isLoading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              <>
                <i className={`bi ${buttonIcon} me-1`}></i>
                {buttonText}
              </>
            )}
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchForm;