import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { LANGUAGES_BUTTONS } from "../utils/constants";
import { Loading, Repos } from "../components";

const Explore = () => {
  const [repos, setRepos] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lang, setLang] = useState("");
  const getRepos = async (language) => {
    setRepos(null);
    setIsLoading(true);
    try {
      const { data } = await axios.get(`/api/explore/repos/${language}`);
      if (data) setRepos(data.repos.items);
      setIsLoading(false);
      setLang(language);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="section">
      <div className="w-full md:w-[70%] mx-auto bg-glass px-4 py-2 md:px-6 md:py-4 rounded-md">
        <h1 className="text-center text-lg md:text-2xl font-semibold mb-6">
          Explore Populare Repositroies
        </h1>
        <div className="flex flex-wrap gap-3 justify-center">
          {LANGUAGES_BUTTONS.map((btn) => (
            <button
              type="button"
              key={btn.lang}
              onClick={() => getRepos(btn.lang)}
            >
              <img src={btn.imgSrc} alt={`${btn.lang} logo`} />
            </button>
          ))}
        </div>
      </div>
      {repos && repos.length > 0 && (
        <h2 className="text-2xl md:text-3xl font-semibold my-10  w-full lg:w-[90%] mx-auto">
          <span className="text-main">{lang.toUpperCase()}</span> Repositories
        </h2>
      )}

      {isLoading && (
        <div className="w-full lg:w-[90%] mx-auto bg-glass p-8 rounded-lg my-10">
          <Loading />
        </div>
      )}
      {!isLoading && repos && (
        <div className="w-full lg:w-[90%] mx-auto bg-glass p-8 rounded-lg my-10">
          {repos.length > 0 && <Repos repos={repos} />}
        </div>
      )}
    </section>
  );
};

export default Explore;
