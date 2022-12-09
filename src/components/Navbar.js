import { NavLink } from "react-router-dom";

const Navbar = ({
  searchQuery,
  setSearchQuery,
  searchHandler,
  ingredientHandler,
  ingredientQuery,
  setIngredientQuery,
  inputField,
  saveCount,
}) => {
  const navActive = ({ isActive }) => {
    return {
      color: isActive ? "#f43f5e" : null,
    };
  };

  return (
    <nav className="flex justify-between items-center container mx-auto py-8 flex-col lg:flex-row gap-5 lg:gap-0">
      <h2 className="text-2xl font-bold italic">
        Recipe<span className="text-rose-500">Pad</span>
      </h2>
      <form onSubmit={searchHandler}>
        <input
          ref={inputField}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="search"
          required
          placeholder="Search recipe..."
          className="bg-white/75 p-3 px-8 lg:w-96 rounded-full outline-none shadow-lg shadow-rose-100 focus:shadow-rose-200 duration-300"
        />
      </form>

      <form onSubmit={ingredientHandler}>
        <input
          ref={inputField}
          value={ingredientQuery}
          onChange={(e) => setIngredientQuery(e.target.value)}
          type="search"
          required
          placeholder="Add Ingredients..."
          className="bg-white/75 p-3 px-8 lg:w-96 rounded-full outline-none shadow-lg shadow-rose-100 focus:shadow-rose-200 duration-300"
        />
      </form>
      
      <button
      className="bg-white/75 p-1 px-8 lg:w-45 rounded-full outline shadow-lg shadow-rose-100 focus:shadow-rose-200 duration-300"
      >
        Ingredients Search
      </button>
      
      
      <ul className="flex gap-5">
        <li>
          <NavLink
            end
            to="/"
            className="text-gray-400 hover:text-gray-600 duration-300"
            style={navActive}
          >
           Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="favourites"
            className="text-gray-400 hover:text-gray-600 duration-300"
            style={navActive}
          >
             Favourites{" "}
            <span className="font-bold text-sky-400">({saveCount})</span>
          </NavLink>
        </li>
      </ul>
    </nav>
    
  );
};

export default Navbar;
