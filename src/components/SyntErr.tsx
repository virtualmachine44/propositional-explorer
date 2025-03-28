import React from 'react';
import { SyntaxError } from '@fmfi-uk-1-ain-412/js-fol-parser';

interface SyntErrProps {
  inputString: string;
  error: SyntaxError | null;
}

const SyntErr: React.FC<SyntErrProps> = ({ inputString, error }) => {
  if (!error) return null;

  const errorMessage = error.message.split('\n').map((line: string, index: number) => (
    <p key={index}>{line}</p>
  ));

  const errorLocationStart = error.location.start.column;
  const errorLocationEnd = error.location.end.column;
  const inputStringBeggining = inputString.substring(0, errorLocationStart-1);
  const errorSubstring = inputString.substring(errorLocationStart-1, errorLocationEnd);
  const inputStringTheRest = inputString.substring(errorLocationEnd, inputString.length);

  return (
    <div className="synt-err">
      {inputStringBeggining}<mark>{errorSubstring}</mark>{inputStringTheRest}
      {errorMessage}
    </div>
  );
};

export default SyntErr;