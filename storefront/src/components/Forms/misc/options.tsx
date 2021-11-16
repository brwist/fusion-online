export const jobTitleOptions = () => {
  return (
    <>
      <option disabled selected hidden></option>
      <option value="BUYER">Buyer</option>
      <option value="COMMODITY_PRODUCT_MANAGER">Commodity/Product Manager</option>
      <option value="MATERIALS_PLANNING">Materials Planning</option>
      <option value="IT_MANAGER">IT Manager</option>
      <option value="ENGINEER">Engineer</option>
      <option value="ACCOUNTS_PAYABLE">Accounts Payable</option>
      <option value="SERVICE_TECHNICIAN">Service Technician</option>
      <option value="SALES">Sales</option>
      <option value="OTHER">Other</option>
    </>
  );
};

export const revenueOptions = () => {
  return (
    <>
      <option disabled selected hidden></option>
      <option value="0+">0 - $500,000</option>
      <option value="500+">$500,000 - $999,999</option>
      <option value="1M+">$1,000,000 - $2,499,999</option>
      <option value="2.5M+">$2,500,000 - $4,999,999</option>
      <option value="5M+">$5,000,000 - $9,999,999</option>
      <option value="10M+">$10,000,000 - $99,999,999</option>
      <option value="100M+">$100,000,000 - $499,999,999</option>
      <option value="500M+">$500,000,000 - $999,999,999</option>
      <option value="1B+">$1,000,000,000+</option>
    </>
  );
};

export const numberOfEmployeesOptions = () => {
  return (
    <>
      <option disabled selected hidden></option>
      <option value="1-4">1 - 4</option>
      <option value="5-9">5 - 9</option>
      <option value="10-19">10 - 19</option>
      <option value="20-49">20 - 49</option>
      <option value="50-99">50 - 99</option>
      <option value="100-249">100 - 249</option>
      <option value="250-499">250 - 499</option>
      <option value="500-999">500 - 999</option>
      <option value="1000+">1,000+</option>
    </>
  );
};

export const descriptionOfBusinessOptions = () => {
  const formatOption = (value, label) => {
    return {
      value,
      label,
    };
  };
  return [
    formatOption('aerospace', 'Aerospace'),
    formatOption('pos', 'ATMs/Point-of-Sale equipment'),
    formatOption('audio/vision', 'Audio/Visual Products'),
    formatOption('automotive', 'Automotive'),
    formatOption('broker', 'Broker/Independent Distributor'),
    formatOption('consumer-electronics', 'Consumer Electronics'),
    formatOption('contract-manufacturer', 'Contract Manufacturer/ODM'),
    formatOption('defense', 'Defense'),
    formatOption('enterprise-computing', 'Enterprise Computing'),
    formatOption('gaming-computing', 'Gaming Computing'),
    formatOption('government/education', 'Government/Education'),
    formatOption('healthcare', 'Healthcare'),
    formatOption('industrial-automation', 'Industrial Automation'),
    formatOption('info-technology', 'Information Technology'),
    formatOption('iot', 'IoT'),
    formatOption('lighting', 'Lighting'),
    formatOption('odm', 'ODM'),
    formatOption('other', 'Other'),
    formatOption('personal-computing', 'Personal Computing'),
    formatOption('repair', 'Repair'),
    formatOption('security', 'Security'),
    formatOption('softwarre', 'Software'),
    formatOption('telecom/networking', 'Telecom/Networking'),
    formatOption('transportation', 'Transportation'),
  ];
};
