import { Stepper, Step, StepLabel } from "@mui/material";
import { useNuevoManifiesto } from "@/features/manifiesto/nuevo/hooks";
import { FormRegistroManifiesto } from "@/features/manifiesto/nuevo/components";
import { ModalTerceros } from "@/features/registro/terceros/components";
import { ChangeEvent, useState } from "react";

const steps = ["Registro manifiesto"];

const SteperNuevoManifiesto = () => {
  const {
    activeStep,
    handleBack,
    onSubmit,
    methodsNuevoManifiesto,
    loading,
    empresaFind,
    imageDataUrl,
    vehiculos,
    conductores,
    findCartaporte,
    municipios,
    paises,
    handleOptionChange,
    selectedOption,
    currentCartaporte,
    handleClose,
    terceros,
    puntosSalida,
    copyManifiesto,
    departamentos,
  } = useNuevoManifiesto();

  const [manifiesto, setManifiesto] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setManifiesto(e.target.value);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <FormRegistroManifiesto
            conductores={conductores}
            methods={methodsNuevoManifiesto}
            empresa={empresaFind}
            imageDataUrl={imageDataUrl}
            vehiculos={vehiculos}
            findCartaporte={findCartaporte}
            municipios={municipios}
            paises={paises}
            handleOptionChange={handleOptionChange}
            selectedOption={selectedOption}
            currentCartaporte={currentCartaporte}
            handleClose={handleClose}
            terceros={terceros}
            puntosSalida={puntosSalida}
            departamentos={departamentos}
          />
        );
      default:
        null;
    }
  };

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className="flex items-center gap-2 mt-2">
        <button
          type="button"
          className="hs-dropdown-toggle ti-btn ti-btn-primary"
          data-hs-overlay="#hs-focus-management-modal-tercero"
        >
          Crear tercero
        </button>
        <div className="flex items-center gap-2">
          <input
            type="text"
            className="py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70"
            placeholder="Ingrese el manifiesto"
            value={manifiesto}
            onChange={handleInputChange}
          />
          <button
            type="button"
            className="ti-btn ti-btn-primary"
            onClick={() => copyManifiesto(Number(manifiesto), true)}
          >
            Copiar
          </button>
        </div>
      </div>
      <ModalTerceros />
      <form onSubmit={methodsNuevoManifiesto.handleSubmit(onSubmit)}>
        <div>
          <div style={{ marginTop: "10px" }}>
            {renderStepContent(activeStep)}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <button
                disabled={activeStep === 0}
                onClick={handleBack}
                className="ti-btn ti-btn-primary"
                type="submit"
              >
                Atrás
              </button>
              <button className="ti-btn ti-btn-primary" type="submit">
                {loading
                  ? "<ModalLoader />"
                  : activeStep === steps.length - 1
                  ? "Enviar formulario"
                  : "Siguiente"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SteperNuevoManifiesto;
