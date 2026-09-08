import type { TeamEditorProps } from "../interfaces";

const TeamEditor = ({ index, team, onChange }: TeamEditorProps) => {
  const number = index + 1;
  return (
    <fieldset className="team-editor">
      <legend>Team {number}</legend>
      <label htmlFor={`team-name-${number}`}>Team name</label>
      <input
        id={`team-name-${number}`}
        type="text"
        value={team.name}
        maxLength={24}
        autoComplete="off"
        placeholder={number === 1 ? "Quick Thinkers" : "Fast Talkers"}
        onChange={(event) => onChange(index, { ...team, name: event.target.value })}
        required
      />
      <label htmlFor={`team-colour-${number}`}>Token colour</label>
      <div className="colour-control">
        <input
          id={`team-colour-${number}`}
          type="color"
          value={team.colour}
          onChange={(event) => onChange(index, { ...team, colour: event.target.value })}
        />
        <span>{team.colour.toUpperCase()}</span>
      </div>
    </fieldset>
  );
};

export default TeamEditor;
