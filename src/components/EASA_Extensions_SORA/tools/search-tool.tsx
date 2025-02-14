import { SearchInput } from '@pega/cosmos-react-core';
import { useCallback, useEffect, useState } from 'react';
import SearchViewModel from '@arcgis/core/widgets/Search/SearchViewModel';
import { getView } from '../map/view';
import useDebouncedEffect from '../hooks/useDebouncedEffect';
import type { SearchResult } from '@pega/cosmos-react-core/lib/components/SearchInput/SearchInput';
import * as reactiveUtils from '@arcgis/core/core/reactiveUtils';

const SearchTool = () => {
  const [searchString, setSearchString] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeSearchResult, setActiveSearchResult] =
    useState<__esri.SearchViewModelSearchResult | null>();
  const [searchViewModel, setSearchViewModel] = useState<SearchViewModel>();
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [locatorResults, setLocatorResults] = useState<__esri.SearchViewModelSuggestResult[]>([]);

  const mapResults = useCallback(
    (results: __esri.SearchViewModelSuggestResult[]): SearchResult[] => {
      return results.map(result => ({
        primary: result.text,
        secondary: [],
        id: result.key
      }));
    },
    []
  );

  useEffect(() => {
    let mounted = true;

    reactiveUtils
      .whenOnce(() => getView().ready)
      .then(() => {
        if (mounted) {
          setSearchViewModel(
            new SearchViewModel({
              view: getView(),
              includeDefaultSources: true,
              resultGraphicEnabled: false,
              maxSuggestions: 4,
              popupEnabled: false,
              minSuggestCharacters: 1
            })
          );
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  useDebouncedEffect(
    () => {
      if (!searchViewModel || !searchString || activeSearchResult?.name === searchString) {
        setLoading(false);
        return;
      }

      setSearchResults([]);
      setLocatorResults([]);

      searchViewModel
        .suggest(searchString)
        .then((res: __esri.SearchViewModelSuggestResponse) => {
          if (res.results[0]?.results) {
            setSearchResults(mapResults(res.results[0].results));
            setLocatorResults(res.results[0].results);
          }
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    },
    500,
    [searchString, searchViewModel, activeSearchResult]
  );

  const handleSearchResult = useCallback(
    (index: number) => {
      if (!searchViewModel || !locatorResults[index]) return;

      searchViewModel.search(locatorResults[index]).then(res => {
        const result = res?.results[0]?.results[0];
        if (result) {
          setActiveSearchResult(result);
          setSearchResults([]);
          setSearchString(locatorResults[index].text);
        }
      });
    },
    [locatorResults, searchViewModel]
  );

  useEffect(() => {
    if (activeSearchResult?.feature?.geometry) {
      getView().goTo({
        target: activeSearchResult.feature.geometry as __esri.Point,
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
        onClick: () => handleSearchResult(index)
      }))}
      onSearchChange={(v: string) => {
        setLoading(v?.length > 0);
        setSearchString(v);
      }}
    />
  );
};

export default SearchTool;
