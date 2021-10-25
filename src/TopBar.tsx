import './App.css';
import { Mode } from './types';

type Props = {
  mode: Mode;
  toggleMode: (mode: Mode) => void;
};

export const TopBar = ({ mode, toggleMode }: Props) => {
  return (
    <div className="header">
      <h1 className="title">Where in the world?</h1>

      {mode === Mode.Light ? (
        <ThemeButton
          text="Dark Mode"
          toggleMode={() => toggleMode(Mode.Dark)}
        />
      ) : (
        <ThemeButton
          text="Light Mode"
          toggleMode={() => toggleMode(Mode.Light)}
        />
      )}
    </div>
  );
};

function ThemeButton({
  text,
  toggleMode
}: {
  text: string;
  toggleMode: any;
}): any {
  return (
    <button
      className="theme-button"
      onClick={event => {
        event.preventDefault();
        toggleMode();
      }}
    >
      {text}
    </button>
  );
}
