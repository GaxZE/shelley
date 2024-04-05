module.exports = function (results, context) {
  // accumulate the errors and warnings
  var summary = results.reduce(
    function (seq, current) {
      seq.errors += current.errorCount;
      seq.warnings += current.warningCount;
      return seq;
    },
    { errors: 0, warnings: 0 },
  );

  if (summary.errors > 0 || summary.warnings > 0) {
    console.log(
      "\nErrors: " + summary.errors + ", Warnings: " + summary.warnings + "\n",
    );
    if (summary.errors > 0) process.exit(1);
  }

  return "";
};
