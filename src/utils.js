import last from "lodash/last";
import isEmpty from "lodash/isEmpty";

export const treeBuilder = ({ hierarchyField, itemId, items }) =>
  items.reduce((acc, current) => {
    const hierarchies = current[hierarchyField].split(".");

    if (hierarchies.length > 1) {
      const parents = hierarchies.slice(0, hierarchies.length - 1);

      return parents.reduce((parentAcc, parent) => {
        const parentIndex = parentAcc.findIndex(
          elem => elem[itemId] === parent
        );

        if (parentIndex >= 0) {
          if (!parentAcc[parentIndex].children) {
            // eslint-disable-next-line no-param-reassign
            parentAcc[parentIndex].children = [current];
          } else {
            // eslint-disable-next-line no-param-reassign
            parentAcc[parentIndex].children = [
              ...parentAcc[parentIndex].children,
              current
            ];
          }

          return parentAcc;
        }

        return [
          ...parentAcc,
          { ...items.find(item => item[itemId] === parent) }
        ];
      }, acc);
    }

    if (!acc.find(elem => elem[itemId] === current[itemId])) {
      return [...acc, { ...current }];
    }

    return acc;
  }, []);

export const getDescription = ({ option, hierarchyField, itemLabel }) =>
  !isEmpty(option)
    ? `[${last(option[hierarchyField].split("."))}] ${option[itemLabel]}`
    : "";
