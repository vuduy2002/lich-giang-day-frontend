import { useRef } from 'react';

function InputTime({ onHandleChange, value = '00:00' }) {
    const inputRef = useRef(null);

    // Function to trigger time picker when clicking on icon
    const handleIconClick = () => {
        if (inputRef.current) {
            console.log('onHandleIconClick');
            inputRef.current.showPicker(); // Manually trigger the time picker
        }
    };

    return (
        <div className=" max-w-[12rem] mx-auto" onClick={handleIconClick}>
            <input
                name="time"
                type="time"
                id="time"
                ref={inputRef} // Reference to the input element
                className="bg-white border leading-none border-gray-300 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                min="09:00"
                max="18:00"
                value={value}
                onChange={onHandleChange}
                required
            />
        </div>
    );
}

export default InputTime;
