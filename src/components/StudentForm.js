import React, { useState } from "react";
import { Autocomplete, TextField, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import { Button, Stack } from "@mui/material";

const StudentForm = ({ handleSubmit, values, id, handleDialog, newRollNo, sections, heading }) => {
  let allSections = sections.map((item, index) => {
    return {
      label: item.sectionName,
      id: index + 1
    };
  })

  const initialValues = {
    name: values ? values.name : "",
    section: values ? values.section : "",
    rollNo: values ? values.rollNo : newRollNo,
  };

  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const submitForm = () => {
    handleSubmit({ ...formValues, _id: id });
  };

  return (
    <Formik initialValues={formValues} onSubmit={submitForm}>
      {() => (
        <Form style={{ paddingTop: "20px", width: "auto", height: "350px" }}>
          <Typography variant='h5' sx={{margin: '0 0 20px 25px'}}>{heading}</Typography>
          <Stack spacing={2}>
            <TextField
              type="text"
              name="name"
              label="Name"
              variant="outlined"
              required
              value={formValues.name}
              onChange={handleChange}
              sx={{ width: "250px", alignSelf: "center" }}
            />
            <Autocomplete
              disablePortal
              name="section"
              options={allSections}
              value={formValues.section}
              onChange={(event, value) => {
                setFormValues({ ...formValues, section: value.label });
              }}
              //onChange={handleChange}
              sx={{ width: "250px", alignSelf: "center" }}
              renderInput={(params) => (
                <TextField {...params} label="Sections" />
              )}
            />
            <TextField
              type="text"
              name="rollNo"
              label="Roll No"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
              required
              sx={{ width: "250px", alignSelf: "center" }}
              value={formValues.rollNo}
              onChange={handleChange}
            />
            <div style={{width:'300px' , display:'flex', justifyContent:"space-around"}}>
              <Button
                size="medium"
                variant="outlined"
                color="primary"
                onClick={()=> {
                  handleDialog(false);
                }}
                style={{
                  marginTop: "20px",
                  width: "100px",
                }}
              >
                Close
              </Button>
              <Button
                type="submit"
                size="medium"
                variant="contained"
                color="primary"
                style={{
                  marginTop: "20px",
                  width: "100px",
                }}
              >
                Submit
              </Button>
            </div>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default StudentForm;
