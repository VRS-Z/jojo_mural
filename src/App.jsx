import "./App.css";
import { useState, useRef } from "react";
import resetSound from "./assets/videoplayback.mp3";

/* ---------------- COMPONENTES SIMPLES ---------------- */

function MyText() {
  return <h3>Um simples mural com alguns personagens de Jojo</h3>;
}

function Character({ name, img, width = 90, border = 50, height = 80 }) {
  return (
    <div className="character">
      <img
        src={img}
        alt={name}
        width={width}
        height={height}
        style={{ borderRadius: border }}
      />
      <h2>{name}</h2>
    </div>
  );
}

function Characters({ children }) {
  return <section className="characters">{children}</section>;
}

/* ---------------- EMPORIO (UNDO) ---------------- */

function Emporio({ onRestore }) {
  return (
    <div className="emporio" onClick={onRestore}>
      <img
        src="https://static.jojowiki.com/images/thumb/6/6b/latest/20201201194018/Emporio_Alnino_Infobox_Manga.png/300px-Emporio_Alnino_Infobox_Manga.png"
        alt="Emporio Alnino"
        width={90}
        style={{ borderRadius: 50 }}
      />
      <h2>Emporio Alnino</h2>
      <p>(Clique para desfazer o Reset)</p>
    </div>
  );
}

/* ---------------- MODAL ---------------- */

function Modal({ onConfirm }) {
  return (
    <div className="modal fade" id="resetModal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content bg-dark text-light">
          <div className="modal-header">
            <h5 className="modal-title">Reset Universal</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div className="modal-body">
            <p>Deseja realmente executar o Reset Universal?</p>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Não
            </button>

            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={onConfirm}
            >
              Sim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- APP PRINCIPAL ---------------- */

export default function MyApp() {
  //  Estados
  const [reseted, setReseted] = useState(false);
  const [resetting, setResetting] = useState(false);

  const resetAudioRef = useRef(null);

  // cria o áudio uma única vez
  if (!resetAudioRef.current) {
    resetAudioRef.current = new Audio(resetSound);
    resetAudioRef.current.volume = 0; // começa mudo (fade-in)
  }

  function resetUniversal() {
    const audio = resetAudioRef.current;

    // reinicia o áudio
    audio.pause();
    audio.currentTime = 0;
    audio.play();

    // fade-in lento
    let volume = 0;
    audio.volume = volume;

    const fadeIn = setInterval(() => {
      if (volume < 0.6) {
        volume += 0.02;
        audio.volume = volume;
      } else {
        clearInterval(fadeIn);
      }
    }, 100);

    setResetting(true);

    // tempo total da destruição
    setTimeout(() => {
      setReseted(true);
      setResetting(false);
    }, 15000);
  }

  function restoreUniverse() {
    resetAudioRef.current.pause();
    resetAudioRef.current.currentTime = 0;

    setReseted(false);
  }

  //  TELA APÓS RESET
  if (reseted) {
    return (
      <div className="reset-screen">
        <h1>Parece que o mal venceu......</h1>
        <Emporio onRestore={restoreUniverse} />
      </div>
    );
  }

  //  TELA NORMAL
  return (
    <div className={`app universe ${resetting ? "resetting no-input" : ""}`}>
      <MyText />

      <Characters>
        <Character
          name="Yoshikage Kira"
          img="https://www.pngkey.com/png/detail/570-5707911_yoshikage-kira-clipart-yoshikage-kira-jotaro-kujo-josuke.png"
        />
        <Character
          name="Josuke Higashikata"
          img="https://tse4.mm.bing.net/th/id/OIP.SZaau3zjrlnvT9CVFDtiNwHaHM?rs=1&pid=ImgDetMain&o=7&rm=3"
        />
        <Character
          name="Jotaro Joestar"
          img="https://assets.mycast.io/characters/jotaro-kujo-353117-normal.jpg?1575351491"
        />
        <Character
          name="Dio Brando"
          img="https://static.jojowiki.com/images/thumb/1/17/latest/20240625231619/ASBR_DIO_Game_Tab.png/300px-ASBR_DIO_Game_Tab.png"
        />
        <Character
          name="Jhonny Joestar"
          img="https://i.pinimg.com/originals/f2/bf/ee/f2bfee73bb4bdd7535637878f65407f3.jpg"
        />
        <Character
          name="Gyro Zeppelin"
          img="https://i.pinimg.com/736x/cf/b4/97/cfb49728fe4cee9780f8c4d47815849c.jpg"
        />
        <Character
          name="Funny Valentine"
          img="https://tse4.mm.bing.net/th/id/OIP.d2Z0jPK2-k9QVwUa4wMm9wHaDq?w=959&h=474&rs=1&pid=ImgDetMain&o=7&rm=3"
        />
        <Character
          name="Toru"
          img="https://i.pinimg.com/736x/e5/2b/04/e52b04587e7e2032164d256efab31f06.jpg"
        />
        <Character
          name="Rohan Kishibhe"
          img="https://i.pinimg.com/736x/b9/1e/d8/b91ed87f8bb6fe80ef55d4069b986788.jpg"
        />
        <Character
          name="Koiche"
          img="https://th.bing.com/th/id/R.2b44ddcefe9ddebd80bd96f2adf49161?rik=YLaof4jZbcg1FQ&pid=ImgRaw&r=0"
        />
        <Character
          name="Okuyasu"
          img="https://i1.sndcdn.com/artworks-000221982522-kky9ar-t500x500.jpg"
        />
        <Character
          name="Pucchi"
          img="https://i.pinimg.com/originals/55/3c/80/553c807086183045e904586628c90ee3.jpg"
        />
      </Characters>

      <button
        type="button"
        className="btn btn-outline-light mt-4 position-relative bottom-0 end-0"
        data-bs-toggle="modal"
        data-bs-target="#resetModal"
      >
        Reset Universal
      </button>

      <Modal onConfirm={resetUniversal} />
    </div>
  );
}
