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
              unido.org
              <IconoExterno />
            </a>
          </div>
          <div>
            <h3>Seguinos</h3>
            <a href="https://www.instagram.com/onudi.cr/" target="_blank" rel="noreferrer">
              Instagram · @onudi.cr
              <IconoExterno />
            </a>
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
