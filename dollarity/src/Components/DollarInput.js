import { Input } from "antd";
import { useState, useEffect } from 'react';
import { debounce } from 'lodash';

const DollarInput = ({onChange, startValue = 0}) => {
    const [value, setValue] = useState(parseFloat(startValue).toFixed(2));

  useEffect(() => {
    setValue(parseFloat(startValue).toFixed(2));
  }, [startValue]);
  
    //Remove non-numeric values and format to two decimal places.
    const handleInputChange = debounce((newValue) => {
        const numericValue = newValue.toString().replace(/[^0-9.-]/g, '');
        const formattedValue = isNaN(parseFloat(numericValue)) ? '0.00' : parseFloat(numericValue).toFixed(2);
        setValue(formattedValue);
        //Call the onChange callback with the new value.
        onChange && onChange(numericValue);
    }, 10);

    //Update value on change.
    const handleChange = (event) => setValue(event.target.value);
    //Trigger the debounce function when another component is selected.
    const handleBlur = () => handleInputChange(value);

  return (
    <Input 
        style={{fontSize: '52px', textAlign: 'right'}}
        formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
    />
  )
}

export default DollarInput