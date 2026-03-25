router.get("/", auth, async (req, res) => {
  const { date } = req.query;

  // 🔥 Convert to IST properly
  const start = new Date(date);
  start.setUTCHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setUTCHours(23, 59, 59, 999);

  // 👉 Adjust for IST (+5:30)
  start.setTime(start.getTime() - (5.5 * 60 * 60 * 1000));
  end.setTime(end.getTime() - (5.5 * 60 * 60 * 1000));

  const purchases = await Purchase.find({
    date: { $gte: start, $lte: end },
  }).populate("farmerId");

  console.log("DATE:", date);
  console.log("START:", start);
  console.log("END:", end);
  console.log("PURCHASES:", purchases);

  res.json(purchases);
});