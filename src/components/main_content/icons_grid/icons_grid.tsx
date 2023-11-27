import { useCallback, useContext } from 'react';
import { getIcons } from '../../../utils/icon_utils';
import IconEntry from './icon_entry/icon_entry';
import { DEFAULT_CATEGORY } from '../../../constants/category_constants';
import { QuillSvgProps } from '@deriv/quill-icons';
import { CategoryContext } from '../../../context/category_context';
import { SearchContext } from '../../../context/search_context';
import NoIconsFound from './no_icons_found/no_icons_found';

const IconsGrid = () => {
  const searchContext = useContext(SearchContext);
  const categoryContext = useContext(CategoryContext);

  const searchText = searchContext?.searchText ?? '';
  const categorySelected = categoryContext?.categorySelected ?? DEFAULT_CATEGORY;

  const memoizedIcons = useCallback(
    () => getIcons(searchText, categorySelected),
    [searchText, categorySelected],
  )();

  return memoizedIcons.length ? (
    <div className='grid grid-cols-3 gap-4 p-4 lg:grid-cols-4 xl:grid-cols-6'>
      {memoizedIcons.map(([iconName, icon]) => (
        <IconEntry
          key={iconName}
          iconName={iconName}
          Icon={icon as React.ForwardRefExoticComponent<Omit<QuillSvgProps, 'ref'>>}
        />
      ))}
    </div>
  ) : (
    <NoIconsFound searchText={searchText} categorySelected={categorySelected} />
  );
};

export default IconsGrid;
