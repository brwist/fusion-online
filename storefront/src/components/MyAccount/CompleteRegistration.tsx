import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useForm, SubmitHandler, useWatch } from 'react-hook-form';

import { User, AddressInput, CountryCode } from '../../generated/graphql';
import usStates from '../../utils/us-states.json';
import caStates from '../../utils/ca-states.json';
import countries from '../../utils/countries.json';

interface CompleteRegistrationProps {}

type FormValues = {
  companyName: string;
  companyType: string;
  companyRevenue: number;
  numberOfEmployees: number;
  tradeName: string;
  customerAddress: string;
  city: string;
  country: string;
  countryArea: string;
  postalCode: string;
  companyUrl: string;
  taxId: string;
  vatId: string;
  shippingName: string;
  shippingAddress: string;
  shippingCity: string;
  shippingCountry: string;
  shippingCountryArea: string;
  shippingPostalCode: string;
};

type LocationOption = {
  name: string;
  abbreviation: string;
};

type AddressMutationInput = {
  input: AddressInput;
};

export const CompleteRegistration: React.FC<CompleteRegistrationProps> = ({ ...props }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },

    control,
    getValues,
    setValue,
  } = useForm<FormValues>();

  // Additional fields
  const [nonDisclosure, setNonDisclosure] = useState(false);
  const [terms, setTerms] = useState(false);

  const textInput = (name: keyof FormValues, label: string, required: boolean = false) => {
    return (
      <Form.Group>
        <Form.Label>{label}</Form.Label>
        {required ? (
          <Form.Control type="text" {...register(name, { required: true })} />
        ) : (
          <Form.Control type="text" {...register(name)} />
        )}
        {errors[name] ? <span>This field is required</span> : null}
      </Form.Group>
    );
  };

  const numInput = (name: keyof FormValues, label: string) => {
    return (
      <Form.Group>
        <Form.Label>{label}</Form.Label>
        <Form.Control type="number" {...register(name)} />
        {errors[name] ? <span className="invalid-feedback">This field is required</span> : null}
      </Form.Group>
    );
  };

  const locationSelect = (name: keyof FormValues, label: string, options: Array<LocationOption>) => {
    return (
      <Form.Group>
        <Form.Label>{label}</Form.Label>
        <Form.Control as="select" custom {...register(name, { required: true })}>
          {options.map((c, i) => {
            return (
              <option key={i} value={c.abbreviation}>
                {c.name}
              </option>
            );
          })}
        </Form.Control>
        {errors[name] ? <span>This field is required</span> : null}
      </Form.Group>
    );
  };

  const RenderStateSelect = () => {
    const countryVal = useWatch({
      control,
      name: 'country',
    });
    switch (countryVal) {
      case 'US':
        return locationSelect('countryArea', 'State', usStates);
      case 'CA':
        return locationSelect('countryArea', 'Province', caStates);
      default:
        return <div />;
    }
  };

  const zipInput = (name) => {
    return (
      <Form.Group>
        <Form.Label>Postal Code</Form.Label>
        <Form.Control
          type="text"
          {...register(name, {
            required: {
              value: true,
              message: 'Postal code is required.',
            },
            minLength: {
              value: 5,
              message: 'Postal code must be 5 digits.',
            },
            maxLength: {
              value: 5,
              message: 'Postal code must be 5 digits.',
            },
            pattern: {
              value: /[0-9]{5}/,
              message: 'Invalid postal code.',
            },
          })}
        />
        {errors[name] ? <span>{errors[name].message}</span> : null}
      </Form.Group>
    );
  };

  const toggleSameAsBusinessAddress = (e) => {
    const checked = e.target.checked;

    if (!checked) {
      return;
    }
    const values = getValues();

    const { companyName, customerAddress, city, countryArea, postalCode, country } = values;

    if (companyName) {
      setValue('shippingName', companyName);
    }

    if (customerAddress) {
      setValue('shippingAddress', customerAddress);
    }

    if (city) {
      setValue('shippingCity', city);
    }

    if (countryArea) {
      setValue('shippingCountryArea', countryArea);
    }

    if (postalCode) {
      setValue('shippingPostalCode', countryArea);
    }

    if (country) {
      setValue('shippingCountry', country);
    }
  };

  console.log('errors: ', errors);

  return (
    <div>
      <header className="mb-4 pb-4 border-bottom d-flex justify-content-between align-items-center">
        <h2 className="h3 m-0">Complete Registration</h2>
      </header>

      <Row className="mb-5">
        <Col lg={5}>
          <h3 className="h4">Welcome aboard RocketChips!</h3>
        </Col>
        <Col lg={7}>
          <p>First we need to gather some information about you and your company.</p>
        </Col>
      </Row>

      <Form>
        <Row className="justify-content-center">
          <Col xl={6}>
            <h3 className="h4 font-weight-bold">Business Information</h3>
            <Form.Group>
              <Form.Label>Job Title</Form.Label>
              <Form.Control as="select" custom>
                <option>Please Select</option>
                <option>Option 2</option>
              </Form.Control>
            </Form.Group>

            {textInput('companyName', 'Legal Company Name', true)}
            {textInput('tradeName', 'Trade Name/DBA', true)}
            {textInput('customerAddress', 'Customer Address', true)}
            {textInput('city', 'City', true)}
            <Form.Row>
              <Col lg={8}>{textInput('countryArea', 'State/Province', true)}</Col>
              <Col lg={4}>{zipInput('postalCode')}</Col>
            </Form.Row>
            {locationSelect('country', 'Country', countries)}
            <Form.Group>
              <Form.Label>Company Type</Form.Label>
              <div>
                <Form.Check
                  inline
                  custom
                  type="radio"
                  name="companyType"
                  label="Public"
                  id="public"
                  value="public"
                  {...register('companyType', { required: true })}
                />
                <Form.Check
                  inline
                  custom
                  type="radio"
                  name="companyType"
                  label="Private"
                  id="private"
                  value="private"
                  {...register('companyType', { required: true })}
                />
              </div>
            </Form.Group>
            {textInput('companyUrl', 'Company URL', true)}
            {textInput('taxId', 'Federal Tax ID', true)}
            {textInput('vatId', 'VAT ID')}
            <Form.Group>
              <Form.Label>Revenue</Form.Label>
              <Form.Control as="select" custom required>
                <option>Please Select</option>
                <option>Option 2</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Number of Employees</Form.Label>
              <Form.Control as="select" custom required>
                <option>Please Select</option>
                <option>Option 2</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Row}>
              <Col xs={12}>
                <Form.Label>Description of Business (select all that apply)</Form.Label>
              </Col>
              <Col sm={6}>
                <Form.Check custom className="mb-2" type="checkbox" name="businessDescription" label="Aerospace" />
              </Col>
              <Col sm={6}>
                <Form.Check
                  custom
                  className="mb-2"
                  type="checkbox"
                  name="businessDescription"
                  label="Industrial Automation"
                />
              </Col>
              <Col sm={6}>
                <Form.Check custom className="mb-2" type="checkbox" name="businessDescription" label="Aerospace" />
              </Col>
              <Col sm={6}>
                <Form.Check
                  custom
                  className="mb-2"
                  type="checkbox"
                  name="businessDescription"
                  label="Industrial Automation"
                />
              </Col>
              <Col sm={6}>
                <Form.Check custom className="mb-2" type="checkbox" name="businessDescription" label="Aerospace" />
              </Col>
              <Col sm={6}>
                <Form.Check
                  custom
                  className="mb-2"
                  type="checkbox"
                  name="businessDescription"
                  label="Industrial Automation"
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>

        <hr />

        <Row className="justify-content-center">
          <Col xl={6}>
            <h3 className="h4 font-weight-bold">Ship To</h3>

            <Form.Group>
              <Form.Check
                custom
                type="checkbox"
                label="Same as business address"
                id="sameAsBusinessAddress"
                onChange={toggleSameAsBusinessAddress}
              />
            </Form.Group>
            {textInput('shippingName', 'Ship to Name', true)}
            {textInput('shippingAddress', 'Address', true)}
            {textInput('shippingCity', 'City', true)}
            <Form.Row>
              <Col lg={8}>{textInput('shippingCountryArea', 'State/Province', true)}</Col>
              <Col lg={4}>{zipInput('shippingPostalCode')}</Col>
            </Form.Row>
            {locationSelect('shippingCountry', 'Country', countries)}
          </Col>
        </Row>

        <hr />

        <Row className="justify-content-center">
          <Col xl={6}>
            <h3 className="h4 font-weight-bold">Upload Documents</h3>

            <Form.Group>
              <Form.Label>Reseller Certificate</Form.Label>
              <Form.File label="Select file to upload" custom />
            </Form.Group>
          </Col>
        </Row>

        <hr />

        <Row className="justify-content-center">
          <Col xl={6}>
            <h3 className="h4 font-weight-bold">Agreements</h3>

            <Form.Group>
              <div className="custom-control custom-checkbox mb-2 pl-0">
                <Form.Check
                  custom
                  id="terms"
                  type="checkbox"
                  required
                  checked={terms}
                  onChange={(e) => setTerms(!terms)}
                  label={
                    <>
                      I have read and agree to the <a href="/">Terms and Conditions</a>
                    </>
                  }
                />
              </div>
              <div className="custom-control custom-checkbox mb-2 pl-0">
                <Form.Check
                  custom
                  id="non-disclosure"
                  type="checkbox"
                  required
                  checked={nonDisclosure}
                  onChange={(e) => setNonDisclosure(!nonDisclosure)}
                  label={
                    <>
                      I have read and agree to the <a href="/">Non-Disclosure Agreement</a>
                    </>
                  }
                />
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                I have read and agree to the <a href="/">Export Compliance Check</a>, and certify that this document is
                being signed
              </Form.Label>
              <Form.Check
                custom
                className="mb-2"
                type="radio"
                name="exportComplianceCheck"
                label="on behalf of itself, its subsidiaries, and affiliates"
                // required
              />
              <Form.Check
                custom
                className="mb-2"
                type="radio"
                name="exportComplianceCheck"
                label="only for the locations in the country specified in the address line below"
                // required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Complete
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
