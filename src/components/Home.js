import Recipe from "./Recipe";
import { CgSpinner } from "react-icons/cg";
import FryingPan from "./FryingPan";

const Home = ({ recipes, isLoading, errorMsg, emptyArray, stable }) => {
  return (
    <div className="container mx-auto py-8 flex flex-wrap gap-10 justify-center">
      {!isLoading && !errorMsg && !emptyArray && recipes.length === 0 ? (
        <div className="text-2xl lg:text-4xl text-center font-semibold text-rose-300 leading-normal">
          <p>{stable}</p>
          <FryingPan />
        </div>
      ) : null}

      {isLoading && (
        <p className="text-2xl">
          {errorMsg ? errorMsg : <CgSpinner className="animate-spin" />}
        </p>
      )}

      {recipes.length === 0 && <p className="text-2xl">{emptyArray}</p>}

      {recipes.length > 0 &&
        recipes.map((recipe) => <Recipe key={recipe.id} recipe={recipe} />)}
    </div>
  );
};

export default Home;
