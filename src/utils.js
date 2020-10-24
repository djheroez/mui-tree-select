import { fromJS } from "immutable";
import last from "lodash/last";

export const treeBuilder = ({ hierarchyField, itemId, items }) =>
  items.reduce((acc, current) => {
    const hierarchies = current.get(hierarchyField).split(".");

    if (hierarchies.length > 1) {
      const parents = hierarchies.slice(0, hierarchies.length - 1);

      return parents.reduce((parentAcc, parent) => {
        const parentIndex = parentAcc.findIndex(
          elem => elem.get(itemId) === parent
        );

        if (parentIndex >= 0) {
          return parentAcc.setIn(
            [parentIndex, "children"],
            parentAcc.getIn([parentIndex, "children"], fromJS([])).push(current)
          );
        }

        return parentAcc.push(items.find(item => item.get(itemId) === parent));
      }, acc);
    }

    return acc.find(elem => elem.get(itemId) === current.get(itemId))?.toSeq()
      ?.size
      ? acc
      : acc.push(current);
  }, fromJS([]));

export const getDescription = ({ option, hierarchyField, itemLabel }) =>
  option?.toSeq()?.size
    ? `[${last(option.get(hierarchyField).split("."))}] ${option.get(
        itemLabel
      )}`
    : "";
