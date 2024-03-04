import { Input } from "antd";
import { useState } from 'react';
import { debounce } from 'lodash';

const DollarInput = ({onChange}) => {
    const [value, setValue] = useState(0.00);

    //Remove non-numeric values and format to two decimal places.
    const handleInputChange = debounce((newValue) => {
        if (newValue === null) setValue(0);
        else{
            const numericValue = newValue.toString().replace(/[^0-9.-]/g, '');
            const formattedValue = parseFloat(numericValue).toFixed(2);
            setValue(formattedValue);
        }
        //Call the onChange callback with the new value.
        onChange && onChange(value);
    }, 100);

    //Update value on change.
    const handleChange = (event) => setValue(event.target.value);
    //Trigger the debounce function when another component is selected.
    const handleBlur = () => handleInputChange(value);

  return (
    <Input 
        addonAfter="$" 
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        size="large"
    />
  )
}

export default DollarInput