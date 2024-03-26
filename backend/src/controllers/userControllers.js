import axios from "axios";
import { User } from "../models/userModel.js";
const getUserProfile = async (req, res) => {
  const { username } = req.params;
  const fetchUser =
    username === ""
      ? "https://api.github.com/users/esraa102"
      : `https://api.github.com/users/${username}`;

  const fetchRepos =
    username === ""
      ? "https://api.github.com/users/esraa102/repos"
      : `https://api.github.com/users/${username}/repos`;
  try {
    const { data: userProfile } = await axios.get(fetchUser, {
      headers: {
        authorization: `Bearer ${process.env.GITHUB_API_KEY}`,
      },
    });
    if (!userProfile) {
      res.status(404);
      throw new Error("User Not Found");
    }
    const { data: repos } = await axios.get(fetchRepos, {
      headers: {
        authorization: `Bearer ${process.env.GITHUB_API_KEY}`,
      },
    });
    res.status(200).json({ userProfile, repos });
  } catch (error) {
    res.status(500);
    throw new Error("Inernal Server Error");
  }
};

const likeProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findById(req.user._id.toString());
    console.log(user, "auth user");

    const userToLike = await User.findOne({ username });

    if (!userToLike) {
      return res.status(404).json({ error: "User is not  member" });
    }

    if (user.likedProfiles.includes(userToLike.username)) {
      return res.status(400).json({ error: "You already liked this profile" });
    }

    userToLike.likedBy.push({
      username: user.username,
      avatarUrl: user.avatarUrl,
      likedDate: Date.now(),
    });
    user.likedProfiles.push(userToLike.username);

    await Promise.all([userToLike.save(), user.save()]);

    res.status(200).json({ message: "Liked Sucessfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLikes = async (req, res) => {
  try {
    const user = await User.findById(req.user._id.toString());
    res.status(200).json({ likedBy: user.likedBy });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getUserProfile, likeProfile, getLikes };
