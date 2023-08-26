import * as React from 'react';
import Button from '@mui/material/Button';

export default function Detail(props) {
    const my_handler = () => {
        props.click(props.cnt)
    }
    return (
        <div>
            <Button variant="outlined" style={{ fontSize: "20px" }} onClick={my_handler} >نمایش</Button>
        </div>
    );
}
