import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BsPerson, BsClock } from "react-icons/bs";
import { GiKnifeFork } from "react-icons/gi";
import { TiTick } from "react-icons/ti";
import { CgSpinner } from "react-icons/cg";

const RecipeItem = ({ saveHandler, savedItems }) => {
  const [recipe, setRecipe] = useState("");
  const [recipeNutrients, setRecipeNutrients] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [hasBeenSaved, setHasBeenSaved] = useState(null);

  const { id } = useParams();

  const navigator = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setErrorMsg("");
    setRecipe("");
    setRecipeNutrients("");

    setTimeout(() => {
      fetch(`http://127.0.0.1:9000/recipeInformation/${id}`)
        .then((res) => {
          if (!res.ok)
            throw new Error(
              "Something went wrong fetching recipe information!"
            );
          return res.json();
        })
        .then((data) => {
          setRecipe(data);
          setIsLoading(false);
        })
        .catch((err) => setErrorMsg(err.message));

      fetch(`http://127.0.0.1:9000/recipeNutrients/${id}`)
        .then((res) => {
          if (!res.ok)
            throw new Error("Something went wrong fetching recipe nutrients!");
          return res.json();
        })
        .then((data) => {
          setRecipeNutrients(data);
        })
        .catch((err) => setErrorMsg(err.message));
    }, 500);
    // eslint-disable-next-line
  }, []);

  const timeFormatter = (time) => {
    if (!time) return;

    if (!String(time).includes(".")) {
      return time + "h";
    }

    if (String(time).includes(".")) {
      return String(time).replace(".", "h") + "min";
    }
  };

  useEffect(() => {
    if (!recipe) return;
    setHasBeenSaved(savedItems.some((item) => item.id === recipe.id));
    // eslint-disable-next-line
  }, [recipe]);

  return (
    <>
      {isLoading && (
        <p className="text-2xl container mx-auto py-8 text-center">
          {errorMsg ? (
            errorMsg
          ) : (
            <CgSpinner className="animate-spin text-center inline-block" />
          )}
        </p>
      )}

      {recipe && (
        <div className="container mx-auto py-8 grid grid-cols-1 lg:grid-cols-2 gap-8 px-5 lg:px-0">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col-reverse lg:flex-row items-start lg:items-center gap-5 lg:justify-between">
              <p className="uppercase font-semibold tracking-wider text-violet-500">
                {recipe.publisher}
              </p>
              <button
                className={`p-3  px-8 rounded-full uppercase tracking-wider font-semibold duration-300 ${
                  hasBeenSaved
                    ? "text-rose-500 bg-rose-200 hover:bg-rose-500 hover:text-rose-50"
                    : "text-sky-500 bg-sky-200 hover:bg-sky-500 hover:text-sky-50"
                }`}
                onClick={() => saveHandler(recipe.id)}
              >
                {hasBeenSaved
                  ? "- Remove from favourites"
                  : "+ Save as favourite"}
              </button>
            </div>
            <h2 className="text-4xl lg:text-6xl capitalize">{recipe.title}</h2>
            <div className="flex justify-between flex-col lg:flex-row gap-3">
              <p className="uppercase font-semibold tracking-wider text-orange-500 flex items-center gap-2">
                <BsPerson /> Servings <span>(People):</span>{" "}
                <span>{recipe.servings}</span>
              </p>
              <p className="uppercase font-semibold tracking-wider text-orange-500 flex items-center gap-2">
                {" "}
                <BsClock />
                Cooking Time:{" "}
                <span>
                  {recipe.readyInMinutes < 60
                    ? String(recipe.readyInMinutes) + "min"
                    : timeFormatter(recipe.readyInMinutes / 60)}
                </span>
              </p>
            </div>
            <div className="flex gap-5 flex-col-reverse  items-start lg:flex-row">
              <button
                onClick={() => navigator(-1)}
                className="bg-rose-500 text-rose-50 p-3 px-8 rounded-full uppercase shadow-lg shadow-rose-200 hover:bg-gray-600 hover:text-gray-50 hover:shadow-gray-300 duration-300"
              >
                Go Back
              </button>
              {/* <a
                href={recipe.spoonacularSourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-sky-400 text-sky-50 p-3 px-8 rounded-full uppercase shadow-lg shadow-sky-200 hover:bg-gray-600 hover:text-gray-50 hover:shadow-gray-300 duration-300"
              >
                Get Directions
              </a> */}
            </div>
            <div>
              <span>
                {recipe.vegetarian ? (
                  <span className="bg-sky-400 text-sky-50 p-1 px-2 rounded-full">
                    vegetarian
                  </span>
                ) : (
                  <span className="bg-sky-400 text-sky-50 p-1 px-2 rounded-full">
                    non-vegetarian
                  </span>
                )}
              </span>{" "}
              <span>
                {recipe.vegan ? (
                  <span className="bg-sky-400 text-sky-50 p-1 px-2 rounded-full">
                    vegan
                  </span>
                ) : (
                  <span className="bg-sky-400 text-sky-50 p-1 px-2 rounded-full">
                    non-vegan
                  </span>
                )}
              </span>{" "}
              <span>
                {recipe.glutenFree ? (
                  <span className="bg-sky-400 text-sky-50 p-1 px-2 rounded-full">
                    glutenfree
                  </span>
                ) : (
                  <span className="bg-sky-400 text-sky-50 p-1 px-2 rounded-full">
                    contains-gluten
                  </span>
                )}
              </span>{" "}
              <span>
                {recipe.dairyFree ? (
                  <span className="bg-sky-400 text-sky-50 p-1 px-2 rounded-full">
                    dairyfree
                  </span>
                ) : null}
              </span>{" "}
              <span>
                {recipe.veryHealthy ? (
                  <span className="bg-sky-400 text-sky-50 p-1 px-2 rounded-full">
                    veryhealthy
                  </span>
                ) : null}
              </span>{" "}
            </div>
          </div>
          <div className="overflow-hidden flex justify-center items-center lg:h-96 rounded-xl">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full block rounded-xl hover:scale-105 duration-300"
            />
          </div>
          <div className="col-span-full">
            <h2 className="text-2xl lg:text-4xl flex items-center gap-3 font-medium mb-5">
              <span className="text-rose-500">
                <GiKnifeFork />
              </span>{" "}
              Ingredients:
            </h2>
            <hr className="border-rose-100" />
            <div className="mt-5">
              {recipe.extendedIngredients &&
                recipe.extendedIngredients.map((ing) => (
                  <p
                    className="leading-loose"
                    key={Math.floor(Math.random() * 100000000)}
                  >
                    <TiTick className="inline-block" />
                    <span>
                      {ing.amount && ing.amount} {ing.unit && ing.unit}{" "}
                      {ing.name && ing.name}
                    </span>{" "}
                  </p>
                ))}
              <br />
              <h2 className="text-2xl lg:text-4xl flex items-center gap-3 font-medium mb-5">
                <span className="text-rose-500">
                  <GiKnifeFork />
                </span>{" "}
                Instructions:
              </h2>
              <br />
              <p className="leading-loose">{recipe.instructions}</p>
              <br />
              <h2 className="text-2xl lg:text-4xl flex items-center gap-3 font-medium mb-5">
                <span className="text-rose-500">
                  <GiKnifeFork />
                </span>{" "}
                Plan Meal With Nutrients:
              </h2>

              <p className="leading-loose">
                <TiTick className="inline-block" />
                <span>Calories: {recipeNutrients.calories}</span>
              </p>
              <p className="leading-loose">
                <TiTick className="inline-block" />
                <span>Carbs: {recipeNutrients.carbs}</span>
              </p>
              <p className="leading-loose">
                <TiTick className="inline-block" />
                <span>Fat: {recipeNutrients.fat}</span>
              </p>
              <p className="leading-loose">
                <TiTick className="inline-block" />
                <span>Protein: {recipeNutrients.protein}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecipeItem;
