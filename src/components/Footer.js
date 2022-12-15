const Footer = () => {
  return (
    <footer className="py-8 flex flex-col gap-3 items-center bg-rose-200 opacity-75">
      <h2 className="text-2xl font-bold italic">
        Recipe<span className="text-rose-500">Pad</span>
      </h2>
      {/* <p>&copy; {new Date().getFullYear()} RecipePad. All rights reserved.</p> */}
      <p>
        Made by&nbsp;
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/ShivayBhandari"
        >
          Shivay Bhandari
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/TarunSehgal27/"
        >
          , Tarun Sehgal and&nbsp;
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/Raghav0001-malhotra"
        >
          Raghav Malhotra
        </a>
      </p>
    </footer>
  );
};

export default Footer;
