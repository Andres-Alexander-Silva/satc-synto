import { Stepper, Step, StepLabel } from "@mui/material";
import { useNuevaCartaPorte } from "@/features/carta_porte/nueva/hooks";
import {
  FormRegistroCartaPorte,
  FormRegistroProductos,
} from "@/features/carta_porte/nueva/components";
import { ModalTerceros } from "@/features/registro/terceros/components";
import { useState, ChangeEvent } from "react";

const steps = ["Registro carta porte", "Registro productos"];

const SteperNuevaCartaporte = () => {
  const {
    activeStep,
    handleBack,
    methodsNuevaCartaPorte,
    onSubmit,
    terceros,
    icoterms,
    municipios,
    paises,
    detalleCartaPorteAppend,
    detalleCartaPorteFields,
    detalleCartaPorteRemove,
    clase,
    selectedActos,
    setSelectedActos,
    loading,
    imageDataUrl,
    empresaFind,
    handleOptionChange,
    selectedOption,
    formatNumber,
    totalDestinatario,
    totalRemitente,
    copyCartaporte,
    departamentos,
  } = useNuevaCartaPorte();

  const [cp, setCp] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCp(e.target.value);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <FormRegistroCartaPorte
            empresa={empresaFind}
            imageDataUrl={imageDataUrl}
            methods={methodsNuevaCartaPorte}
            terceros={terceros}
            icoterms={icoterms}
            municipios={municipios}
            paises={paises}
            handleOptionChange={handleOptionChange}
            selectedOption={selectedOption}
            formatNumber={formatNumber}
            totalDestinatario={totalDestinatario}
            totalRemitente={totalRemitente}
            departamentos={departamentos}
          />
        );
      case 1:
        return (
          <FormRegistroProductos
            methods={methodsNuevaCartaPorte}
            append={detalleCartaPorteAppend}
            fields={detalleCartaPorteFields}
            remove={detalleCartaPorteRemove}
            clase={clase}
            selectedActos={selectedActos}
            setSelectedActos={setSelectedActos}
            formatNumber={formatNumber}
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
            placeholder="Ingrese la carta porte"
            value={cp}
            onChange={handleInputChange}
          />
          <button
            type="button"
            className="ti-btn ti-btn-primary"
            onClick={() => copyCartaporte(cp, true)}
          >
            Copiar
          </button>
        </div>
      </div>
      <ModalTerceros />
      <form onSubmit={methodsNuevaCartaPorte.handleSubmit(onSubmit)}>
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

export default SteperNuevaCartaporte;
