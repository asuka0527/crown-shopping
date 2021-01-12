import { connect } from "react-redux";
import { compose } from "redux";

import { createStructuredSelector } from "reselect";

import { selectIsCollectionFetching } from "../../redux/shop/shop.selectors";

import WithSpinner from "../../components/with-spinner/with-spinner.component";

import CollectionOverview from "../../components/collections-overview/collections-overview.components";

// Container Pattern - abstracts the movement of data from the the component. bec we want the components to be as simple as possible

const mapStateToProps = createStructuredSelector({
  // naming should be strictly the same with the props naming
  isLoading: selectIsCollectionFetching,
});

const CollectionsOverviewContainer = compose(
  connect(mapStateToProps)(WithSpinner(CollectionOverview))
);

export default CollectionsOverviewContainer;
