var express = require("express");
var router = express.Router();
const Filters = require("../models/filters.model");
const Columns = require("../models/columns.model");
const { validateFiltersRules } = require("../validation/validateFilters");
const { body, validationResult } = require("express-validator");
const { validate } = require("../validation/validationUtils");

const SELECTED_AD_UNITS = "Selected Ad Units";
const SELECTED_DATES = "Selected Dates";

router.get("/", async function (req, res, next) {
  let dfpAdUnit = await Filters.findByPk(SELECTED_AD_UNITS);
  let days = await Filters.findByPk(SELECTED_DATES);
  res.json({ dfpAdUnit: dfpAdUnit.criterion, days: days.criterion });
});

router.post("/", validateFiltersRules(), validate, async (req, res) => {
  let selectedDays = await Filters.findByPk(SELECTED_DATES);
  let selectedAdUnits = await Filters.findByPk(SELECTED_AD_UNITS);

  if (selectedDays) {
    selectedDays.criterion = req.body.days;
    selectedDays.save();
  }

  if (selectedAdUnits) {
    selectedAdUnits.criterion = req.body.dfpAdUnit;
    selectedAdUnits.save();
  }

  res.json({
    days: selectedDays.criterion,
    dfpAdUnit: selectedAdUnits.criterion,
  });
});

router.get("/distinct", async (req, res) => {
  const dfpAdUnit = await Columns.findOne({
    where: { sourceName: "Dimension.AD_EXCHANGE_DFP_AD_UNIT" },
  });

  res.json({
    dfpAdUnit: dfpAdUnit.distinctValue
  });
});

module.exports = router;
