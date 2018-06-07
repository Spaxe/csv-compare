// Quick and dirty tool to compare two CSVs by column
import Papa from 'papaparse';
import Handsontable from 'handsontable';
import * as _ from 'lodash';

// CSV reader
var tableA, tableB;
const csvA = document.getElementById('csvA');
const csvB = document.getElementById('csvB');
csvA.addEventListener('change', () => {
  Papa.parse(csvA.files[0], {
    header: true,
    skipEmptyLines: true,
    complete: result => {
      tableA = result.data;
    },
  });
});
csvB.addEventListener('change', () => {
  Papa.parse(csvB.files[0], {
    header: true,
    skipEmptyLines: true,
    complete: result => {
      tableB = result.data;
    },
  });
});

// Compare and contrast
const button = document.getElementById('submit');
button.addEventListener('click', () => {
  const keyA = document.getElementById('keyA').value;
  const keyB = document.getElementById('keyB').value;

  if (!tableA || !tableB) {
    return;
  }

  const valueA = tableA.map(row => row[keyA]);
  const valueB = tableB.map(row => row[keyB]);

  const inANotInB = _.difference(valueA, valueB);
  const inBNotInA = _.difference(valueB, valueA);
  const inBothAB =  _.intersection(valueA, valueB);

  const onlyValueA = _.filter(tableA, row => inANotInB.includes(row[keyA]));
  const onlyValueB = _.filter(tableB, row => inBNotInA.includes(row[keyB]));

  console.table(onlyValueA);
  console.table(onlyValueB);

  var onlyA = document.getElementById('onlyA');
  var onlyB = document.getElementById('onlyB');

  if (onlyValueA) {
    new Handsontable(onlyA, {
      data: onlyValueA,
      rowHeaders: true,
      colHeaders: true
    });
  } else {
    onlyA.textContent = "(empty)";
  }

  if (onlyValueB) {
    new Handsontable(onlyB, {
      data: onlyValueB,
      rowHeaders: true,
      colHeaders: true
    });
  } else {
    onlyB.textContent = "(empty)";
  }

});

