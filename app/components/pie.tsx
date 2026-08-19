import { IconoExterno, Marca } from "./ui";

export function PieDePagina() {
  return (
    <footer className="pie">
      <div className="pie__interior">
        <div className="pie__marca">
          <Marca variante="blanco" alto={44} />
          <p>Organización de las Naciones Unidas para el Desarrollo Industrial · Costa Rica</p>
        </div>

        <div className="pie__columnas">
          <div>
            <h3>ONUDI</h3>
            <a href="https://www.unido.org/" target="_blank" rel="noreferrer">
              Sitio oficial
              <IconoExterno />
            </a>
          </div>
          <div>
            <h3>Redes oficiales</h3>
            <p className="pie__pendiente">Enlaces pendientes de confirmar</p>
          </div>
          <div>
            <h3>Contacto</h3>
            <p className="pie__pendiente">Contacto institucional pendiente de confirmar</p>
          </div>
          <div>
            <h3>Legal</h3>
            <p className="pie__pendiente">Enlaces legales y créditos pendientes</p>
          </div>
        </div>

        <p className="pie__nota">
          Micrositio informativo de iniciativas de ONUDI en Costa Rica. No sustituye al portal
          institucional.
        </p>
      </div>
    </footer>
  );
}
