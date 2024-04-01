import { Input } from "antd";
import { useState } from 'react';
import { debounce } from 'lodash';

const DollarInput = ({onChange, startValue = '0.00'}) => {
    const [value, setValue] = useState(startValue);

    //Remove non-numeric values and format to two decimal places.
    const handleInputChange = debounce((newValue) => {
        if (isNaN(newValue)) setValue(0.00);
        else{
            const numericValue = newValue.toString().replace(/[^0-9.-]/g, '');
            const formattedValue = parseFloat(numericValue).toFixed(2);
            setValue(formattedValue);
        }
        //Call the onChange callback with the new value.
        onChange && onChange(value);
    }, 10);

    //Update value on change.
    const handleChange = (event) => setValue(event.target.value);
    //Trigger the debounce function when another component is selected.
    const handleBlur = () => handleInputChange(value);

  return (
    <Input 
        style={{fontSize: '32px', width: 220, textAlign: 'center'}}
        formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
    />
  )
}

export default DollarInput