import { SearchInput } from '@pega/cosmos-react-core';
import { useEffect, useState } from 'react';
import SearchViewModel from '@arcgis/core/widgets/Search/SearchViewModel';
import View from './View';
import useDebouncedEffect from './hooks/useDebouncedEffect';
import type { SearchResult } from '@pega/cosmos-react-core/lib/components/SearchInput/SearchInput';

const SearchTool = () => {
  const [searchString, setSearchString] = useState('');
  const [loading, setLoading] = useState(false);

  const [activeSearchResult, setActiveSearchResult] =
    useState<__esri.SearchViewModelSearchResult | null>();
  const [searchViewModel, setSearchViewModel] = useState<SearchViewModel>();
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [locatorResults, setLocatorResults] = useState<__esri.SearchViewModelSuggestResult[]>([]);

  const mapResults = (results: __esri.SearchViewModelSuggestResult[]): SearchResult[] => {
    return results.map(result => ({
      primary: result.text,
      secondary: [],
      id: result.key
    }));
  };

  useEffect(() => {
    View.when(() => {
      setSearchViewModel(
        new SearchViewModel({
          view: View,
          includeDefaultSources: true,
          resultGraphicEnabled: false,
          maxSuggestions: 4,
          popupEnabled: false,
          minSuggestCharacters: 1
        })
      );
    });
  }, []);

  useDebouncedEffect(
    () => {
      if (!searchViewModel) return;
      if (activeSearchResult?.name === searchString) return;

      setSearchResults([]);
      setLocatorResults([]);

      searchViewModel
        .suggest(searchString)
        .then((res: __esri.SearchViewModelSuggestResponse) => {
          setSearchResults(mapResults(res.results[0].results));
          setLocatorResults(res.results[0].results);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    },
    500,
    [searchString]
  );

  useEffect(() => {
    if (activeSearchResult) {
      const mapPoint = activeSearchResult.feature.geometry as __esri.Point;
      View.goTo({
        target: mapPoint,
        duration: 1000
      });
    }
  }, [activeSearchResult]);

  return (
    <SearchInput
      placeholder='Search location...'
      loading={loading}
      value={searchString}
      searchResults={searchResults?.map((result, index) => ({
        ...result,
        onClick: () => {
          searchViewModel?.search(locatorResults[index]).then(res => {
            setActiveSearchResult(res?.results[0]?.results[0]);
            setSearchResults([]);
            setSearchString(locatorResults[index].text);
          });
        }
      }))}
      onSearchChange={(v: string) => {
        setLoading(v?.length > 0);
        setSearchString(v);
      }}
    />
  );
};

export default SearchTool;
