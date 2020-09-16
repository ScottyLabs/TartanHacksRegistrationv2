import React, { useState, ReactElement } from "react";
import { useFormik } from "formik";



const SchoolField = ({isCmuStudent, autoFilledSchool, formik}: {isCmuStudent: boolean, autoFilledSchool: boolean, formik: any}) => {
    // let isCmuStudent: boolean = props.isCmuStudent;
    // let autoFilledSchool: boolean = props.autoFilledSchool;
    // let formik = props.formik;
    let schoolField: ReactElement;
    if (isCmuStudent) {
      schoolField = (
        <div>
          <div className="field">
            <label>
              School <span className="required">*</span>
            </label>
            <input
              className="ui input"
              disabled
              value="Carnegie Mellon University"
            />
          </div>
          <div className="field">
            <label>
              College Within CMU <span className="required">*</span>
            </label>
            <select
              name="school"
              onChange={formik.handleChange}
              value={formik.values.school}
              required
            >
              <option value="" disabled hidden>
                Choose one...
              </option>
              <option value="Carnegie Mellon University - SCS">SCS</option>
              <option value="Carnegie Mellon University - CIT">CIT</option>
              <option value="Carnegie Mellon University - CFA">CFA</option>
              <option value="Carnegie Mellon University - Dietrich">
                Dietrich
              </option>
              <option value="Carnegie Mellon University - MCS">MCS</option>
              <option value="Carnegie Mellon University - Tepper">
                Tepper
              </option>
              <option value="Carnegie Mellon University - BXA">
                BXA Intercollege Degree Programs
              </option>
              <option value="Carnegie Mellon University - Heinz">
                Heinz
              </option>
            </select>
          </div>
        </div>
      );
    } else if (autoFilledSchool) {
      schoolField = (
        <div className="field">
          <label>
            School <span className="required">*</span>
          </label>
          <input
            className="ui input"
            disabled
            onChange={formik.handleChange}
            value={formik.values.school}
            required
          />
        </div>
      );
    } else {
      schoolField = (
        <div className="field">
          <label>
            School <span className="required">*</span>
          </label>
          <div id="school" className="ui search">
            <div className="ui input">
              <input
                className="ui input"
                type="text"
                placeholder="School"
                name="school"
                onChange={formik.handleChange}
                value={formik.values.school}
                required
              />
              <div className="results"></div>
            </div>
          </div>
        </div>
      );
    }
    return schoolField;
  
}

export default SchoolField;