import React, { useRef, useEffect, useState } from 'react';
import { Field, Formik, Form, yupToFormErrors, ErrorMessage } from 'formik';
import classnames from 'classnames';
import _ from 'underscore';
import * as Yup from 'yup';
import service from '../../services/app.service';
import './Filters.css';
import { addCommas } from '../../shared/utils';
import Expire from '../shared/Expire';
import { Col, Row } from 'react-bootstrap';
import DfpAdUnitWarning from './DfpAdUnitWarning';
import { SubmitFailed, SubmitSuccess } from './info';
import FormikErrorFocus from 'formik-error-focus';

export default function Filters() {
  const [data, setData] = useState([]);
  const [validDfpAdUnit, setValidDfpAdUnit] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [warnings, setWarnings] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    service.getDistinctValues().then(data => setValidDfpAdUnit(data.dfpAdUnit));
    service.getSelectedFilters().then(data => setSelectedFilters(data));
  }, []);

  function onDFPChange(e) {
    //remove Hebrew Point Hataf Patah https://unicode-table.com/en/05B2/
    e.target.value = e.target.value.replace(/\u05b2/g, '');
  }

  function checkDfpAdUnit(value) {
    setIsChecked(true);
    let input = _.uniq(
      value
        .split('\n')
        .map(v => v.trim())
        .filter(v => v)
    );

    let unknowns = input.filter(v => validDfpAdUnit.indexOf(v) < 0);

    if (unknowns.length > 0) {
      setWarnings(p => {
        return {
          ...p,
          dfpAdUnit: unknowns
        };
      });
    } else {
      setWarnings(p => ({ ...p, dfpAdUnit: null }));
    }
  }

  function onSubmit(values, bag) {
    bag.setStatus(0);
    new Promise(r => setTimeout(r, 500)).then(() => {
      console.log(values);

      let dfpAdUnit =
        values.dfpAdUnit === '' ? [] : values.dfpAdUnit.split('\n');
      let days = values.days;

      service
        .saveSelectedFilters({ days, dfpAdUnit })
        .then(() => {
          setIsChecked(false);
          setWarnings({});
          bag.setSubmitting(false);
          bag.setStatus(1);
        })
        .catch(error => {
          bag.setErrors(error.response.data.errors);
          bag.setSubmitting(false);
          bag.setStatus(2);
        });
    });
  }

  const FiltersSchema = Yup.object().shape({
    days: Yup.string().required('Required field'),
    dfpAdUnit: Yup.string().required('Required field')
  });

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col ml-5 mr-5">
            <Formik
              validationSchema={FiltersSchema}
              enableReinitialize={true}
              initialValues={{
                dfpAdUnit: selectedFilters.dfpAdUnit
                  ? selectedFilters.dfpAdUnit.join('\n')
                  : '',
                days: selectedFilters.days
                  ? addCommas(selectedFilters.days)
                  : ''
              }}
              onSubmit={onSubmit}
            >
              {props => {
                const {
                  errors,
                  touched,
                  values,
                  handleChange,
                  handleBlur,
                  isSubmitting,
                  status
                } = props;
                return (
                  <Form>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="days">Days</label>
                          <input
                            type="text"
                            className={classnames(
                              'form-control form-control-lg',
                              {
                                'is-invalid': touched.days && errors.days
                              }
                            )}
                            name="days"
                            id="days"
                            width="200px"
                            placeholder="Days"
                            onChange={handleChange}
                            value={values.days}
                          />
                          {touched.days && errors.days && (
                            <span className="invalid-feedback">
                              {errors.days}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="dfpAdUnit">
                            Selected DFP Ad Unit
                          </label>
                          <textarea
                            className={classnames(
                              'form-control form-control-lg',
                              {
                                'is-warning-box':
                                  warnings.dfpAdUnit && isChecked,
                                'is-valid': !warnings.dfpAdUnit && isChecked,
                                'is-invalid':
                                  touched.dfpAdUnit && errors.dfpAdUnit
                              }
                            )}
                            name="dfpAdUnit"
                            id="dfpAdUnit"
                            value={values.dfpAdUnit}
                            onChange={e => {
                              onDFPChange(e);
                              handleChange(e);
                            }}
                            onBlur={handleBlur}
                          />
                          {touched.dfpAdUnit && errors.dfpAdUnit && (
                            <span className="invalid-feedback">
                              {errors.dfpAdUnit}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <Row className="justify-content-md-center">
                      <Col xs={4}></Col>
                      <Col md="auto">
                        <button
                          type="button"
                          className="btn btn-secondary mr-2"
                          onClick={() => checkDfpAdUnit(values.dfpAdUnit)}
                        >
                          Check
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary mr-1"
                          disabled={isSubmitting}
                        >
                          {isSubmitting && (
                            <span
                              class="spinner-border spinner-border-sm mr-1"
                              role="status"
                              aria-hidden="true"
                            ></span>
                          )}
                          Save
                        </button>
                      </Col>
                      <Col xs={4} className="p-0 d-flex align-items-center">
                        {status === 2 && (
                          <Expire delay={2000}>
                            <SubmitFailed />
                          </Expire>
                        )}
                        {status === 1 && (
                          <Expire delay={2000}>
                            <SubmitSuccess />
                          </Expire>
                        )}
                      </Col>
                    </Row>

                    <div className="row">
                      <div className="col text-center justify-content-center"></div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <DfpAdUnitWarning error={warnings.dfpAdUnit} />
                      </div>
                    </div>
                    <FormikErrorFocus
                      // See scroll-to-element for configuration options: https://www.npmjs.com/package/scroll-to-element
                      offset={0}
                      align={'top'}
                      focusDelay={200}
                      ease={'linear'}
                      duration={1000}
                    />
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}
