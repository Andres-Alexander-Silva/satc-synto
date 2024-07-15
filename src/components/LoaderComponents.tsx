const LoaderComponents = () => {
  return (
    <div className="flex justify-center items-center p-2">
      <div
        className="ti-spinner text-primary"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
      <span className="text-gray-500 dark:text-white/70">Cargando...</span>
    </div>
  );
};

export default LoaderComponents;
