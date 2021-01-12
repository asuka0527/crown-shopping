import { createSelector } from "reselect";

// maps the string value from the URL to
// const COLLECTION_ID_MAP = {
//   hats: 1,
//   sneakers: 2,
//   jackets: 3,
//   womens: 4,
//   mens: 5,
// };

// console.log(COLLECTION_ID_MAP["hats"]);

const selectShop = (state) => state.shop;

export const selectShopCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

// AFTER DATA NORMALIZATION - converting an array to an object because it is more efficient

export const selectCollection = (collectionUrlParam) =>
  createSelector([selectShopCollections], (collections) =>
    collections ? collections[collectionUrlParam] : null
  );

// BEFORE NORMALIZATION

// export const selectCollection = (collectionUrlParam) =>
//   createSelector([selectShopCollections], (collections) =>
//     collections.find(
//       (collection) => collection.id === COLLECTION_ID_MAP[collectionUrlParam]
//     )
//   );

// CONVERTING OUR OBJECT -> ARRAY to utitlize it for our CollectionOverview
// [ UTILIZED converted SHOP DATA from firebase ] 2).
export const selectCollectionsForPreview = createSelector(
  [selectShopCollections],
  (collections) =>
    collections ? Object.keys(collections).map((key) => collections[key]) : []
);

// [ REDUX THUNK ] 3). create selector for isFetching
export const selectIsCollectionFetching = createSelector(
  [selectShop],
  (shop) => shop.isFetching
);

// !! converts null,undefined,"" -> false boolean
export const selectIsCollectionLoaded = createSelector(
  [selectShop],
  (shop) => !!shop.collections
);
