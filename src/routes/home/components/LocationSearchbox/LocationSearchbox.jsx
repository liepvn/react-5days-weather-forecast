import { useCallback } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { searchLocations } from 'routes/home/home.action';

import './LocationSearchbox.style.scss';

/**
 * Location searchbox component
 *
 * @param {object} selected The selected options
 * @param {function} 
 * @returns {JSX.Element}
 */
export function LocationSearchbox({ onChange, selected }) {
  const intl = useIntl();
  const dispatch = useDispatch();
  const isLoading = useSelector(({ home }) => home.isSearching);
  const locations = useSelector(({ home }) => home.locations);
  const handleSearchLocations = useCallback(
    (query) => {
      dispatch(searchLocations(query));
    },
    [dispatch]
  );

  return (
    <div className='location-searchbox'>
      <i className="bi bi-search text-muted"></i>
      <AsyncTypeahead
        id='location-search-box'
        options={locations}
        labelKey='title'
        isLoading={isLoading}
        onSearch={handleSearchLocations}
        onChange={onChange}
        selected={selected}
        placeholder={intl.formatMessage({ id: 'search.location', defaultMessage: 'Type a city name' })}
      />
    </div>
  );
}
