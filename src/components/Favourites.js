import Recipe from "./Recipe";

const Favourites = ({ savedItems }) => {
  return (
    <>
      <div className="text-2xl lg:text-4xl text-center font-semibold text-rose-300 leading-normal py-8">
        {savedItems.length === 0 ? (
          <p>Your favourite list is empty!</p>
        ) : (
          <p>Your favourite recipe{savedItems.length !== 1 ? "s" : null}!</p>
        )}
      </div>
      <div className="container mx-auto py-8 flex flex-wrap gap-10 justify-center">
        {savedItems.map((recipe) => (
          <Recipe key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </>
  );
};

export default Favourites;
