import { useContext } from 'react';
import NoIconsFound from './no_icons_found/no_icons_found';
import Loading from '../../shared/loading/loading';
import IconCategory from './icon_category/icon_category';
import { useQuillIcons } from '@deriv/hooks';
import { CATEGORIES, DEFAULT_CATEGORY } from '@deriv/constants';
import { CategoryContext, SearchContext } from '@deriv/stores';

const IconsGrid = () => {
  const searchContext = useContext(SearchContext);
  const categoryContext = useContext(CategoryContext);

  const searchText = searchContext?.search ?? '';
  const categorySelected = categoryContext?.category ?? DEFAULT_CATEGORY;

  const {
    data: quillIcons,
    isEmptyResult,
    isLoading,
  } = useQuillIcons(searchText, categorySelected);

  if (isLoading) return <Loading />;
  if (isEmptyResult)
    return <NoIconsFound searchText={searchText} categorySelected={categorySelected} />;

  return (
    <div className='flex flex-col gap-4'>
      {quillIcons.map(({ category, quillIconsModule }) => (
        <IconCategory
          key={category.toString()}
          category={category}
          quillIconsModule={quillIconsModule}
          shouldDisplayCategory={categorySelected === CATEGORIES.ALL}
        />
      ))}
    </div>
  );
};

export default IconsGrid;
