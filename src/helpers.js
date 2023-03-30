import isEqual from "lodash/isEqual";
import orderBy from "lodash/orderBy";
import find from "lodash/find";
import filter from "lodash/filter";
import uniq from "lodash/uniq";
export const dataToRows = (data, pivot, groups, value, id) => {
  // because we are grouping and pivoting, we will need to transform the data
  const pivot_values = uniq(data.map((row) => row[pivot]));
  let columns = [...groups, ...pivot_values, "_ids"];
  let out = [];
  let used_groups = [];

  data.forEach((row) => {
    let cur_group = groups.map((g) => row[g]);
    const filter_expression = Object.fromEntries(
      groups.map((g, i) => [g, cur_group[i]])
    );
    const found_group = find(used_groups, (ug) =>
      isEqual(ug, filter_expression)
    );
    if (!found_group) {
      const items = filter(data, filter_expression);
      const pivots = pivot_values.map((p) => find(items, { [pivot]: p }));
        out.push([
          ...cur_group,
          ...pivots.map((p) => {
            return p && p[String(value)] ? p[String(value)] : null;
          }),
          JSON.stringify(
            pivots.map((p) => {
              return p && p[id] ? p[id] : null;
            })
          ),
        ]);
      used_groups.push(filter_expression);
    }
  });

  return {
    columns,
    data: out,
    groups,
    id,
    value,
    pivot_values,
  };
};

export const changesToData = (changes) => {
  const latest = [];
  changes.reverse().forEach((change) => {
    const found_cell = find(latest, { row: change[0], column: change[1] });
    if (!found_cell) {
      latest.push({
        row: change[0],
        column: change[1],
        new_val: String(change[3]),
      });
    }
  });
  return latest.map((item) => {
    const row = data[item.row];
    const total_column = row_total ? -1 : 0;
    const id_index = item.column - groups.length + total_column;
    const data_id = JSON.parse(row[row.length - 1])[id_index];
    return {
      [id]: data_id,
      [value]: String(item.new_val),
    };
  });
};