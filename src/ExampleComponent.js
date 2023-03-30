import React, { useCallback, useEffect, useState } from 'react';
import './styles.css'
import isEqual from 'lodash/isEqual'
import find from 'lodash/find'
import filter from 'lodash/filter'
import { HotTable, HotColumn } from "@handsontable/react";
import "handsontable/dist/handsontable.min.css";
import { registerPlugin, AutoColumnSize, Autofill, ColumnSummary, ColumnSorting, ManualColumnFreeze, ContextMenu, DropdownMenu, UndoRedo} from 'handsontable/plugins';
import { HyperFormula } from 'hyperformula';
import { applyGrand, applyRow, applySub, changesToData, dataToRows } from './helpers';
registerPlugin(AutoColumnSize);
registerPlugin(Autofill);
registerPlugin(ColumnSummary);
registerPlugin(ColumnSorting );
registerPlugin(ManualColumnFreeze);
registerPlugin(ContextMenu);
registerPlugin(DropdownMenu);
registerPlugin(UndoRedo);


export default ExampleSpreadsheet;