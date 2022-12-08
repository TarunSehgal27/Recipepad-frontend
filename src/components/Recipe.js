import { Link } from "react-router-dom";

const Recipe = ({ recipe }) => {
  return (
    <div
      key={recipe.id}
      className="w-80 overflow-hidden rounded-2xl bg-white/75 shadow-xl shadow-rose-100 border-2 border-white p-5"
    >
      <div className="overflow-hidden rounded-xl h-40 flex justify-center items-center">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="rounded-xl w-full block"
        />
      </div>
      <div className="pt-5 flex flex-col">
        <p className="text-xs uppercase text-sky-400 font-semibold tracking-widest">
          {recipe.publisher}
        </p>
        <h2 className="text-2xl capitalize truncate font-medium">
          {recipe.title}
        </h2>
        <Link
          to={`recipe-item/${recipe.id}`}
          className="bg-gradient-to-br from-rose-400 to-rose-600 self-start text-rose-50 text-sm uppercase font-medium tracking-wider p-3 px-8 rounded-lg mt-2 shadow-md shadow-rose-200 hover:shadow-lg hover:shadow-rose-300 duration-300"
        >
          View recipe
        </Link>
      </div>
    </div>
  );
};

export default Recipe;
