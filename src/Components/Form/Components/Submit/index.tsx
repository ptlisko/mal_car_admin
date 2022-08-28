import * as React from "react";
import { get } from 'lodash-es';

import { LocalizationContext } from "../../../../Services/LocalizationService";

import { ISubmitButtonProps } from "./interfaces";

// import "./styles.scss";

/**
 * @category Component Submit Button
 */
const SubmitButton: React.FC<ISubmitButtonProps> = (props: ISubmitButtonProps): JSX.Element => {
  const localizationContext = React.useContext(LocalizationContext);
  const t = localizationContext.useFormatMessage();

  const submitting = get(props, 'submitting', false);
  const pristine = get(props, 'pristine', true);
  const valid = get(props, 'valid', false);

  const isSubmitButtonDisabled = React.useCallback((): boolean => {
    if (submitting) {
      return true;
    } else if (pristine) {
      return true;
    } else if (!valid) {
      return true;
    }

    return false;
  }, [submitting, pristine, valid]);

  // TODO: mt-2rem
  return (
    <button
      className="btn btn-success"
      type="submit"
      style={{
        cursor: isSubmitButtonDisabled() ? 'not-allowed' : 'pointer',
      }}
      disabled={isSubmitButtonDisabled()}
    >
      {t({ id: props.submitText })}
    </button>
  );
};

export default SubmitButton;
