/* eslint-disable react/prop-types */
import { Repo } from ".";
const Repos = ({ repos }) => {
  return (
    <>
      <ol className="relative border-s border-gray-200">
        {repos.length === 0 && (
          <li className="text-center text-gray-500">No Repos For This User</li>
        )}
        {repos.length > 0 &&
          repos.map((item) => <Repo key={item.id} repo={item} />)}
      </ol>
    </>
  );
};
//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

export default Repos;
