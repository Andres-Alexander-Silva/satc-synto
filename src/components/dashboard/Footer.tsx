import { Fragment, useEffect, useState } from "react";
import { format } from "date-fns";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(format(new Date(), "yyyy"));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentYear(format(new Date(), "yyyy"));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Fragment>
      <footer className="mt-auto py-3 border-t dark:border-white/10 bg-white dark:bg-bgdark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center">
            Copyright © <span id="year">{currentYear}</span>{" "}
            <a href="#" className="text-primary">
              SATC
            </a>
            . Diseñado Todos los derechos reservados{" "}
          </p>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
