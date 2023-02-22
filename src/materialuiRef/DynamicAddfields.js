import { useState } from 'react';
import '../App.css';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function DynamicAddfields() {
    const [formFields, setFormFields] = useState([
        { jskey: '', jsval: '' },
    ])

    const handleFormChange = (event, index) => {
        let data = [...formFields];
        data[index][event.target.name] = event.target.value;
        setFormFields(data);
    }

    const submit = (e) => {
        e.preventDefault();
        console.log(formFields)
    }

    const addFields = () => {
        let object = {
            jskey: '',
            jsval: ''
        }

        setFormFields([...formFields, object])
    }

    const removeFields = (index) => {
        let data = [...formFields];
        data.splice(index, 1)
        setFormFields(data)
    }

    return (
        <div className="App">
            <form onSubmit={submit}>
                {formFields.map((form, index) => {
                    return (
                        <Box key={index}>
                            <TextField
                                margin="normal"
                                name='jskey'
                                label='Key'
                                onChange={event => handleFormChange(event, index)}
                                value={form.name}
                            />{}
                            <TextField
                                margin="normal"
                                name='jsval'
                                label='Value'
                                onChange={event => handleFormChange(event, index)}
                                value={form.age}
                            />
                            <Button variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={() => removeFields(index)}>Remove</Button>
                        </Box>
                    )
                })}
            </form>
            <Button variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={addFields}>Add More..</Button>
            <br />
            <Button variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={submit}>Submit</Button>
        </div>
    );
}

export default DynamicAddfields;