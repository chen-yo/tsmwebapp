var express = require("express");
const { QueryTypes } = require("sequelize");
var router = express.Router();
const sequelize = require("../connect");

router.get("/country_er_day", async function (req, res) {
  const rows = await sequelize.query(
    "SELECT * FROM tsm.dashboard_Country_ER_day ORDER BY today DESC LIMIT 10",
    { type: QueryTypes.SELECT }
  );

  const mapper = {
    "Country Estimated Revenue [$]": "country",
    Yesterday: "yesterday",
    Today: "today",
    "Diff [%]": "diff",
  };

  const data = {
    country: [],
    yesterday: [],
    today: [],
    diff: [],
  };

  for (let i = 0; i < rows.length; i++) {
    const [country, yesterday, today, diff] = Object.values(rows[i]);
    data.country.push(country);
    data.yesterday.push(yesterday);
    data.today.push(today);
    data.diff.push(diff);
  }

  res.json(data);
});

module.exports = router;
