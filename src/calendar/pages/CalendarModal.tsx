import { addHours } from "date-fns/esm";
import React, { useState } from "react";
import Modal from "react-modal";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { differenceInSeconds } from "date-fns";

registerLocale("es", es);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");
interface IForm {
  title: string;
  notes: string;
  start: Date;
  end: Date;
}
function CalendarModal() {
  const [modalIsOpen, setIsOpen] = useState<boolean>(true);
  const [formValues, setFormValues] = useState<IForm>({
    title: "Nestor",
    notes: "Hola",
    start: new Date(),
    end: addHours(new Date(), 2),
  });
  const onCloseModal = () => {
    console.log("cerrando");
    setIsOpen(false);
  };
  const onInputChange = (event: any) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };
  const onDateChanged = (event: Date, changing: string) => {
    setFormValues({
      ...formValues,
      [changing]: event,
    });
  };
  const onSubmit = (event: any) => {
    event.preventDefault();
    const difference = differenceInSeconds(formValues.end, formValues.start);
    console.log(difference);
    if (isNaN(difference) || difference <= 0) {
      console.log("Error en fechas");
      return;
    }
    if (formValues.title.length <= 0) return;
    console.log(formValues);
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      contentLabel="Example Modal"
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker
            dateFormat="Pp"
            className="form-control"
            selected={formValues.start}
            onChange={(date: Date) => onDateChanged(date, "start")}
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker
            minDate={formValues.start}
            dateFormat="Pp"
            className="form-control"
            selected={formValues.end}
            showTimeSelect
            locale="es"
            timeCaption="Hora"
            onChange={(date: Date) => onDateChanged(date, "end")}
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className="form-control"
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            className="form-control"
            placeholder="Notas"
            rows={5}
            name="notes"
            value={formValues.notes}
            onChange={onInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
}

export default CalendarModal;