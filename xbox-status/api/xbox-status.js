export default async function handler(req, res) {
  try {
    const response = await fetch("https://xbl.io/api/v2/player/summary", {
      headers: {
        "X-Authorization": process.env.XBL_API_KEY,
        "Accept": "application/json"
      }
    });

    const data = await response.json();

    if (!data.people || data.people.length === 0) {
      return res.status(404).json({ error: "No players found" });
    }

    // Simplify data
    const player = data.people[0];
    const result = {
      gamertag: player.gamertag,
      displayName: player.displayName,
      gamerScore: player.gamerScore,
      profilePic: player.displayPicRaw,
      state: player.presenceState,
      activity: player.presenceText || "Idle"
    };

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
