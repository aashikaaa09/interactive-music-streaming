import { useSearchContext } from '../context/SearchContext';

/**
 * Custom hook to access reactive music search & filtering state
 */
export const useMusicSearch = () => {
  return useSearchContext();
};
