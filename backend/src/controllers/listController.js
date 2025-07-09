const User = require("../models/User");
const AnimeListEntry = require("../models/AnimeListEntry");
const CustomList = require("../models/CutsomList");

// Add anime to a default list
exports.addToDefaultList = async (req, res, next) => {
  const { animeId, coverImage, title, format, episodes, duration, listTitle } =
    req.body;

  if (
    !["watching", "completed", "planToWatch", "dropped", "onHold"].includes(
      listTitle
    )
  ) {
    return res.status(400).json({ message: "Invalid default list title." });
  }

  try {
    let animeListEntry = await AnimeListEntry.findOne({ animeId });

    if (!animeListEntry) {
      animeListEntry = await AnimeListEntry.create({
        animeId,
        coverImage,
        title,
        format,
        episodes,
        duration,
      });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Remove anime from all other default lists
    for (const key of Object.keys(user.defaultLists)) {
      user.defaultLists[key] = user.defaultLists[key].filter(
        (entryId) => entryId.toString() !== animeListEntry._id.toString()
      );
    }

    // Add entry to the specified default list
    user.defaultLists[listTitle].push(animeListEntry._id);
    await user.save();

    res.status(200).json({
      message: `Anime added to ${listTitle} list.`,
      anime: animeListEntry,
    });
  } catch (err) {
    console.error("Error adding to default list:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Check if an anime is already in any of the default list of user
exports.checkDefaultListStatus = async (req, res, next) => {
  const { animeId } = req.params;

  const user = await User.findById(req.user.id).populate(
    "defaultLists.watching defaultLists.completed defaultLists.planToWatch defaultLists.dropped defaultLists.onHold"
  );

  if (!user) return res.status(404).json({ message: "User not found" });

  const defaultLists = user.defaultLists;

  for (const listName in defaultLists) {
    const list = defaultLists[listName];

    if (Array.isArray(list)) {
      const found = list.some((entry) => entry.animeId === animeId);
      const entry = list.find((entry) => entry.animeId === animeId);
      if (found) return res.json({ currentList: listName, entryId: entry._id });
    }
  }

  return res.json({ currentList: null, entryId: null });
};

// Remove anime from default list
exports.removeFromDefaultList = async (req, res, next) => {
  const { animeId } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    let removedFrom = null;

    for (const listName of Object.keys(user.defaultLists)) {
      const originalLength = user.defaultLists[listName].length;
      user.defaultLists[listName] = user.defaultLists[listName].filter(
        (entryId) => entryId.toString() !== animeId
      );

      if (user.defaultLists[listName].length < originalLength) {
        removedFrom = listName;
      }
    }

    if (removedFrom) {
      await user.save();
      return res.json({ message: `Anime removed from ${removedFrom} list.` });
    }

    return res.status(404).json({ message: "Anime not found in any list." });
  } catch (err) {
    console.error("Error removing from default list:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
