import * as React from "react";
import { Field } from 'react-final-form';
import { get, uniqueId } from 'lodash-es';

import InputError from '../../../Error';

import { LocalizationContext } from '../../../../../../Services/LocalizationService';
import Flag from "react-world-flags";

// import "./styles.scss";

// import FilterDropdownArrowIcon from "../../../../../Icons/FilterDropdownArrow";

/**
 * @category Component Input Text
 */
const InputPhoneCode: React.FC<Record<any, any>> = (props): JSX.Element => {

  const localizationContext = React.useContext(LocalizationContext);
  const t = localizationContext.useFormatMessage();

  return (
    <div className="vinisto-code">
      <div className="vinisto-user-orders__mobile-filter__btn vinisto-code__filter-btn">
        <Flag
          code={"it"}
          width={23}
          height={15}
          className="vinisto-flag"
        />
        <span className="vinisto-font-18">+420</span>
        {/* <FilterDropdownArrowIcon id={uniqueId()} alt={t({ id: 'alt.dropDown' })} title={``} className={`FilterDropdownArrowIcon` } /> */}
      </div>
      <div className="position-relative">
        <div className="vinisto-user-orders__mobile-filter__list vinisto-code__filter-list">
          <div className="vinisto-user-orders__mobile-filter__list__item">
            <Flag
              code={"cz"}
              width={23}
              height={15}
              className="vinisto-flag"
            />
            <span className="vinisto-font-18">+420</span>
          </div>
          <div className="vinisto-user-orders__mobile-filter__list__item">
            <Flag
              code={"gr"}
              width={23}
              height={15}
              className="vinisto-flag"
            />
            <span className="vinisto-font-18">+430</span>
          </div>
          <div className="vinisto-user-orders__mobile-filter__list__item">
            <Flag
              code={"sk"}
              width={23}
              height={15}
              className="vinisto-flag"
            />
            <span className="vinisto-font-18">+421</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputPhoneCode;
