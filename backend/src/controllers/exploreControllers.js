import axios from "axios";

export const getReposByLanguage = async (req, res) => {
  const { language } = req.params;

  try {
    const { data } = await axios.get(
      `https://api.github.com/search/repositories?q=${language}&sort=stars&order=desc&pre_page=10`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_API_KEY}`,
        },
      }
    );
    res.status(200).json({ repos: data });
  } catch (error) {
    res.status(500);
    throw new Error("Internal Server Error");
  }
};
